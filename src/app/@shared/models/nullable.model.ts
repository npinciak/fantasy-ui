import { OneOrMany } from './one-or-many.model';

export type OrNull<Type> = Type | null;

export type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;
