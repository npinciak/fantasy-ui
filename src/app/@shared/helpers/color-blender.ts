export const blendColors = (colorA, colorB, amount) => {
  const [rA, gA, bA] = colorA.match(/\w\w/g).map(c => parseInt(c, 16));
  const [rB, gB, bB] = colorB.match(/\w\w/g).map(c => parseInt(c, 16));
  const r = Math.round(rA + (rB - rA) * amount)
    .toString(16)
    .padStart(2, '0');
  const g = Math.round(gA + (gB - gA) * amount)
    .toString(16)
    .padStart(2, '0');
  const b = Math.round(bA + (bB - bA) * amount)
    .toString(16)
    .padStart(2, '0');
  return `#${r}${g}${b}`;
};

export const colorScaleTable = (min: number = 0, max: number = 33, val: number, thresholdType: string) => {
  if (min === undefined || max === undefined) {
    return;
  }

  // 'lowToHigh' | 'highToLow'
  if (thresholdType) {
    // The colors to use for the gradient starting at the lowest and highest values
    //let low_hex  = '#00FF66' ;
    //let high_hex = '#443456' ;

    // ===== Light/bright colors ===== //
    //let low_hex  = '#FFFF45' ; // Yellow
    //let low_hex  = '#FFE445' ; // Orange
    //let high_hex = '#45FF45' ; // Green

    // ===== Dark Colors ===== //
    const highHex = thresholdType === 'highToLow' ? '#d43d51' : '#00876c'; // Orange
    const lowHex = thresholdType === 'highToLow' ? '#00876c' : '#d43d51'; // Green

    // The distance between min_val and max_val
    const range = max - min;

    const percentInRange = val / range;

    let color = blendColors(lowHex, highHex, percentInRange);

    // Concatenate an alpha/opacity value onto the hex color. Ex: #00FF00 --> #00FF0084
    color += '64';

    return color;
  }
};
