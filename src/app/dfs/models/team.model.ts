import { ClientVegas } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';

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
