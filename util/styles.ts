export function hsl(
  hueAngleDegree: number,
  saturationPercent: number,
  lightnessPercent: number,
) {
  return `hsl(${hueAngleDegree} ${saturationPercent}% ${lightnessPercent}%)`;
}
