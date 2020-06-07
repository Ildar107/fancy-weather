export default function getLocalDate(dt, timezone) {
  return new Date(new Date(dt.toUTCString()).toLocaleString(
    'en-US', { timeZone: timezone },
  ));
}
