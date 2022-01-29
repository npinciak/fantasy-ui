import { pickAxisData, scatterData } from '@app/@shared/helpers/graph.helpers';
import { toInt } from '@app/@shared/helpers/toInt';
import { getNestedValue } from '@app/@shared/helpers/utils';
import { Selector } from '@ngxs/store';
import { ChartData } from 'chart.js';
import { dfsSiteToDfsSiteTypeMap } from '../dfs.const';
import { Player, PlayerMap } from '../models/player.model';
import { Schedule } from '../models/schedule.model';
import { Team } from '../models/team.model';
import { NFLClientGridIronPlayer } from '../nfl/models/nfl-client.model';
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
        team: selectTeamById(p.rgTeamId).shortName,
      }));
  }

  @Selector([DailyFantasyPlayersSelectors.selectPlayerList])
  static selectPositionsList(players: Player[]): string[] {
    const set = new Set<string>();
    players.map(val => {
      if (val.position) {
        set.add(val.position);
      }
    });
    return Array.from(set);
  }

  @Selector([DailyFantasyPlayersSelectors.selectPlayerList])
  static selectTeamList(players: Player[]): string[] {
    const set = new Set<string>();
    players.map(val => {
      if (val.team) {
        set.add(val.team);
      }
    });
    return Array.from(set);
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
  static selectPlayerTableRows(
    site: string,
    slate: string,
    playerList: Player[],
    selectTeamSlateAttrById: (id: string) => SlateTeam,
    selectTeamById: (id: string) => Team,
    selectPlayerById: (id: string) => any,
    selectGameById: (id: string) => Schedule,
    getPlayerProfilerSeasonById: (id: string) => any,
    getGridIronPlayerById: (id: string) => NFLClientGridIronPlayer
  ) {
    return playerList
      .map(p => {
        const playerRgId = p.rgId;

        const teamSlateAttr = selectTeamSlateAttrById(p.rgTeamId);

        const slatePlayer = selectPlayerById(p.id);
        const gridIronPlayer = getGridIronPlayerById(p.rgId) ?? null;
        const profilerPlayer = getPlayerProfilerSeasonById(p.rgId) ?? null;

        const game = selectGameById(p.gameId);

        return {
          name: p.name,
          position: p.position,
          siteId: null,
          rgId: p.rgId,
          team: p.team,
          opp: p.rgTeamId === game?.homeTeam?.rgId ? game?.awayTeam.shortName : game?.homeTeam.shortName,
          isHome: p.rgTeamId === game?.homeTeam?.rgId ?? false,
          statGroup: slatePlayer?.stat_group ?? '',
          salary: toInt(gridIronPlayer?.SALARY).int ?? 0,
          playerAdvanced: {
            fptsPerGame: toInt(profilerPlayer?.['Fantasy Points Per Game']).int ?? 0,
            targetShare: toInt(profilerPlayer?.['Target Share']).int ?? 0, // WR
            rzTargetShare: toInt(profilerPlayer?.['Red Zone Target Share']).int ?? 0,
            dominatorRating: toInt(profilerPlayer?.['Dominator Rating']).int ?? 0,
            aDOT: toInt(profilerPlayer?.['Average Target Distance']).int ?? 0,
            avgTargetDist: toInt(profilerPlayer?.['Average Target Distance']).int ?? 0,
            catchableTargetRate: toInt(profilerPlayer?.['Catchable Target Rate']).int ?? 0,
            gameScript: toInt(profilerPlayer?.['Game Script']).int ?? 0,
            goalLineCarriesGame: toInt(profilerPlayer?.['Goal Line Carries Per Game']).int ?? 0,
            rzOppShare: toInt(profilerPlayer?.['Red Zone Opportunity Share']).int ?? 0,
            epa: toInt(profilerPlayer?.['Expected Points Added']).int ?? 0,
            epaPass: toInt(profilerPlayer?.['Pass EPA']).int ?? 0,
            epaRun: toInt(profilerPlayer?.['Run EPA']).int ?? 0,
            productionPrem: toInt(profilerPlayer?.['Production Premium']).int ?? 0,
            productionPremRank: toInt(profilerPlayer?.['Production Premium Rank']).int ?? 0,
          },
          playerProjection: {
            targets: toInt(gridIronPlayer?.TAR).int ?? 0,
            fpts: toInt(gridIronPlayer?.FPTS).int ?? 0,
            fptsVal: toInt(getNestedValue(gridIronPlayer, ['FPTS/$'])).int ?? 0,
            ceil: toInt(gridIronPlayer?.CEIL).int ?? 0,
            floor: toInt(gridIronPlayer?.FLOOR).int ?? 0,
            slateOwnership: null,
            expertRating: getNestedValue(slatePlayer, ['ecr', [dfsSiteToDfsSiteTypeMap[site]], 'rank']),
          },
          opponent: {
            info: null,
            passDef: toInt(teamSlateAttr?.outsiders?.['Opp PaDef']).int ?? 0,
            passDefRk: toInt(teamSlateAttr?.outsiders?.['Opp PaDef Rk']).int ?? 0,
            fptsAllowedRk: null, //{ ...NFLPlayerSelectors.transformScheduleAdjusted(opponentInfo?.safpts) },
          },
        };
      })
      .filter(p => p.salary !== 0)
      .sort((a, b) => b.salary - a.salary);
  }

  @Selector([DailyFantasyPlayersSelectors.selectPlayerList])
  static selectPlayersEmpty(playerList: Player[]): boolean {
    return playerList.length === 0;
  }

  @Selector([])
  static scatterChartData(teamList: Player[], labels: string[]): ChartData<'scatter'> {
    const xaxis = pickAxisData(teamList, obj => obj.id);
    const yaxis = pickAxisData(teamList, obj => obj.teamId);

    const data = scatterData(xaxis, yaxis);

    return {
      labels,
      datasets: [
        {
          data: data,
          label: 'Series A',
          pointRadius: 5,
          borderColor: '#F37723',
          backgroundColor: '#F37723',
          pointBackgroundColor: '#F37723',
          pointBorderColor: '#F37723',
        },
      ],
    };
  }
}

// @Selector([
//   NFLPlayerSelectors.getSlate,
//   NFLPlayerSelectors.getSite,
//   NFLPlayerSelectors.getPlayerList,
//   NFLPlayerSelectors.getSlatePlayerById,
//   NFLPlayerSelectors.getPlayerProfilerSeasonById,
//   NFLPlayerSelectors.getGridIronPlayerById,
//   NFLScheduleSelectors.getTeamAttrById,
//   DailyFantasyTeamsSelectors.selectTeamById,
//   NFLTeamSelectors.getTeamByRgId,
// ])
// static playerTableRows(
//   slate: string,
//   site: string,
//   masterPlayerList: Player[],
//   getSlatePlayerById: (id: string) => NFLClientPlayerAttributes,
//   getPlayerProfilerSeasonById: (id: string) => any,
//   getGridIronPlayerById: (id: string) => NFLClientGridIronPlayer,
//   getTeamAttrById: (id: string) => NFLClientSlateAttrTeam,
//   selectTeamById: (id: string) => Team,
//   getTeamByRgId: (id: string) => TeamAwayOrTeamHome
// ): any[] {
//   return masterPlayerList
//     .map(p => {
//       const team = selectTeamById(p.teamId).name;

//       const playerRgId = p.rgId;

//       const slatePlayer = getSlatePlayerById(playerRgId);
//       const gridIronPlayer = getGridIronPlayerById(playerRgId);
//       const opponent: TeamAwayOrTeamHome = _opponentMap(p) ?? null;
//       const profilerPlayer = getPlayerProfilerSeasonById(playerRgId);

//       const teamInfo = getTeamAttrById(p.rgTeamId);
//       const opponentInfo = getTeamAttrById(opponent.rgId);

//       return {
//         siteId: null,
//         rgId: playerRgId,
//         name: p.name,
//         position: p.position,
//         team,
//         isHome: !opponent.isHome,
//         statGroup: slatePlayer?.stat_group ?? '',
//         salary: toInt(gridIronPlayer?.SALARY).int ?? 0,
//         playerAdvanced: {
//           fptsPerGame: toInt(profilerPlayer?.['Fantasy Points Per Game']).int ?? 0,
//           targetShare: toInt(profilerPlayer?.['Target Share']).int ?? 0, // WR
//           rzTargetShare: toInt(profilerPlayer?.['Red Zone Target Share']).int ?? 0,
//           dominatorRating: toInt(profilerPlayer?.['Dominator Rating']).int ?? 0,
//           aDOT: toInt(profilerPlayer?.['Average Target Distance']).int ?? 0,
//           avgTargetDist: toInt(profilerPlayer?.['Average Target Distance']).int ?? 0,
//           catchableTargetRate: toInt(profilerPlayer?.['Catchable Target Rate']).int ?? 0,
//           gameScript: toInt(profilerPlayer?.['Game Script']).int ?? 0,
//           goalLineCarriesGame: toInt(profilerPlayer?.['Goal Line Carries Per Game']).int ?? 0,
//           rzOppShare: toInt(profilerPlayer?.['Red Zone Opportunity Share']).int ?? 0,
//           epa: toInt(profilerPlayer?.['Expected Points Added']).int ?? 0,
//           epaPass: toInt(profilerPlayer?.['Pass EPA']).int ?? 0,
//           epaRun: toInt(profilerPlayer?.['Run EPA']).int ?? 0,
//           productionPrem: toInt(profilerPlayer?.['Production Premium']).int ?? 0,
//           productionPremRank: toInt(profilerPlayer?.['Production Premium Rank']).int ?? 0,
//         },
//         playerProjection: {
//           targets: toInt(gridIronPlayer?.TAR).int ?? 0,
//           fpts: toInt(gridIronPlayer?.FPTS).int ?? 0,
//           fptsVal: toInt(getNestedValue(gridIronPlayer, ['FPTS/$'])).int ?? 0,
//           ceil: toInt(gridIronPlayer?.CEIL).int ?? 0,
//           floor: toInt(gridIronPlayer?.FLOOR).int ?? 0,
//           slateOwnership: NFLPlayerSelectors.transformSlateOwnership(slate, site, slatePlayer?.slate_ownership) ?? 0,
//           expertRating: getNestedValue(slatePlayer, ['ecr', [dfsSiteToDfsSiteTypeMap[site]], 'rank']),
//         },
//         opponent: {
//           info: opponent,
//           passDef: toInt(teamInfo?.outsiders?.['Opp PaDef']).int ?? 0,
//           passDefRk: toInt(teamInfo?.outsiders?.['Opp PaDef Rk']).int ?? 0,
//           fptsAllowedRk: null, //{ ...NFLPlayerSelectors.transformScheduleAdjusted(opponentInfo?.safpts) },
//         },
//         profilerPlayer,
//         opponentInfo,
//         slatePlayer,
//         gridIronPlayer,
//         p,
//       };
//     })
//     .filter(p => p.salary !== 0)
//     .sort((a, b) => b.salary - a.salary);
// }
