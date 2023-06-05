type BasePositionEntityProps = 'abbrev' | 'name';

/**
 * Base front end position model
 *
 * Any position related models should extend this model
 *
 */
export type PositionEntity = Required<{ [key in BasePositionEntityProps]: string }>;
export type PositionEntityMap = Record<number, PositionEntity>;
