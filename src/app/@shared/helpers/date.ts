import { FASTCAST_DATE_SHORT } from '@app/espn/espn.const';
import * as DateFns from 'date-fns';
import { enUS } from 'date-fns/locale';
/**
 * Helper function to add delimeters
 *
 * @returns Date in format yyyymmdd
 */
export function espnDateFormatter({ delim, date }: { delim?: string; date: number }): string {
  const delimeter = delim ? delim : '';

  return DateFns.format(date, `yyyy${delimeter}MM${delimeter}dd`);
}

/**
 * Add hours to specific date/time
 *
 * @param date
 * @param hours
 *
 * @returns
 */
export function addHoursToDate(date: number, hours: number): Date {
  return DateFns.addHours(date, hours);
}

/**
 * Subtract num of years
 *
 * @param numOfYears
 * @param date
 * @returns Date
 */
export function subtractYears(date: number, numOfYears: number): Date {
  return DateFns.subMonths(date, numOfYears * 12);
}

/**
 * Beautify ticker dates
 *
 * @param val
 *
 * @return Mon, 2:37 PM EDT
 */
export function tickerDate(val: number): string {
  return DateFns.format(val, FASTCAST_DATE_SHORT, { locale: enUS });
}
