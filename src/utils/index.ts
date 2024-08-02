export function generateBrightColor() {
  const hue = Math.floor(Math.random() * 360);
  // const saturation = Math.floor(Math.random() * 100) + 1; // Ensure saturation is not 0
  // const lightness = Math.floor(Math.random() * 100) + 1; // Ensure lightness is not 0
  const saturation = 100;
  const lightness = 90;
  const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  return color;
}
