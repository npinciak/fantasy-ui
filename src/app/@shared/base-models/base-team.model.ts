/**
 * Base front end team model
 *
 * Any team related models should extend this model
 */
type TeamProps = 'id' | 'name' | 'logo';

export type Team = { [key in TeamProps]: string };
export type TeamMap = Record<string, Team>;
export type PartialTeam = Partial<Team>;
