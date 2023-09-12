import { Selector } from '@app/@shared/models/typed-selector';
import { BaseEspnEndpointBuilder } from '@app/espn/endpoint-builder/base-espn-endpoint-builder';
import { FantasySports } from '@app/espn/models/espn-endpoint-builder.model';
import { FantasyLeagueBaseSelector } from '@app/espn/state/base-league.selector';
import { FantasyFootballScoringPeriod } from '../fantasy-football-scoring-period';
import { FantasyFootballLeagueState } from '../state/fantasy-football-league.state';

export class FantasyFootballLeagueSelector extends FantasyLeagueBaseSelector(FantasyFootballLeagueState) {
  @Selector([FantasyFootballLeagueSelector.slices.seasonId, FantasyFootballLeagueSelector.slices.scoringPeriodId])
  static scoringPeriodFilters(seasonId: string | null, week: string | null) {
    return [
      { value: FantasyFootballScoringPeriod.projectedWeek(seasonId, week), label: `Week ${week} Proj` },
      ...FantasyFootballScoringPeriod.filterOptionList(seasonId),
    ];
  }

  @Selector([FantasyFootballLeagueSelector.slices.scoringPeriodId, FantasyFootballLeagueSelector.slices.id])
  static leagueLinkout(seasonId: string | null, leagueId: string | null) {
    return BaseEspnEndpointBuilder({ sport: FantasySports.Football, leagueId: leagueId ?? '', year: seasonId ?? '' }).leagueClickout;
  }
}
