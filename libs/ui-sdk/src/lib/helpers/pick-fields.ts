/**
 * Takes input of object and specified fields, returns specified fields
 *
 * @param object
 * @param fields
 * @returns
 *
 * @example ```typescript
 *
 * pickFields(person, ["name", "email", "phone"])
 *
 * ```
 *
 */
export function pickFields<T extends object, K extends keyof T>(object: T, fields: K[]): Pick<T, K> {
  const result: Pick<T, K> = {} as Pick<T, K>;

  for (const field of fields) {
    // eslint-disable-next-line no-prototype-builtins
    if (object.hasOwnProperty(field)) {
      result[field] = object[field];
    }
  }

  return result;
}
