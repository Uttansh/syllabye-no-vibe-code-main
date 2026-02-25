/**
 * Build a PostgreSQL-compatible timestamptz string from a date and time,
 * embedding a UTC offset so the server needs zero date logic —
 * PostgreSQL parses it directly.
 *
 * @param dateStr       "YYYY-MM-DD" (from <input type="date">)
 * @param timeStr       "HH:MM" or "HH:MM:SS" (from <input type="time">)
 * @param utcOffsetStr  Optional explicit offset, e.g. "-05:00".
 *                      Pass this on the server where `new Date()` would
 *                      use the server's timezone instead of the user's.
 *                      When omitted, the offset is auto-detected from the
 *                      browser's `Date` object (client-side use).
 * @returns e.g. "2026-02-14 23:59:00 -05:00"
 */
export function toPostgresTimestamptzString(
dateStr: string,
timeStr: string,
utcOffsetStr?: string,
): string {
let offset: string;

if (utcOffsetStr) {
  offset = utcOffsetStr;
} else {
  const [y, m, d] = dateStr.split("-").map(Number);
  const [hh, mm] = timeStr.split(":").map(Number);

  // Local date in user's timezone (only used to read the offset)
  const local = new Date(y, m - 1, d, hh, mm, 0);

  // Browser timezone offset (minutes from UTC, but reversed sign)
  const offsetMinutes = -local.getTimezoneOffset();

  const sign = offsetMinutes >= 0 ? "+" : "-";
  const abs = Math.abs(offsetMinutes);

  const offsetHours = String(Math.floor(abs / 60)).padStart(2, "0");
  const offsetMins = String(abs % 60).padStart(2, "0");

  offset = `${sign}${offsetHours}:${offsetMins}`;
}

// Pad time to HH:MM:SS if seconds are missing
return `${dateStr} ${timeStr.padEnd(8, ":00")} ${offset}`;
}

