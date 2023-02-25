import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statFormat',
})
export class StatPipe implements PipeTransform {
  transform(value: unknown, arg: unknown) {
    if (arg === 'number' && typeof value === 'string') return 0;
    return value;
  }
}
