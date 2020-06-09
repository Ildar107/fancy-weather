export default function getConvertTemp(useFahrenheit, temp) {
  if (typeof temp !== 'number') return NaN;
  if (useFahrenheit) {
    return (temp * 9) / 5 + 32;
  }

  return ((temp - 32) * 5) / 9;
}
