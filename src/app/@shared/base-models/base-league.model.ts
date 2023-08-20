type BaseLeagueEntityProps = 'id' | 'name' | 'abbreviation';

/**
 * Base front end league model
 *
 * Any league related models should extend this model
 */
export type LeagueEntity = Required<{ [key in BaseLeagueEntityProps]: string }>;
