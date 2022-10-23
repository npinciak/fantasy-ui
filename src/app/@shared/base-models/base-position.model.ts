/**
 * Base front end position model
 *
 * Any position related models should extend this model
 *
 */
type BasePositionEntityProps = 'abbrev' | 'name';

export type PositionEntity = Required<{ [key in BasePositionEntityProps]: string }>;
export type PositionEntityMap = Record<number, PositionEntity>;
