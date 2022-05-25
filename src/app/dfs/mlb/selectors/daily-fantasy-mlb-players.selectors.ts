import { exists } from '@app/@shared/helpers/utils';
import { PlayerSlateAttr } from '@app/dfs/models/player-slate-attr.model';
import { Player, PlayerTableData } from '@app/dfs/models/player.model';
import { Schedule } from '@app/dfs/models/schedule.model';
import { DailyFantasyPlayersSelectors } from '@app/dfs/selectors/daily-fantasy-players.selectors';
import { DailyFantasyScheduleSelectors } from '@app/dfs/selectors/daily-fantasy-schedule.selectors';
import { SlateTeam } from '@app/dfs/service/slate.service';
import { Selector } from '@ngxs/store';
import { DailyFantasyMlbPlayerSlateAttributeSelectors } from './daily-fantasy-mlb-player-slate-attr.selectors';
import { DailyFantasyMlbTeamSlateAttributeSelectors } from './daily-fantasy-mlb-team-slate-attr.selectors';

export class DailyFantasyMlbPlayerSelectors {
  @Selector([
    DailyFantasyPlayersSelectors.getList,
    DailyFantasyMlbTeamSlateAttributeSelectors.getById,
    DailyFantasyMlbPlayerSlateAttributeSelectors.getById,
    DailyFantasyScheduleSelectors.getById,
  ])
  static getPlayerTableData(
    playerList: Player[],
    teamSlateAttrById: (id: string) => SlateTeam | null,
    playerSlateAttrById: (id: string) => PlayerSlateAttr | null,
    gameById: (id: string) => Schedule | null
  ): Partial<PlayerTableData>[] {
    return playerList
      .map(p => {
        const teamSlateAttr = exists(p.rgTeamId) ? teamSlateAttrById(p.rgTeamId) : null;
        const slatePlayer = exists(p.rgId) ? playerSlateAttrById(p.rgId) : null;
        const game = exists(p.gameId) ? gameById(p.gameId) : null;

        return {
          ...p,
          name: p.name,
          position: p.position,
          rgId: p.rgId,
          team: p.team,
          siteId: null,
          opp: p.rgTeamId === game?.homeTeam?.rgId ? game?.awayTeam.shortName : game?.homeTeam.shortName,
          isHome: p.rgTeamId === game?.homeTeam?.rgId ?? false,
          statGroup: slatePlayer?.statGroup ?? '',
          salary: exists(slatePlayer?.salaryDiff) ? Number(slatePlayer?.salaryDiff.salary) : 0,

          ...slatePlayer,
          ...teamSlateAttr,
          ...game,
        };
      })
      .filter(p => p.salary !== 0);
  }
}
