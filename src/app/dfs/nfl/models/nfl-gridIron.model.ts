import { CamelCasedProperties } from '@app/@shared/models/camel-case.model';
import { NFLClientGridIronPlayer } from '@sports-ui/daily-fantasy-sdk/models';

type NormalizedGridIronPlayerAttributes = CamelCasedProperties<NFLClientGridIronPlayer>;

type GridIronPlayerAttributes = Omit<NormalizedGridIronPlayerAttributes, 'playerid' | 'partnerid' | 'fpts$'> & {
  partnerId: string | null;
  fptsPerK: string | null;
};

export type GridIronPlayer = Required<{ [key in keyof GridIronPlayerAttributes]: number | null } & { playerId: string }>;

export type GridIronPlayerMap = Record<string, GridIronPlayer>;
