import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statFormat',
})
export class StatPipe implements PipeTransform {
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
