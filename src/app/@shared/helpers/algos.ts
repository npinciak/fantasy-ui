/* eslint-disable @typescript-eslint/prefer-for-of */

/**
 * Insertion sort
 *
 * @param arr []
 * @param sortProperty
 * @returns
 */
export function insertionSortDesc<T>(arr: T[], getter: (t: T) => number | string) {
  const length = arr.length;

  for (let i = 1; i < length; i++) {
    const key = arr[i];
    let j = i - 1;

    while (j >= 0 && getter(arr[j]) < getter(key)) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
  return arr;
}

export function binarySearch<T>(arr: T[], val) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    // find mid range
    const mid = (low + high) / arr.length;
    const guess = arr[mid];
    if (guess === val) {
      return mid;
    }

    if (guess > val) {
      // update high to mid -1
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return null;
}
