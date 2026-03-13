import { fromZonedTime } from "date-fns-tz";

export type ParsedCanvasEvent = {
  uid: string;
  summary: string;
  dueDate: Date | null;
  startDate: Date | null;
  hasTime: boolean;
  url: string | null;
  description: string | null;
  canvasCourseId: string | null;
  canvasCourseName: string | null;
  canvasCourseNumber: string | null;
};

/**
 * Extract Canvas course ID from URL (e.g. .../courses/123/assignments/456 -> 123)
 */
function extractCourseIdFromUrl(url: string | undefined): string | null {
  if (!url || typeof url !== "string") return null;
  const match = url.match(/\/courses\/(\d+)\//);
  return match ? match[1] : null;
}

/**
 * Try to extract course name from description (Canvas may include "Course: X")
 */
function extractCourseNameFromDescription(desc: string | undefined): string | null {
  if (!desc || typeof desc !== "string") return null;
  const stripped = desc.replace(/<[^>]*>/g, " ").trim();
  const courseMatch = stripped.match(/(?:course|class)[:\s]+([^\n,]+)/i);
  return courseMatch ? courseMatch[1].trim() : null;
}

/**
 * Extract course number/code (e.g. "36-213", "15-213") from description
 */
function extractCourseNumberFromDescription(desc: string | undefined): string | null {
  if (!desc || typeof desc !== "string") return null;
  const stripped = desc.replace(/<[^>]*>/g, " ").trim();
  const numberMatch = stripped.match(/\b(\d{2,3}-\d{2,3})\b/);
  return numberMatch ? numberMatch[1] : null;
}

function getFetchHeaders(url: string): Record<string, string> {
  const u = new URL(url);
  const origin = `${u.protocol}//${u.host}`;
  return {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Accept: "text/calendar, text/plain, */*",
    Referer: `${origin}/`,
  };
}

/**
 * Parse ICS date value (YYYYMMDD or YYYYMMDDTHHMMSS or YYYYMMDDTHHMMSSZ).
 * When tzid is provided, the value is interpreted as local time in that timezone.
 * Z suffix means UTC per iCalendar spec.
 */
function parseIcsDate(val: string, tzid?: string | null): Date | null {
  if (!val || typeof val !== "string") return null;
  const s = val.trim();
  // DATE: 20260209 (date only, no time - use midnight for calendar day)
  if (/^\d{8}$/.test(s)) {
    const y = parseInt(s.slice(0, 4), 10);
    const m = parseInt(s.slice(4, 6), 10) - 1;
    const d = parseInt(s.slice(6, 8), 10);
    return new Date(Date.UTC(y, m, d, 0, 0, 0));
  }
  // DATE-TIME: 20260210T190000Z or 20260210T190000
  const dt = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z?$/.exec(s);
  if (dt) {
    const [, y, mo, d, h, mi, sec] = dt;
    const year = parseInt(y!, 10);
    const month = parseInt(mo!, 10) - 1;
    const day = parseInt(d!, 10);
    const hour = parseInt(h!, 10);
    const minute = parseInt(mi!, 10);
    const second = parseInt(sec!, 10);

    if (s.endsWith("Z")) {
      // Per iCalendar spec, Z means UTC. Treat as UTC directly.
      return new Date(Date.UTC(year, month, day, hour, minute, second));
    }
    if (tzid) {
      const localDateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`;
      return fromZonedTime(localDateStr, tzid);
    }
    return new Date(Date.UTC(year, month, day, hour, minute, second));
  }
  return new Date(s);
}

/**
 * Unfold ICS lines (continuation lines start with space/tab)
 */
function unfoldLines(text: string): string[] {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .reduce<string[]>((acc, line) => {
      if (line.startsWith(" ") || line.startsWith("\t")) {
        if (acc.length > 0) acc[acc.length - 1] += line.slice(1);
      } else {
        acc.push(line);
      }
      return acc;
    }, []);
}

/**
 * Parse a single property line (NAME;PARAMS:VALUE or NAME:VALUE)
 */
function parseProperty(line: string): { name: string; value: string; params: Record<string, string> } | null {
  const colonIdx = line.indexOf(":");
  if (colonIdx < 0) return null;
  const namePart = line.slice(0, colonIdx);
  const value = line.slice(colonIdx + 1).replace(/\\n/g, "\n").replace(/\\,/g, ",");
  const parts = namePart.split(";");
  const name = parts[0];
  const params: Record<string, string> = {};
  for (let i = 1; i < parts.length; i++) {
    const eq = parts[i].indexOf("=");
    if (eq >= 0) {
      params[parts[i].slice(0, eq)] = parts[i].slice(eq + 1);
    }
  }
  return { name, value, params };
}

/**
 * Parse ICS text into events (no node-ical / BigInt dependency).
 */
function parseIcsToEvents(icsText: string): ParsedCanvasEvent[] {
  const lines = unfoldLines(icsText);
  const events: ParsedCanvasEvent[] = [];
  let inEvent = false;
  let current: Partial<ParsedCanvasEvent> & { uid?: string } = {};

  for (const line of lines) {
    if (line.startsWith("BEGIN:VEVENT")) {
      inEvent = true;
      current = { hasTime: false };
      continue;
    }
    if (line.startsWith("END:VEVENT")) {
      inEvent = false;
      const summary = current.summary?.trim();
      if (summary && current.uid) {
        events.push({
          uid: current.uid,
          summary,
          dueDate: current.dueDate ?? null,
          startDate: current.startDate ?? null,
          hasTime: current.hasTime ?? false,
          url: current.url ?? null,
          description: current.description ?? null,
          canvasCourseId: current.canvasCourseId ?? null,
          canvasCourseName: current.canvasCourseName ?? null,
          canvasCourseNumber: current.canvasCourseNumber ?? null,
        });
      }
      continue;
    }
    if (!inEvent) continue;

    const prop = parseProperty(line);
    if (!prop) continue;

    const isDateOnly = prop.params.VALUE === "DATE" || /^\d{8}$/.test(prop.value.trim());
    const tzid = isDateOnly ? null : prop.params.TZID ?? null;

    switch (prop.name) {
      case "UID":
        current.uid = prop.value;
        break;
      case "SUMMARY":
        current.summary = prop.value;
        break;
      case "DTSTART":
        current.startDate = parseIcsDate(prop.value, tzid);
        if (!current.dueDate) current.dueDate = current.startDate;
        if (!isDateOnly) current.hasTime = true;
        break;
      case "DTEND":
        current.dueDate = parseIcsDate(prop.value, tzid);
        if (!isDateOnly) current.hasTime = true;
        break;
      case "URL":
        current.url = prop.value;
        break;
      case "DESCRIPTION":
        current.description = prop.value;
        break;
    }
  }

  for (const ev of events) {
    ev.canvasCourseId =
      extractCourseIdFromUrl(ev.url ?? undefined) ?? extractCourseIdFromUrl(ev.description ?? undefined);
    ev.canvasCourseName = extractCourseNameFromDescription(ev.description ?? undefined);
    ev.canvasCourseNumber = extractCourseNumberFromDescription(ev.description ?? undefined);
  }

  return events;
}

/**
 * Fetch ICS from URL and parse into normalized events.
 */
export async function fetchAndParseIcs(url: string): Promise<ParsedCanvasEvent[]> {
  let res: Response;
  try {
    res = await fetch(url, {
      headers: getFetchHeaders(url),
      cache: "no-store",
    });
  } catch (fetchErr) {
    const m = fetchErr instanceof Error ? fetchErr.message : String(fetchErr);
    const c = fetchErr instanceof Error && fetchErr.cause ? String(fetchErr.cause) : "";
    throw new Error(`Fetch failed: ${m}${c ? ` (${c})` : ""}`);
  }

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }

  const icsText = await res.text();
  if (!icsText.trim().startsWith("BEGIN:VCALENDAR")) {
    throw new Error(
      `Unexpected response (expected ICS, got ${icsText.slice(0, 100)}...)`
    );
  }

  return parseIcsToEvents(icsText);
}
