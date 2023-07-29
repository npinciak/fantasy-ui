/**
 * Calculates the contrast ratio between two colors.
 *
 * @param {string} hex1 - The first hex color code.
 * @param {string} hex2 - The second hex color code.
 * @returns {number} The contrast ratio between the two colors, a value between 1:1 (no contrast) and 21:1 (maximum contrast).
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  const r1 = parseInt(hex1.substring(0, 2), 16);
  const g1 = parseInt(hex1.substring(2, 4), 16);
  const b1 = parseInt(hex1.substring(4, 6), 16);
  const L1 = (0.2126 * r1 + 0.7152 * g1 + 0.0722 * b1) / 255;

  const r2 = parseInt(hex2.substring(0, 2), 16);
  const g2 = parseInt(hex2.substring(2, 4), 16);
  const b2 = parseInt(hex2.substring(4, 6), 16);
  const L2 = (0.2126 * r2 + 0.7152 * g2 + 0.0722 * b2) / 255;

  if (L1 > L2) {
    return (L1 + 0.05) / (L2 + 0.05);
  } else {
    return (L2 + 0.05) / (L1 + 0.05);
  }
}
