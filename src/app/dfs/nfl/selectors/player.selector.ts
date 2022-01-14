import { toInt } from '@app/@shared/helpers/toInt';
import { getNestedValue } from '@app/@shared/helpers/utils';
import { dfsSiteToDfsSiteTypeMap } from '@app/dfs/dfs.const';
import { Team } from '@app/dfs/models/team.model';
import { NflDfsState } from '@app/dfs/nfl/state/nfl-dfs.state';
import { DailyFantasyPlayersSelectors } from '@app/dfs/selectors/daily-fantasy-players.selectors';
import { DailyFantasyTeamsSelectors } from '@app/dfs/selectors/daily-fantasy-team.selectors';
import { Selector } from '@ngxs/store';
import { camelCase } from 'lodash';
import { Player } from '../../models/player.model';
import { GridIronPlayer } from '../models/nfl-gridiron.model';
import { PlayerTableRow } from '../models/nfl-player-table-row.model';
import { NFLClientPlayerAttributes, NFLClientSlateOwnershipBySite, NFLClientTeamAttributes } from '../models/nfl-slate-attr.model';
import { NflDfsProfilerState } from '../state/nfl-dfs-profiler.state';
import { NFLScheduleSelectors } from './schedule.selector';
import { NFLTeamSelectors } from './team.selector';

interface TeamAwayOrTeamHome {
  hashtag: string;
  id: string;
  rgId: string;
  name: string;
  isHome?: boolean;
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
function _opponentMap(val: Player): TeamAwayOrTeamHome | null {
  if (!val) {
    return null;
  }

  // if (val.rgTeamId === val.team_home.rgId) {
  //   return {
  //     ...val,
  //     isHome: false,
  //   };
  // } else {
  //   return { ...val.schedule.team_home, isHome: true };
  // }
}

export class NFLPlayerSelectors {
  static transformSlateOwnership = (slate: string, site: string, data: NFLClientSlateOwnershipBySite): number | null => {
    if (data === undefined) {
      return 0;
    }

    if (data[dfsSiteToDfsSiteTypeMap[site]] === undefined) {
      return 0;
    }

    if (data[dfsSiteToDfsSiteTypeMap[site]][slate] === undefined || data[dfsSiteToDfsSiteTypeMap[site]][slate] == null) {
      return 0;
    }

    return null; //parseInt(data[dfsSiteToDfsSiteTypeMap[site]][slate].replace('%', ''));
  };

  static transformScheduleAdjusted = (val: { [id: string]: string }) => {
    const transformed = {};
    for (const key in val) {
      if (Object.prototype.hasOwnProperty.call(val, key)) {
        transformed[camelCase('allowedTo' + key)] = toInt(val[key]).int ?? 0;
      }
    }
    return transformed;
  };

  @Selector([NflDfsState.slate])
  static getSlate(slate: number): number {
    return slate;
  }

  @Selector([NflDfsState.site])
  static getSite(site: string): string {
    return site;
  }

  @Selector([DailyFantasyPlayersSelectors.selectPlayerList])
  static getPlayerList(players: { [id: number]: Player }): Player[] {
    return Object.values(players);
  }

  @Selector([NflDfsState.slatePlayers])
  static getSlatePlayerList(players: { [id: number]: NFLClientPlayerAttributes }): NFLClientPlayerAttributes[] {
    return Object.values(players);
  }

  @Selector([NflDfsState.slatePlayers])
  static getSlatePlayerById(players: { [id: number]: NFLClientPlayerAttributes }): (id: string) => NFLClientPlayerAttributes[] {
    return (id: string) => players[id];
  }

  @Selector([NflDfsState.masterPlayers])
  static getPlayerById(players: { [id: string]: Player }): (id: string) => Player {
    return (id: string) => players[id];
  }

  @Selector([NflDfsProfilerState.season])
  static getPlayerProfilerSeasonById(players: { [id: string]: any }): (id: string) => any {
    return (id: string) => players[id];
  }

  @Selector([NflDfsState.gridIronPlayers])
  static getGridIronPlayerById(players: { [id: string]: GridIronPlayer }): (id: string) => GridIronPlayer {
    return (id: string) => players[id];
  }

  @Selector([NFLPlayerSelectors.getPlayerList])
  static playersEmpty(players: Player[]): boolean {
    return players.length === 0;
  }

  @Selector([NFLPlayerSelectors.getSlatePlayerList])
  static selectTeamsInSlate(players: NFLClientPlayerAttributes[]): string[] {
    const set = new Set<string>();
    players.map(player => {
      if (player.team) {
        set.add(player.team);
      }
    });
    return Array.from(set).sort();
  }

  @Selector([NFLPlayerSelectors.getSlatePlayerList])
  static selectStatGroups(players: NFLClientPlayerAttributes[]): string[] {
    const set = new Set<string>();
    players.map(player => {
      if (player.stat_group) {
        set.add(player.stat_group);
      }
    });
    return Array.from(set).sort();
  }

  @Selector([NFLPlayerSelectors.getPlayerList])
  static selectPositions(players: Player[]): string[] {
    const set = new Set<string>();
    players.map(val => {
      if (val.position) {
        set.add(val.position);
      }
    });
    return Array.from(set);
  }

  @Selector([
    NFLPlayerSelectors.getSlate,
    NFLPlayerSelectors.getSite,
    NFLPlayerSelectors.getPlayerList,
    NFLPlayerSelectors.getSlatePlayerById,
    NFLPlayerSelectors.getPlayerProfilerSeasonById,
    NFLPlayerSelectors.getGridIronPlayerById,
    NFLScheduleSelectors.getTeamAttrById,
    DailyFantasyTeamsSelectors.selectTeamById,
    NFLTeamSelectors.getTeamByRgId,
  ])
  static playerTableRows(
    slate: string,
    site: string,
    masterPlayerList: Player[],
    getSlatePlayerById: (id: string) => NFLClientPlayerAttributes,
    getPlayerProfilerSeasonById: (id: string) => any,
    getGridIronPlayerById: (id: string) => GridIronPlayer,
    getTeamAttrById: (id: string) => NFLClientTeamAttributes,
    selectTeamById: (id: string) => Team,
    getTeamByRgId: (id: string) => TeamAwayOrTeamHome
  ): PlayerTableRow[] {
    return masterPlayerList
      .map(p => {
        const team = selectTeamById(p.teamId).name;

        const playerRgId = p.rgId;

        const slatePlayer = getSlatePlayerById(playerRgId);
        const gridIronPlayer = getGridIronPlayerById(playerRgId);
        const opponent: TeamAwayOrTeamHome = _opponentMap(p) ?? null;
        const profilerPlayer = getPlayerProfilerSeasonById(playerRgId);

        const teamInfo = getTeamAttrById(p.rgTeamId);
        const opponentInfo = getTeamAttrById(opponent.rgId);

        return {
          siteId: null,
          rgId: playerRgId,
          name: p.name,
          position: p.position,
          team,
          isHome: !opponent.isHome,
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
            slateOwnership: NFLPlayerSelectors.transformSlateOwnership(slate, site, slatePlayer?.slate_ownership) ?? 0,
            expertRating: getNestedValue(slatePlayer, ['ecr', [dfsSiteToDfsSiteTypeMap[site]], 'rank']),
          },
          opponent: {
            info: opponent,
            passDef: toInt(teamInfo?.outsiders?.['Opp PaDef']).int ?? 0,
            passDefRk: toInt(teamInfo?.outsiders?.['Opp PaDef Rk']).int ?? 0,
            fptsAllowedRk: { ...NFLPlayerSelectors.transformScheduleAdjusted(opponentInfo?.safpts) },
          },
          profilerPlayer,
          opponentInfo,
          slatePlayer,
          gridIronPlayer,
          p,
        };
      })
      .filter(p => p.salary !== 0)
      .sort((a, b) => b.salary - a.salary);
  }
}
