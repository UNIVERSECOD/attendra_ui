export function formatAttendanceCapture(date, time, language = "az") {
  if (!date || !time) return "-";

  const locale =
    language === "ru" ? "ru-RU" : language === "en" ? "en-GB" : "az-Latn-AZ";
  const value = new Date(`${date}T${time}:00`);

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(value);
}
