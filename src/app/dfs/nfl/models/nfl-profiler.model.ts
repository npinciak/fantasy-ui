import { CamelCase, CamelCasedProperties } from '@app/@shared/models/camel-case.model';
import {
  NFLClientProfilerQBProperties,
  NFLClientProfilerRBProperties,
  NFLClientProfilerReceiverProperties,
  ProfilerTimeFrameProps,
} from './nfl-client.model';

export type ProfilerQB = CamelCasedProperties<NFLClientProfilerQBProperties>;
export type ProfilerRB = CamelCasedProperties<NFLClientProfilerRBProperties>;
export type ProfilerReceiver = CamelCasedProperties<NFLClientProfilerReceiverProperties>;

export type PlayerProfiler = ProfilerQB | ProfilerRB | ProfilerReceiver;
export type PlayerProfilerTimeframeMap = { [prop in CamelCase<ProfilerTimeFrameProps>]: PlayerProfiler };
export type PlayerProfilerEntityMap = Record<string, PlayerProfilerTimeframeMap>;
