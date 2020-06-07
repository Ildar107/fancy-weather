export default function getConvertTemp(useFahrenheit, temp) {
  if (useFahrenheit) {
    return (temp * 5) / 9 + 32;
  }

  return ((temp - 32) * 9) / 5;
}
