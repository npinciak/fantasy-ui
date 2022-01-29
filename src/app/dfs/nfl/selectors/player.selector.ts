import { toInt } from '@app/@shared/helpers/toInt';
import { dfsSiteToDfsSiteTypeMap } from '@app/dfs/dfs.const';
import { Selector } from '@ngxs/store';
import { camelCase } from 'lodash';
import { Player } from '../../models/player.model';
import {
  NFLClientGridIronPlayer,
  NFLClientGridIronPlayerMap,
  NFLClientPlayerAttributes,
  PlayerOwnershipByDfsSiteTypeBySlate,
} from '../models/nfl-client.model';
import { NflDfsPlayerGridIronState } from '../state/nfl-dfs-player-gridiron.state';
import { NflDfsProfilerState, ProfilerInfoMap } from '../state/nfl-dfs-profiler.state';

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
  static transformSlateOwnership = (slate: string, site: string, data: PlayerOwnershipByDfsSiteTypeBySlate): number | null => {
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

  @Selector([])
  static getSlate(slate: number): number {
    return slate;
  }

  @Selector([])
  static getSite(site: string): string {
    return site;
  }

  @Selector([])
  static getPlayerList(players: { [id: number]: Player }): Player[] {
    return Object.values(players);
  }

  @Selector([])
  static getSlatePlayerList(players: { [id: number]: NFLClientPlayerAttributes }): NFLClientPlayerAttributes[] {
    return Object.values(players);
  }

  @Selector([])
  static getSlatePlayerById(players: { [id: number]: NFLClientPlayerAttributes }): (id: string) => NFLClientPlayerAttributes[] {
    return (id: string) => players[id];
  }

  @Selector([])
  static getPlayerById(players: { [id: string]: Player }): (id: string) => Player {
    return (id: string) => players[id];
  }

  @Selector([NflDfsProfilerState.season])
  static getPlayerProfilerSeasonById(players: { [id: string]: any }): (id: string) => ProfilerInfoMap {
    return (id: string) => players[id];
  }

  @Selector([NflDfsPlayerGridIronState.getGridIronPlayerMap])
  static getGridIronPlayerById(players: NFLClientGridIronPlayerMap): (id: string) => NFLClientGridIronPlayer {
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
}
