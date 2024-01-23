import { RouterSelector } from '@app/@core/router/router.selectors';
import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { FantasyBaseballProTeamScheduleSelector } from '@app/espn-fantasy-baseball/selectors/fantasy-baseball-pro-team-schedule.selector';
import { Selector } from '@ngxs/store';
import { NFL_TEAM_MAP, ProTeamEntity, exists, existsFilter } from '@sports-ui/ui-sdk';
import { FootballPlayerCard } from '../models/football-player.model';
import { FantasyFootballPlayerCardState } from '../state/fantasy-football-player-card.state';

export class FantasyFootballPlayerCardSelector extends GenericSelector(FantasyFootballPlayerCardState) {
  @Selector([RouterSelector.getPlayerId, FantasyFootballPlayerCardSelector.getById])
  static getCurrentPlayerCard(
    playerId: string | null,
    getPlayerCardById: (id: string | null) => FootballPlayerCard | null
  ): FootballPlayerCard | null {
    if (!exists(playerId)) throw new Error('cannot retrieve player news without valid playerId');
    return getPlayerCardById(playerId);
  }

  @Selector([FantasyFootballPlayerCardSelector.getCurrentPlayerCard, FantasyBaseballProTeamScheduleSelector.getById])
  static getCurrentPlayerCardStats(player: FootballPlayerCard | null, getProTeamScheduleById: (id: string | null) => ProTeamEntity | null) {
    if (!exists(player)) throw new Error('cannot retrieve player news without valid playerId');
    if (!exists(player.stats)) return null;

    const gamesByScoringPeriod = getProTeamScheduleById(player.teamId)?.proGamesByScoringPeriod;

    const test = Object.values(player.stats).map(stat => {
      if (!exists(stat)) return null;
      if (!exists(stat?.scoringPeriodId)) return null;
      if (!exists(gamesByScoringPeriod)) return null;

      const scoringPeriodId = stat.scoringPeriodId;

      if (!exists(gamesByScoringPeriod[scoringPeriodId])) return null;

      const teamMatch = gamesByScoringPeriod[scoringPeriodId][0].awayProTeamId.toString() === player.teamId;

      const opponent = teamMatch
        ? NFL_TEAM_MAP[gamesByScoringPeriod[scoringPeriodId][0].homeProTeamId]
        : NFL_TEAM_MAP[gamesByScoringPeriod[scoringPeriodId][0].awayProTeamId];

      return {
        opponent,
        date: gamesByScoringPeriod[scoringPeriodId][0].date,
        ...stat,
      };
    });

    return existsFilter(test);
  }
}
