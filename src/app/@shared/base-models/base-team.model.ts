/**
 * Base front end team model
 *
 * Any team related models should extend this model
 */
type BaseTeamEntityProps = 'id' | 'name' | 'logo';

export type TeamEntity = Required<{ [key in BaseTeamEntityProps]: string }>;
export type TeamEntityMap = Record<string, TeamEntity>;
export type PartialTeamEntity = Partial<TeamEntity>;
