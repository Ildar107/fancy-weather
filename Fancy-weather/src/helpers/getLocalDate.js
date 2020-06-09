export default function getLocalDate(dt, timezone) {
  if (!timezone) return dt;
  return new Date(new Date(dt.toUTCString()).toLocaleString(
    'en-US', { timeZone: timezone },
  ));
}
