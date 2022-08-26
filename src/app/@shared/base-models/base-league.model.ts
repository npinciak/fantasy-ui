/**
 * Base front end league model
 *
 * Any league related models should extend this model
 */
type LeagueProps = 'id' | 'name' | 'abbreviation';

export type League = { [key in LeagueProps]: string };
