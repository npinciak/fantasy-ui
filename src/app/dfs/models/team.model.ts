import { Vegas } from './daily-fantasy-client.model';

/**
 * Base team model
 */
interface TeamProperties {
  id: string;
  rgId: string | null;
  name: string | null;
  shortName: string | null;
}

export type Team = TeamProperties;

/**
 * Base slate attr team model
 */
export interface SlateAttrTeamProperties {
  vegas: Vegas;
}

export type SlateAttrTeam = SlateAttrTeamProperties;
