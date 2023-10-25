import { FASTCAST_DATE_SHORT } from '@app/espn/espn.const';
import * as DateFns from 'date-fns';
import { enUS } from 'date-fns/locale';
import { DateHelper } from '../@shared/helpers/date-helper';

export class EspnDateHelper extends DateHelper {
  tickerDate(time: number): string {
    return DateFns.format(time, FASTCAST_DATE_SHORT, { locale: enUS });
  }
}
