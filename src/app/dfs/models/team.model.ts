import { ClientVegas } from '@dfsClient/daily-fantasy-client.model';

/**
 * Base team model
 */
interface TeamProperties {
  id: string;
  rgId: string;
  name: string | null;
  shortName: string | null;
}

export type Team = TeamProperties;
export type TeamMap = Record<string, Team>;

/**
 * Base slate attr team model
 */
export interface SlateAttrTeamProperties {
  vegas: ClientVegas;
}

export type SlateAttrTeam = Team & SlateAttrTeamProperties;
