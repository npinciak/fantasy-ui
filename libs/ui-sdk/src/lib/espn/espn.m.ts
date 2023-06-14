import { LegacyEspnFastcastClient } from './models/espn-fastcast.model';

export * from './baseball/lineup/lineup.m';
export * from './baseball/position/mlb-position.m';
export * from './baseball/stadium/stadium.m';
export * from './baseball/stat-thresholds/stat-thresholds.m';
export * from './baseball/stats/mlb-stats.m';
export * from './baseball/team/mlb-team.m';

export * from './football/lineup/lineup.m';
export * from './football/position/nfl-position.m';
export * from './football/stats/nfl-stats.m';
export * from './football/team/nfl-team.m';
export * from './injury/injury.m';
export * as EspnFootballClient from './models/espn-client-football.model';
export * from './models/espn-client.const';
export * as EspnClient from './models/espn-client.model';

export import EspnFastcastClient = LegacyEspnFastcastClient;
