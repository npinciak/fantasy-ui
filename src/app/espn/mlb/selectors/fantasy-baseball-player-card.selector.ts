import { RouterSelector } from '@app/@core/store/router/router.selectors';
import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { exists, existsFilter } from '@app/@shared/utilities/utilities.m';
import { Selector } from '@ngxs/store';
import { MLB_TEAM_MAP } from '@sports-ui/ui-sdk/espn';
import { ProTeamEntity } from '@sports-ui/ui-sdk/espn-client';
import { BaseballPlayerCard } from '../models/baseball-player.model';
import { FantasyBaseballPlayerCardState } from '../state/fantasy-baseball-player-card.state';
import { FantasyBaseballProTeamScheduleSelector } from './fantasy-baseball-pro-team-schedule.selector';

export class FantasyBaseballPlayerCardSelector extends GenericSelector(FantasyBaseballPlayerCardState) {
  @Selector([RouterSelector.getPlayerId, FantasyBaseballPlayerCardSelector.getById])
  static getCurrentPlayerCard(
    playerId: string | null,
    getPlayerCardById: (id: string | null) => BaseballPlayerCard | null
  ): BaseballPlayerCard | null {
    if (!exists(playerId)) throw new Error('cannot retrieve player news without valid playerId');
    return getPlayerCardById(playerId);
  }

  @Selector([FantasyBaseballPlayerCardSelector.getCurrentPlayerCard, FantasyBaseballProTeamScheduleSelector.getById])
  static getCurrentPlayerCardStats(player: BaseballPlayerCard | null, getProTeamScheduleById: (id: string | null) => ProTeamEntity | null) {
    if (!exists(player)) throw new Error('cannot retrieve player news without valid playerId');
    if (!exists(player.stats)) return null;

    const gamesByScoringPeriod = getProTeamScheduleById(player.teamId)?.proGamesByScoringPeriod;

    const test = Object.values(player.stats).map(stat => {
      if (!exists(stat)) return null;
      if (!exists(stat?.scoringPeriodId)) return null;
      if (!exists(gamesByScoringPeriod)) return null;
      if (!exists(gamesByScoringPeriod[stat.scoringPeriodId])) return null;

      const teamMatch = gamesByScoringPeriod[stat.scoringPeriodId][0].awayProTeamId.toString() === player.teamId;

      const opponent = teamMatch
        ? MLB_TEAM_MAP[gamesByScoringPeriod[stat.scoringPeriodId][0].homeProTeamId]
        : MLB_TEAM_MAP[gamesByScoringPeriod[stat.scoringPeriodId][0].awayProTeamId];

      return {
        opponent,
        date: gamesByScoringPeriod[stat.scoringPeriodId][0].date,
        ...stat,
      };
    });

    return existsFilter(test);
  }
}
