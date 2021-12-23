export const toInt = (str: string): { valid: boolean; int?: number } => {
  // eslint-disable-next-line radix
  const int = parseInt(str);
  if (isNaN(int)) {
    return { valid: false };
  } else {
    return { valid: true, int };
  }
};
