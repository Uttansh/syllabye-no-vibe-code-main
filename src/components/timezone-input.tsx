"use client";

/**
 * Hidden inputs for timezone:
 * - timezone_iana: IANA timezone (e.g. "America/New_York") for DST-aware due dates
 * - timezone: UTC offset (e.g. "-05:00") kept as fallback when IANA is unavailable
 */
export function TimezoneInput() {
  const offsetMinutes = -new Date().getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const abs = Math.abs(offsetMinutes);
  const hh = String(Math.floor(abs / 60)).padStart(2, "0");
  const mm = String(abs % 60).padStart(2, "0");
  const offset = `${sign}${hh}:${mm}`;
  const ianaTimezone =
    typeof Intl !== "undefined" &&
    typeof Intl.DateTimeFormat !== "undefined"
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : "";

  return (
    <>
      <input type="hidden" name="timezone" value={offset} />
      {ianaTimezone ? (
        <input type="hidden" name="timezone_iana" value={ianaTimezone} />
      ) : null}
    </>
  );
}
