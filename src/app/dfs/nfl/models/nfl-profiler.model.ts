import { NFLClientProfilerQBProperties, NFLClientProfilerRBProperties, NFLClientProfilerReceiverProperties } from './nfl-client.model';

export type ProfilerQB = NFLClientProfilerQBProperties;
export type ProfilerRB = NFLClientProfilerRBProperties;
export type ProfilerReceiver = NFLClientProfilerReceiverProperties;

export type PlayerProfiler = NFLClientProfilerQBProperties | NFLClientProfilerRBProperties | NFLClientProfilerReceiverProperties;
