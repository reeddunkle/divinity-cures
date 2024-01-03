export function hsl(
  hueAngleDegree: number,
  saturationPercent: number,
  lightnessPercent: number,
) {
  return `hsl(${hueAngleDegree} ${saturationPercent}% ${lightnessPercent}%)`;
}

export function px(n: number) {
  return `${n}px`;
}
