import { CamelCase, CamelCasedProperties } from '@app/@shared/models/camel-case.model';
import { NumberProps } from '@app/@shared/models/number-props.model';
import {
  NFLClientProfilerQBProperties,
  NFLClientProfilerRBProperties,
  NFLClientProfilerReceiverProperties,
  ProfilerTimeFrameProps,
} from './nfl-client.model';

export type ProfilerQB = NumberProps<CamelCasedProperties<NFLClientProfilerQBProperties>>;
export type ProfilerRB = NumberProps<CamelCasedProperties<NFLClientProfilerRBProperties>>;
export type ProfilerReceiver = NumberProps<CamelCasedProperties<NFLClientProfilerReceiverProperties>>;

export type PlayerProfiler = ProfilerQB | ProfilerRB | ProfilerReceiver;
export type PlayerProfilerTimeframeMap = { [prop in CamelCase<ProfilerTimeFrameProps>]: PlayerProfiler };
export type PlayerProfilerEntityMap = Record<string, PlayerProfilerTimeframeMap>;

export type PlayerProfilerSeason = Pick<PlayerProfilerTimeframeMap, 'season'>;
export type PlayerProfilerSeasonMap = Record<string, PlayerProfilerSeason>;
