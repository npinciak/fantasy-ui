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

  return `${year}${delimeter}${formatMonth}${delimeter}${formatDay}`;
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

/**
 * Subtract num of years
 * @param numOfYears
 * @param date
 * @returns
 */
export function subtractYears(numOfYears, date = new Date()) {
  return new Date(date.setFullYear(date.getFullYear() - numOfYears)).getFullYear().toString();
}

/**
 * Beautify ticker dates
 * @param val
 *
 * @return Mon, 2:37 PM EDT
 */
export function tickerDate(val: number): string;
export function tickerDate(): string;
export function tickerDate(val?: number): string {
  const format: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZoneName: 'short',
  };
  if (val == undefined) {
    return new Date().toLocaleDateString('en-US', format);
  }
  return new Date(val).toLocaleDateString('en-US', format);
}
