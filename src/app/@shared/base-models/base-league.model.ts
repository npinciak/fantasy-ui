type BaseLeagueEntityProps = 'id' | 'name' | 'abbrev';

/**
 * Base front end league model
 *
 * Any league related models should extend this model
 */
export type LeagueEntity = Required<{ [key in BaseLeagueEntityProps]: string }>;
