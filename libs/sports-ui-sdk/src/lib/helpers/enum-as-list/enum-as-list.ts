export function enumAsList<T extends string>(_enum: { [key: string]: T }): T[];
export function enumAsList<T, U extends T[keyof T] & number>(_enum: U extends Exclude<U, string> ? T : never): U[];
export function enumAsList<T, U extends T[keyof T] & (string | number)>(_enum: U): U[] {
  const values = Object.values(_enum);
  return values.some(o => typeof o === 'number') ? values.filter(o => !Number.isNaN(parseFloat(o.toString()))) : values;
}
