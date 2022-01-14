import { CoreSchedule } from '@app/dfs/mlb/models/dfsPlayer.interface';
import { NflDfsState } from '@app/dfs/nfl/state/nfl-dfs.state';
import { DailyFantasyScheduleState } from '@app/dfs/state/daily-fantasy-schedule.state';
import { Selector } from '@ngxs/store';
import { camelCase } from 'lodash';
import { NFLClientTeamAttributes } from '../models/nfl-slate-attr.model';

interface NFLMatchup {
  home: TeamDetails;
  away: TeamDetails;
}

interface TeamDetails {
  info: any;
  vegas: any;
  scheduleAdjFantasyPts: any;
}

interface ScheduleAdjustedFantasyPts {
  RawQB: string;
  AdjQB: string;
  DifQB: string;
  RAWRB: string;
  AdjRB: string;
  DifRB: string;
  RawWR: string;
  AdjWR: string;
  DifWR: string;
  RawTE: string;
  AdjTE: string;
  DifTE: string;
}

export class NFLScheduleSelectors {
  @Selector([DailyFantasyScheduleState.getMap])
  static getScheduleList(schedule: { [id: string]: CoreSchedule }): CoreSchedule[] {
    return Object.values(schedule);
  }

  @Selector([DailyFantasyScheduleState.getMap])
  static getScheduleById(schedule: { [id: string]: CoreSchedule }): (id: string) => CoreSchedule {
    return (id: string) => schedule[id];
  }

  @Selector([NflDfsState.slateTeams])
  static getTeamAttrById(team: { [id: string]: NFLClientTeamAttributes }): (id: string) => NFLClientTeamAttributes {
    return (id: string) => team[id];
  }

  @Selector([NFLScheduleSelectors.getScheduleList])
  static selectTeamsInSlate(matchups: CoreSchedule[]): string[] {
    const set = new Set<string>();
    matchups.map(matchup => {
      set.add(matchup.team_home.hashtag);
      set.add(matchup.team_away.hashtag);
    });
    return Array.from(set);
  }

  @Selector([NflDfsState.site, NflDfsState.slate, NFLScheduleSelectors.getScheduleList, NFLScheduleSelectors.getTeamAttrById])
  static selectNflMatchups(
    site: string,
    slate: number,
    scheduleList: CoreSchedule[],
    getTeamAttrById: (id: string) => NFLClientTeamAttributes
  ): { [id: string]: MatchupTableRow } {
    const teams = {};

    scheduleList.map(res => {
      const homeTeamAttributesById = getTeamAttrById(res.team_home.rg_id) ?? null;
      const awayTeamAttributesById = getTeamAttrById(res.team_away.rg_id) ?? null;

      if (!(res.team_home.rg_id in teams)) {
        const homeTeam = transformTeam(res.team_home.rg_id, res, homeTeamAttributesById, awayTeamAttributesById, 'team_home');

        teams[res.team_home.rg_id] = homeTeam;
      }
      if (!(res.team_away.rg_id in teams)) {
        const awayTeam = transformTeam(res.team_away.rg_id, res, awayTeamAttributesById, homeTeamAttributesById, 'team_away');

        teams[res.team_away.rg_id] = awayTeam;
      }
    });

    return teams;
  }

  @Selector([NFLScheduleSelectors.selectNflMatchups])
  static selectNflMatchupList(matchups: { [id: string]: any }) {
    return Object.values(matchups);
  }

  @Selector([NFLScheduleSelectors.selectNflMatchupList])
  static nflMatchupsEmpty(slates: any[]): boolean {
    return slates.length === 0;
  }
}

const transformTeam = (
  teamId: string,
  schedule: CoreSchedule,
  team: NFLClientTeamAttributes | null,
  opponent: NFLClientTeamAttributes | null,
  homeAway: 'team_home' | 'team_away'
): MatchupTableRow => ({
  teamName: schedule[homeAway].hashtag,
  opponent: homeAway === 'team_home' ? schedule?.team_away.hashtag : `@ ${schedule?.team_home.hashtag}`,
  vegasOU: team?.vegas['o/u'] ?? 0,
  vegasLine: team?.vegas.line ?? 0,
  vegasTotal: team?.vegas.total ?? 0,
  vegasMovement: team?.vegas.movement ?? 0,

  ...transformScheduleAdjusted(opponent?.safpts),
});

const transformScheduleAdjusted = (val: { [id: string]: string }): TransformedScheduleAdjusted => {
  const transformed: TransformedScheduleAdjusted = {};
  for (const key in val) {
    if (Object.prototype.hasOwnProperty.call(val, key)) {
      transformed[camelCase('opp' + key)] = +val[key] ?? 0;
    }
  }
  return transformed;
};

export interface MatchupTableRow {
  teamName: string;
  opponent: string;
  vegasOU: number | null;
  vegasLine: number | null;
  vegasTotal: number | null;
  vegasMovement: number | null;
  oppAdjQb?: number | null;
  oppAdjRb?: number | null;
  oppAdjTe?: number | null;
  oppAdjWr?: number | null;
}

export interface TransformedScheduleAdjusted {
  oppAdjQb?: number | null;
  oppAdjRb?: number | null;
  oppAdjTe?: number | null;
  oppAdjWr?: number | null;
}
