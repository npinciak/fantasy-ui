import { Player, PlayerTableData } from '@app/dfs/models/player.model';
import { Schedule } from '@app/dfs/models/schedule.model';
import { Team } from '@app/dfs/models/team.model';
import { DailyFantasyPlayersSelectors } from '@app/dfs/selectors/daily-fantasy-players.selectors';
import { DailyFantasyScheduleSelectors } from '@app/dfs/selectors/daily-fantasy-schedule.selectors';
import { DailyFantasySlateAttrSelectors } from '@app/dfs/selectors/daily-fantasy-slate-attr.selectors';
import { DailyFantasyTeamsSelectors } from '@app/dfs/selectors/daily-fantasy-team.selectors';
import { SlateTeam } from '@app/dfs/service/slate.service';
import { DailyFantasySlateAttrState } from '@app/dfs/state/daily-fantasy-slate-attr.state';
import { DailyFantasySlateState } from '@app/dfs/state/daily-fantasy-slate.state';
import { Selector } from '@ngxs/store';

export class DailyFantasyMlbPlayerSelectors {
  @Selector([
    DailyFantasySlateState.site,
    DailyFantasySlateAttrState.slate,
    DailyFantasyPlayersSelectors.selectPlayerList,
    DailyFantasySlateAttrSelectors.selectTeamById,
    DailyFantasyTeamsSelectors.selectTeamById,

    DailyFantasySlateAttrSelectors.selectPlayerById,
    DailyFantasyScheduleSelectors.selectGameById,
  ])
  static getPlayerTableData(
    site: string,
    slate: string,
    playerList: Player[],
    selectTeamSlateAttrById: (id: string) => SlateTeam,
    selectTeamById: (id: string) => Team,
    selectPlayerById: (id: string) => any,
    selectGameById: (id: string) => Schedule
  ): Partial<PlayerTableData>[] {
    return [];
    //  playerList
    //   .map(p => {
    //     const playerRgId = p.rgId;

    //     const teamSlateAttr = selectTeamSlateAttrById(p.rgTeamId);

    //     const slatePlayer = selectPlayerById(playerRgId);

    //     const game = selectGameById(p.gameId);

    //     return {
    //       name: p.name,
    //       position: p.position,
    //       siteId: null,
    //       rgId: p.rgId,
    //       team: p.team,
    //       opp: p.rgTeamId === game?.homeTeam?.rgId ? game?.awayTeam.shortName : game?.homeTeam.shortName,
    //       isHome: p.rgTeamId === game?.homeTeam?.rgId ?? false,
    //       statGroup: slatePlayer?.stat_group ?? '',
    //       salary: Number(slatePlayer?.salaryDiff?.salary) ?? null,
    //       ...teamSlateAttr,
    //       ...game,
    //       // playerAdvanced: {
    //       //   fptsPerGame: toInt(profilerPlayer?.['Fantasy Points Per Game']).int ?? 0,
    //       //   targetShare: toInt(profilerPlayer?.['Target Share']).int ?? 0, // WR
    //       //   rzTargetShare: toInt(profilerPlayer?.['Red Zone Target Share']).int ?? 0,
    //       //   dominatorRating: toInt(profilerPlayer?.['Dominator Rating']).int ?? 0,
    //       //   aDOT: toInt(profilerPlayer?.['Average Target Distance']).int ?? 0,
    //       //   avgTargetDist: toInt(profilerPlayer?.['Average Target Distance']).int ?? 0,
    //       //   catchableTargetRate: toInt(profilerPlayer?.['Catchable Target Rate']).int ?? 0,
    //       //   gameScript: toInt(profilerPlayer?.['Game Script']).int ?? 0,
    //       //   goalLineCarriesGame: toInt(profilerPlayer?.['Goal Line Carries Per Game']).int ?? 0,
    //       //   rzOppShare: toInt(profilerPlayer?.['Red Zone Opportunity Share']).int ?? 0,
    //       //   epa: toInt(profilerPlayer?.['Expected Points Added']).int ?? 0,
    //       //   epaPass: toInt(profilerPlayer?.['Pass EPA']).int ?? 0,
    //       //   epaRun: toInt(profilerPlayer?.['Run EPA']).int ?? 0,
    //       //   productionPrem: toInt(profilerPlayer?.['Production Premium']).int ?? 0,
    //       //   productionPremRank: toInt(profilerPlayer?.['Production Premium Rank']).int ?? 0,
    //       // },
    //       // playerProjection: {
    //       //   targets: toInt(gridIronPlayer?.TAR).int ?? 0,
    //       //   fpts: toInt(gridIronPlayer?.FPTS).int ?? 0,
    //       //   fptsVal: toInt(getNestedValue(gridIronPlayer, ['FPTS/$'])).int ?? 0,
    //       //   ceil: toInt(gridIronPlayer?.CEIL).int ?? 0,
    //       //   floor: toInt(gridIronPlayer?.FLOOR).int ?? 0,
    //       //   slateOwnership: null,
    //       //   expertRating: getNestedValue(slatePlayer, ['ecr', [dfsSiteToDfsSiteTypeMap[site]], 'rank']),
    //       // },
    //     };
    //   })

    //   .filter(p => p.salary !== 0)
    //   .sort((a, b) => b.salary - a.salary);
  }
}
