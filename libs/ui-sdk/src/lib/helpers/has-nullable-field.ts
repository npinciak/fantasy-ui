export type NonNullableProps<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};

export type WithNonNullableProps<T, K extends keyof T> = T & {
  [P in K]: NonNullable<T[P]>;
};

/**
 * Takes input of object and specified fields, returns if fields are nullable
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
export function hasNonNullableFields<T extends object, K extends keyof T>(
  obj: T,
  requiredKeys: K[],
  throwError = true
): obj is WithNonNullableProps<T, K> {
  for (const key of requiredKeys) {
    if (obj[key] == null) {
      if (!throwError) return false;

      throw new Error(`${key.toString()} cannot be null.`);
    }
  }

  return true;
}
