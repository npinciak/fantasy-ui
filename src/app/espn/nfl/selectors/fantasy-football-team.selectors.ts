import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { exists } from '@app/@shared/helpers/utils';
import { Selector } from '@app/@shared/models/typed-selector';
import { NFL_LINEUP_MAP } from '../consts/lineup.const';
import { FootballPlayer } from '../models/football-player.model';
import { FootballPosition } from '../models/football-position.model';
import { FootballTeamProperties } from '../models/football-team.model';
import { FantasyFootballLeagueState, FantasyFootballLeagueStateModel } from '../state/fantasy-football-league.state';

import { FantasyFootballTeamState } from '../state/fantasy-football-teams.state';

export class FantasyFootballTeamSelectors extends GenericSelector(FantasyFootballTeamState) {
  @Selector([FantasyFootballTeamSelectors.getById])
  static getRosterByTeamId(getById: (id: string | null) => FootballTeamProperties): (id: string | null) => FootballPlayer[] {
    return (id: string | null) => {
      if (!exists(id)) return [];
      return getById(id).roster;
    };
  }

  @Selector([FantasyFootballTeamSelectors.getRosterByTeamId])
  static getTeamStarters(getRosterByTeamId: (id: string | null) => FootballPlayer[]): (id: string | null) => FootballPlayer[] {
    return (id: string | null) =>
      getRosterByTeamId(id)
        .filter(p => NFL_LINEUP_MAP[p.lineupSlotId].starter)
        .sort((a, b) => NFL_LINEUP_MAP[a.lineupSlotId].displayOrder - NFL_LINEUP_MAP[b.lineupSlotId].displayOrder);
  }

  @Selector([FantasyFootballTeamSelectors.getTeamStarters])
  static getTeamStartersPoints(getTeamStarters: (id: string | null) => FootballPlayer[]): (id: string | null) => number {
    return (id: string | null) => getTeamStarters(id).reduce((a, b) => a + b.points, 0);
  }

  @Selector([FantasyFootballTeamSelectors.getRosterByTeamId])
  static getTeamBench(getRosterByTeamId: (id: string | null) => FootballPlayer[]): (id: string | null) => FootballPlayer[] {
    return (id: string | null) => getRosterByTeamId(id).filter(p => NFL_LINEUP_MAP[p.lineupSlotId].bench);
  }

  @Selector([FantasyFootballTeamSelectors.getTeamBench])
  static getTeamBenchPoints(getTeamBench: (id: string | null) => FootballPlayer[]): (id: string | null) => number {
    return (id: string | null) => getTeamBench(id).reduce((a, b) => a + b.points, 0);
  }

  @Selector([FantasyFootballTeamSelectors.getRosterByTeamId])
  static getTeamStats(getRosterByTeamId: (id: string | null) => FootballPlayer[]) {
    return (id: string | null, statPeriod: string) =>
      getRosterByTeamId(id).map(p => {
        const stats = exists(p.stats) ? p.stats[statPeriod] : {};

        return {
          name: p.name,
          isInjured: p.isInjured,
          injuryStatus: p.injuryStatus,
          img: p.img,
          team: p.team,
          lineupSlotId: p.lineupSlotId,
          position: p.position,
          defaultPositionId: p.defaultPositionId,

          // playerOwnershipChange: p.playerOwnershipChange,
          // playerOwnershipPercentOwned: p.playerOwnershipPercentOwned,
          stats,
        };
      });
  }

  @Selector([FantasyFootballTeamSelectors.getTeamStats])
  static getTeamStatsByPositionId(getTeamStats: (id: string | null, statPeriod: string) => any[]) {
    return (id: string | null, statPeriod: string, positionId: FootballPosition) =>
      getTeamStats(id, statPeriod).filter(p => p.defaultPositionId === positionId);
  }

  @Selector([FantasyFootballTeamSelectors.getRosterByTeamId])
  static getTeamPositionsCount(getRosterByTeamId: (id: string | null) => FootballPlayer[]) {
    return (id: string | null) => {
      const teamPositionCount = {};

      getRosterByTeamId(id).map(p => {
        const position = NFL_LINEUP_MAP[p.defaultPositionId].abbrev;

        if (position in teamPositionCount) {
          teamPositionCount[position]++;
        } else {
          teamPositionCount[position] = 0;
          teamPositionCount[position]++;
        }
      });

      return teamPositionCount;
    };
  }

  @Selector([FantasyFootballLeagueState.getState, FantasyFootballTeamSelectors.getTeamPositionsCount])
  static getLineupLimits(state: FantasyFootballLeagueStateModel, getTeamById: (id: string | null) => Record<string, number>) {
    return (id: string | null) => {
      const teamLineupCount = getTeamById(id);
      const positionLimits = state.settings.rosterSettings.lineupCountLimits;

      const teamPositionCount = {};

      return teamPositionCount;
    };
  }

  // @Selector([FantasyFootballTeamState.])
  // static selectFantasyTeamById(map: { [id: number]: EspnClientTeam }): (id: number) => FantasyTeam {
  //   return (id: number) => FantasyFootballTeamsSelectors.transformTeamImportToFantasyTeam(map[id]);
  // }
  // @Selector([FantasyFootballTeamState])
  // static selectFantasyTeamList(map: { [id: number]: EspnClientTeam }): FantasyTeam[] {
  //   return Object.values(map).map(m => FantasyFootballTeamsSelectors.transformTeamImportToFantasyTeam(m));
  // }
}
