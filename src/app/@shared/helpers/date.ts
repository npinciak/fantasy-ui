import { FASTCAST_DATE_SHORT } from '@app/espn/espn.const';
import * as DateFns from 'date-fns';
import { enUS } from 'date-fns/locale';

/**
 * Helper function to add delimeters to dates. Espn's api uses a variety of date formats to make api calls
 *
 * @param date date in milli
 * @param hours
 *
 * @returns {string} 20230310
 *
 * @example
 *
 * ```typescript
 * // no delimeter
 * espnDateFormatter({ date: 1234 }) //returns 20230310
 *
 * // using '-' as delimeter
 * espnDateFormatter({ date: 1234, delim: '-' }) //returns 2023-03-10
 * ```
 *
 */
export function espnDateFormatter({ date, delim }: { date: number; delim?: string }): string {
  const delimeter = delim ? delim : '';

  return DateFns.format(date, `yyyy${delimeter}MM${delimeter}dd`);
}

/**
 * Add hours to specific date/time
 *
 * @param date date in milli
 * @param hours
 *
 * @returns {Date} Thu Mar 09 2023 09:22:47 GMT-0500 (Eastern Standard Time)
 *
 * @example
 * ```typescript
 *
 * addHoursToDate(123456,2)
 * ```
 */
export function addHoursToDate(date: number, hours: number): Date {
  return DateFns.addHours(date, hours);
}

/**
 * Subtract num of years
 *
 * @param date date in milli
 * @param numOfYears
 * @returns {Date} Thu Mar 09 2023 09:22:47 GMT-0500 (Eastern Standard Time)
 *
 * @example
 * ```typescript
 * subtractYears(123456,2)
 * ```
 */
export function subtractYears(date: number, numOfYears: number): Date {
  return DateFns.subMonths(date, numOfYears * 12);
}

/**
 * Get's yesterday's date as Date object
 * @returns {Date} Thu Mar 09 2023 09:22:47 GMT-0500 (Eastern Standard Time)
 *
 * @example
 * ```typescript
 *
 * getYesterdayDate()
 *
 * ```
 */
export function getYesterdayDate() {
  return DateFns.subDays(new Date(), 1);
}

/**
 * Get's tomorrow's date as Date object
 *
 * @returns {Date} Thu Mar 09 2023 09:22:47 GMT-0500 (Eastern Standard Time)
 *
 * @example
 * ```typescript
 *
 * getTomorrowDate()
 *
 * ```
 */
export function getTomorrowDate(): Date {
  return DateFns.addDays(new Date(), 1);
}

/**
 * Beautify ticker dates
 *
 * @param time
 *
 * @return {string} Mon, 2:37 PM EDT
 */
export function tickerDate(time: number): string {
  return DateFns.format(time, FASTCAST_DATE_SHORT, { locale: enUS });
}
