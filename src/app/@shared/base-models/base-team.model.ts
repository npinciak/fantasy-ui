type BaseTeamEntityProps = 'id' | 'name' | 'abbrev' | 'logo';

/**
 * Base front end team model
 *
 * Any team related models should extend this model
 */
export type TeamEntity = Required<{ [key in BaseTeamEntityProps]: string }>;
export type TeamEntityMap = Record<string, TeamEntity>;
export type PartialTeamEntity = Partial<TeamEntity>;
