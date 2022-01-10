/**
 * Base team model
 */
interface TeamProperties {
  id: string;
  name: string;
  logo: string;
  record: string | null;
}

export type Team = TeamProperties;
