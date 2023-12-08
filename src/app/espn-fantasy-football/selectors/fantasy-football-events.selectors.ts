import { RouterSelector } from '@app/@core/router/router.selectors';
import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { Selector } from '@app/@shared/models/typed-selector';
import { EspnClient } from '@sports-ui/ui-sdk';
import { exists } from '@sports-ui/ui-sdk/helpers';
import { FantasyFootballScoringPeriod } from '../fantasy-football-scoring-period';
import { FootballPlayer } from '../models/football-player.model';
import { FantasyFootballEventsState } from '../state/fantasy-football-events.state';
import { FantasyFootballLeagueSelector } from './fantasy-football-league.selectors';
import { FantasyFootballTeamSelectors } from './fantasy-football-team.selectors';

export class FantasyFootballEventsSelectors extends GenericSelector(FantasyFootballEventsState) {
  @Selector([
    RouterSelector.getTeamId,
    FantasyFootballTeamSelectors.getTeamStarters,
    FantasyFootballEventsSelectors.getById,
    FantasyFootballLeagueSelector.slices.seasonId,
    FantasyFootballLeagueSelector.slices.scoringPeriodId,
  ])
  static getLiveTeamStats(
    teamId: string | null,
    players: FootballPlayer[],
    getFootballEventById: (id: string | null) => EspnClient.EventEntity,
    seasonId: string | null,
    week: string | null
  ) {
    if (!teamId) throw new Error('teamId cannot be null');
    return players.map(p => {
      const eventIds = exists(p.stats) ? Object.keys(p.stats) : [];

      const event = eventIds.find(id => getFootballEventById(id.substring(2)));

      const projectedScoringPeriodId = FantasyFootballScoringPeriod.projectedWeek(seasonId, week);

      const currentScoringPeriodStats = p.stats != null && exists(event) ? p.stats[event] : null;
      const projectedScoringPeriodStats = p.stats != null ? p.stats[projectedScoringPeriodId] : null;

      const { appliedTotal } = currentScoringPeriodStats != null ? currentScoringPeriodStats : { appliedTotal: null };

      const { id, name, injured, injuryStatus, img, team, position, lineupSlotId } = p;

      const totalDelta = delta(appliedTotal, projectedScoringPeriodStats?.appliedTotal ?? null);

      return {
        id,
        name,
        injured,
        injuryStatus,
        img,
        team,
        position,
        lineupSlotId,
        appliedTotal,
        projectedTotal: projectedScoringPeriodStats?.appliedTotal ?? null,
        totalDelta,
        currentScoringPeriodStats,
        projectedScoringPeriodStats,
      };
    });
  }
}

function delta(current: number | null, projected: number | null): number {
  if (current == null || projected == null) return 0;
  return current - projected;
}
