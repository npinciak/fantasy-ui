/**
 * Base front end league model
 *
 * Any league related models should extend this model
 */
type BaseLeagueEntityProps = 'id' | 'name' | 'abbreviation';

export type LeagueEntity = Required<{ [key in BaseLeagueEntityProps]: string }>;
