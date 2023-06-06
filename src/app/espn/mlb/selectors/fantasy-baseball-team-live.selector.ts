import { RouterSelector } from '@app/@core/store/router/router.selectors';
import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { startingPlayersFilter } from '@app/espn/espn-helpers';
import { Selector } from '@ngxs/store';
import { BASEBALL_LINEUP_MAP } from '@sports-ui/ui-sdk/espn';
import { BaseballEvent } from '../models/baseball-event.model';
import { BaseballPlayer } from '../models/baseball-player.model';
import { BaseballTeam, BaseballTeamLive } from '../models/baseball-team.model';
import { FantasyBaseballTeamsLiveState } from '../state/fantasy-baseball-team-live.state';
import { FantasyBaseballEventSelector } from './fantasy-baseball-event.selector';
import { FantasyBaseballTeamSelector } from './fantasy-baseball-team.selector';

export class FantasyBaseballTeamLiveSelector extends GenericSelector(FantasyBaseballTeamsLiveState) {
  @Selector([FantasyBaseballTeamLiveSelector.getList, FantasyBaseballTeamSelector.getById])
  static standings(teamList: BaseballTeamLive[], getTeamByTeamId: (id: string | null) => BaseballTeam | null): BaseballTeam[] {
    return teamList
      .map(t => {
        const team = getTeamByTeamId(t.id);
        if (!team) throw new Error('Team cannot be null');
        return {
          ...team,
          ...t,
        };
      })
      .sort((a, b) => b.liveScore - a.liveScore);
  }

  @Selector([RouterSelector.getTeamId, FantasyBaseballTeamLiveSelector.getById])
  static getLiveTeamBatters(teamId: string | null | null, getLiveTeamById: (id: string) => BaseballTeamLive): BaseballPlayer[] {
    return teamId ? getLiveTeamById(teamId).roster.filter(p => !p.isPitcher) : [];
  }

  @Selector([FantasyBaseballTeamLiveSelector.getLiveTeamBatters, FantasyBaseballEventSelector.getById])
  static getLiveTeamBatterStats(
    getLiveTeamBatters: (id: string) => BaseballPlayer[],
    getLiveBaseballEventById: (id: string | null) => BaseballEvent | null
  ) {
    return (id: string) => {
      const batters = startingPlayersFilter(getLiveTeamBatters(id), BASEBALL_LINEUP_MAP);
      return batters.map(p => {
        const games = Object.keys(p.starterStatusByProGame);

        const gameList = games.map(g => getLiveBaseballEventById(g));

        const eventUid = true; //getLiveBaseballEventById()

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
