/**
 * Helper function to add delimeters
 * @returns Date in format yyyymmdd
 */
export function currentDate(delim?: string): string {
  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear().toString();

  const formatMonth = month <= 9 ? `0${month}` : month.toString();
  const formatDay = day <= 9 ? `0${day}` : day.toString();

  const delimeter = delim ? delim : '';

  return year + delimeter + formatMonth + delimeter + formatDay;
}

/**
 * Add hours to specific date/time
 * @param date
 * @param hours
 * @returns
 */
export function addHoursToDate(date: Date, hours: number): Date {
  const addHours = date.getHours() + hours;
  return new Date(new Date(date).setHours(addHours));
}
