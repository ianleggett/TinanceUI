/**
 * Better to fixed utils for number.
 *
 * @param num - The number
 * @param fractionDigits - Fraction digits
 * @returns Fixed number string
 */
export function toFixed(num: number, fractionDigits: number = 2): string {
  if (Number.isInteger(num)) {
    return Math.floor(num).toString();
  }

  return num.toFixed(fractionDigits);
}
