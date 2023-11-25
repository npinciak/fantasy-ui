import * as DateFns from 'date-fns';

export class DateHelper {
  formatWithDelimiter({ date, delimiter = '' }: { date: number; delimiter?: string }): string {
    return DateFns.format(date, `yyyy${delimiter}MM${delimiter}dd`);
  }

  addHours(date: number, hours: number): Date {
    return DateFns.addHours(date, hours);
  }

  subtractYears(date: number, numOfYears: number): Date {
    return DateFns.subMonths(date, numOfYears * 12);
  }

  getYesterday() {
    return DateFns.subDays(new Date(), 1);
  }

  getTomorrow(): Date {
    return DateFns.addDays(new Date(), 1);
  }

  get oneWeekFromToday(): Date {
    return DateFns.addDays(new Date(), 7);
  }

  get oneWeekAgoFromToday(): Date {
    return DateFns.subDays(new Date(), 7);
  }
}
