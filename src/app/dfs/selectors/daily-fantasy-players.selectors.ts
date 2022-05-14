import { unique } from '@app/@shared/helpers/unique-by';
import { exists } from '@app/@shared/helpers/utils';
import { Selector } from '@ngxs/store';
import { ClientSalaryDiff } from '../models/daily-fantasy-client-slate-attr.model';
import { PlayerSlateAttr } from '../models/player-slate-attr.model';
import { Player, PlayerMap } from '../models/player.model';
import { Schedule } from '../models/schedule.model';
import { Team } from '../models/team.model';
import { GridIronPlayer } from '../nfl/models/nfl-gridIron.model';
import { PlayerProfiler } from '../nfl/models/nfl-profiler.model';
import { NFLDfsPlayerSelectors } from '../nfl/selectors/nfl-dfs-player.selector';
import { SlateTeam } from '../service/slate.service';
import { DailyFantasyPlayersState } from '../state/daily-fantasy-players.state';
import { DailyFantasySlateAttrState } from '../state/daily-fantasy-slate-attr.state';
import { DailyFantasySlateState } from '../state/daily-fantasy-slate.state';
import { DailyFantasyScheduleSelectors } from './daily-fantasy-schedule.selectors';
import { DailyFantasySlateAttrSelectors } from './daily-fantasy-slate-attr.selectors';
import { DailyFantasyTeamsSelectors } from './daily-fantasy-team.selectors';

export class DailyFantasyPlayersSelectors {
  @Selector([DailyFantasyPlayersState.getMap])
  static selectPlayerById(map: PlayerMap): (id: string) => Player {
    return (id: string) => map[id];
  }

  @Selector([DailyFantasyPlayersState.getMap, DailyFantasyTeamsSelectors.selectTeamById])
  static selectPlayerList(map: PlayerMap, selectTeamById: (id: string) => Team): Player[] {
    return Object.values(map)
      .filter(p => p.rgTeamId)
      .map(p => ({
        ...p,
        team: exists(p.rgTeamId) ? selectTeamById(p.rgTeamId).shortName : '',
      }));
  }

  @Selector([DailyFantasyPlayersSelectors.selectPlayerList])
  static selectPositionsList(players: Player[]): string[] {
    const positions = players.map(p => (exists(p.position) ? p.position : ''));
    return unique(positions);
  }

  @Selector([DailyFantasyPlayersSelectors.selectPlayerList])
  static selectTeamList(players: Player[]): string[] {
    const teams = players.map(p => (exists(p.team) ? p.team : ''));
    return unique(teams);
  }

  @Selector([
    DailyFantasySlateState.site,
    DailyFantasySlateAttrState.slate,
    DailyFantasyPlayersSelectors.selectPlayerList,
    DailyFantasySlateAttrSelectors.selectTeamById,
    DailyFantasyTeamsSelectors.selectTeamById,
    DailyFantasySlateAttrSelectors.selectPlayerById,
    DailyFantasyScheduleSelectors.selectGameById,
    NFLDfsPlayerSelectors.getPlayerProfilerSeasonById,
    NFLDfsPlayerSelectors.getGridIronPlayerById,
  ])
  static selectNflPlayerTableRows(
    site: string,
    slate: string,
    playerList: Player[],
    selectTeamSlateAttrById: (id: string) => SlateTeam,
    selectTeamById: (id: string) => Team,
    selectPlayerById: (id: string) => any,
    selectGameById: (id: string) => Schedule,
    getPlayerProfilerSeasonById: (id: string) => PlayerProfiler,
    getGridIronPlayerById: (id: string) => GridIronPlayer
  ): unknown[] {
    return [];
    // playerList
    //   .map(p => {
    //     const playerRgId = p.rgId;

    //     const teamSlateAttr = selectTeamSlateAttrById(p.rgTeamId);

    //     const slatePlayer = selectPlayerById(p.id);
    //     const gridIronPlayer = getGridIronPlayerById(p.rgId) ?? null;
    //     const profilerPlayer = getPlayerProfilerSeasonById(p.rgId) ?? null;

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
    //       salary: gridIronPlayer?.salary ?? 0,
    //       advancedProfiler: { ...profilerPlayer },
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
    //       gridIron: { ...gridIronPlayer },
    //       // playerProjection: {
    //       //   targets: toInt(gridIronPlayer?.TAR).int ?? 0,
    //       //   fpts: toInt(gridIronPlayer?.FPTS).int ?? 0,
    //       //   fptsVal: toInt(getNestedValue(gridIronPlayer, ['FPTS/$'])).int ?? 0,
    //       //   ceil: toInt(gridIronPlayer?.CEIL).int ?? 0,
    //       //   floor: toInt(gridIronPlayer?.FLOOR).int ?? 0,
    //       //   slateOwnership: null,
    //       //   expertRating: getNestedValue(slatePlayer, ['ecr', [dfsSiteToDfsSiteTypeMap[site]], 'rank']),
    //       // },
    //       opponent: {
    //         info: null,
    //         passDef: toInt(teamSlateAttr?.outsiders.oppPaDef).int ?? 0,
    //         passDefRk: toInt(teamSlateAttr?.outsiders?.oppPaDefRk).int ?? 0,
    //         fptsAllowedRk: null, //{ ...NFLPlayerSelectors.transformScheduleAdjusted(opponentInfo?.safpts) },
    //       },
    //     };
    //   })
    //   .filter(p => p.salary !== 0)
    //   .sort((a, b) => b.salary - a.salary);
  }

  @Selector([
    DailyFantasyPlayersSelectors.selectPlayerList,
    DailyFantasyScheduleSelectors.selectGameById,
    DailyFantasySlateAttrSelectors.selectPlayerById,
  ])
  static selectNbaPlayerTableRows(
    playerList: Player[],
    selectGameById: (id: string) => Schedule,
    selectPlayerById: (id: string) => PlayerSlateAttr
  ): NbaPlayerTableRow[] {
    return [];
    //  playerList.map(p => {
    //   const game = selectGameById(p.gameId);

    //   const playerSlateAttr = selectPlayerById(p.rgId);

    //   return {
    //     name: p.name,
    //     position: p.position,
    //     siteId: null,
    //     rgId: p.rgId,
    //     team: p.team,
    //     opp: p.rgTeamId === game?.homeTeam?.rgId ? game?.awayTeam.shortName : game?.homeTeam.shortName,
    //     isHome: p.rgTeamId === game?.homeTeam?.rgId ?? false,
    //     salaryDiff: playerSlateAttr?.salaryDiff,
    //     slateOwn: playerSlateAttr?.slateOwn,
    //     ownership: playerSlateAttr?.ownership,
    //     value: playerSlateAttr?.value,
    //     smash: playerSlateAttr?.smash,
    //   };
    // });
  }

  @Selector([DailyFantasyPlayersSelectors.selectPlayerList])
  static selectPlayersEmpty(playerList: Player[]): boolean {
    return playerList.length === 0;
  }
}

type NbaPlayerTableRow = {
  name: string;
  position: string;
  siteId: number | null;
  rgId: string;
  team: string;
  opp: string;
  isHome: boolean;
  salaryDiff: ClientSalaryDiff;
  slateOwn: Record<number, string>;
  ownership: number;
  value: number;
  smash: number;
};
