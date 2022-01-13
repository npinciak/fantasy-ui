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
