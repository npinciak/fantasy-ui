import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mlbStat',
})
export class MlbStatPipe implements PipeTransform {
  transform(value: unknown, arg: unknown): unknown {
    switch (arg) {
      case 'number':
        if (typeof value === 'string') {
          return 0;
        }
        return value;
      default:
        return value;
    }
  }
}