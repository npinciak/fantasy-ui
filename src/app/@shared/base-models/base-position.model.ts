/**
 * Base front end position model
 *
 * Any position related models should extend this model
 *
 */
type BasePositionProps = 'abbrev' | 'name';

export type Position = { [key in BasePositionProps]: string };
export type PositionMap = Record<number, Position>;
