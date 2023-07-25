interface EntityBaseAttributes<T> {
  id: T;
  uid: T;
  name: T;
  shortName: T;
  abbreviation: T;
  slug: T;
}

export type EntityBase = EntityBaseAttributes<string>;
