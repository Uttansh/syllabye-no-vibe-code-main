"use client";

/**
 * Hidden input that captures the user's browser UTC offset (e.g. "-05:00").
 * Used in server-rendered forms that need the user's timezone offset
 * to build PostgreSQL timestamptz strings.
 */
export function TimezoneInput() {
  const offsetMinutes = -new Date().getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const abs = Math.abs(offsetMinutes);
  const hh = String(Math.floor(abs / 60)).padStart(2, "0");
  const mm = String(abs % 60).padStart(2, "0");
  const offset = `${sign}${hh}:${mm}`;

  return <input type="hidden" name="timezone" value={offset} />;
}
