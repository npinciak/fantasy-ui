import { RouterSelector } from '@app/@core/store/router/router.selectors';
import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { FastcastEventTeam } from '@app/espn-fastcast/models/fastcast-team.model';
import { EspnFastcastTeamSelectors } from '@app/espn-fastcast/selectors/espn-fastcast-team.selectors';
import { startingPlayersFilter } from '@app/espn/espn-helpers';
import { Selector } from '@ngxs/store';
import { MLB_LINEUP_MAP } from 'sports-ui-sdk';
import { BaseballPlayer } from '../models/baseball-player.model';
import { BaseballTeamLive } from '../models/baseball-team.model';
import { FantasyBaseballTeamsLiveState } from '../state/fantasy-baseball-team-live.state';

export class FantasyBaseballTeamLiveSelector extends GenericSelector(FantasyBaseballTeamsLiveState) {
  @Selector([FantasyBaseballTeamLiveSelector.getList])
  static standings(teamList: BaseballTeamLive[]) {
    return teamList.sort((a, b) => b.liveScore - a.liveScore);
  }

  @Selector([RouterSelector.getTeamId, FantasyBaseballTeamLiveSelector.getById])
  static getLiveTeamBatters(teamId: string | null | null, getLiveTeamById: (id: string) => BaseballTeamLive): BaseballPlayer[] {
    return teamId ? getLiveTeamById(teamId).roster.filter(p => !p.isPitcher) : [];
  }

  @Selector([FantasyBaseballTeamLiveSelector.getLiveTeamBatters, EspnFastcastTeamSelectors.getById])
  static getLiveTeamBatterStats(
    getLiveTeamBatters: (id: string) => BaseballPlayer[],
    selectFastcastTeamById: (id: string) => FastcastEventTeam | null
  ) {
    return (id: string) => {
      const batters = startingPlayersFilter(getLiveTeamBatters(id), MLB_LINEUP_MAP);
      return batters.map(p => {
        const eventUid = selectFastcastTeamById(p?.teamUid)?.eventUid;

        const stats = {};
        if (eventUid) {
          // const event = YearToStatTypePeriod(StatTypePeriodId.Live `${eventUid.split('~')[3].replace('c:', '')}`);
          // stats = exists(p.stats) ? p.stats[event] : {};
        }

        const { name, img, team, position, percentChange, percentOwned } = p;

        return {
          name,
          img,
          team,
          position,
          percentChange,
          percentOwned,
          stats,
        };
      });
    };
  }
}
