type BaseStatEntityProps = 'abbrev' | 'description';

/**
 * Base front end stats model
 *
 * Any stats related models should extend this model
 */
export type StatEntity = Required<{ [key in BaseStatEntityProps]: string }>;
