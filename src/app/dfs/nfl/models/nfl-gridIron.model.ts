import { CamelCasedProperties } from '@app/@shared/models/camel-case.model';
import { NumberProps } from '@app/@shared/models/number-props.model';
import { NFLClientGridIronPlayer } from './nfl-client.model';

export type GridIronPlayer = NumberProps<CamelCasedProperties<NFLClientGridIronPlayer>>;
export type GridIronPlayerMap = Record<string, GridIronPlayer>;
