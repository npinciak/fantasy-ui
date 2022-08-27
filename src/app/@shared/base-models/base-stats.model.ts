/**
 * Base front end stats model
 *
 * Any stats related models should extend this model
 */
type BaseStatEntityProps = 'abbrev' | 'description';

export type StatEntity = Required<{ [key in BaseStatEntityProps]: string }>;
