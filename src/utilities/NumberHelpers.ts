export function RoundTo(num: number, places = 2) {
  const factor = 10 ** places;
  return Math.round(num * factor) / factor;
}
export function RoundToTest() {}
