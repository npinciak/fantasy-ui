import { exists } from '@app/@shared/utilities/utilities.m';
import { DfsSlatePlayer, Schedule as ScheduleImport, ScheduleTeamEntity } from '@dfsClient/daily-fantasy-client.model';
import { NFLClientGridIronPlayer } from '@dfsClient/nfl-client.model';
import { camelCase } from 'lodash';
import { SlatePlayer } from '../models/player.model';
import { Schedule } from '../models/schedule.model';
import { Team } from '../models/team.model';
import { GridIronPlayer } from '../nfl/models/nfl-gridIron.model';

export function normalizeNFLClientGridIronPlayer(gridIronPlayer: NFLClientGridIronPlayer): GridIronPlayer {
  if (!exists(gridIronPlayer.PLAYERID)) throw new Error('gridIronPlayer.PLAYERID must exist');

  const map = {} as GridIronPlayer;

  Object.keys(gridIronPlayer).forEach(k => {
    switch (k) {
      case 'OWNERSHIP':
        map[camelCase(k)] = {};
        break;
      case 'PLAYER':
      case 'TEAM':
      case 'POS':
      case 'OPP':
        map[camelCase(k)] = gridIronPlayer[k];
        break;
      case 'PLAYERID':
        map.playerId = exists(gridIronPlayer.PLAYERID) ? gridIronPlayer.PLAYERID : '';
        break;
      case 'PARTNERID':
        map.partnerId = exists(gridIronPlayer.PARTNERID) ? Number(gridIronPlayer.PARTNERID) : null;
        break;
      case 'FPTS/$':
        map.fptsPerK = exists(gridIronPlayer['FPTS/$']) ? Number(gridIronPlayer['FPTS/$']) : null;
        break;
      default:
        map[camelCase(k)] = exists(gridIronPlayer[k]) ? Number(gridIronPlayer[k]) : null;
        break;
    }
  });

  return map;
}

export function transformDfsClientPlayerToPlayer(dfsClientPlayer: DfsSlatePlayer): SlatePlayer {
  const {
    schedule,
    schedule: { salaries },
    player: { id, position, first_name, last_name, rg_id, team_id, rg_team_id },
  } = dfsClientPlayer;

  const name = last_name.length <= 0 ? first_name : `${first_name} ${last_name}`;

  return {
    id,
    name,
    position,
    salaries,
    rgId: rg_id,
    teamId: team_id,
    rgTeamId: rg_team_id,
    gameId: schedule.id,
  };
}

export function transformDfsClientScheduleToSchedule(dfsClientSchedule: ScheduleImport): Schedule {
  const { id, date, rg_id, team_away, team_home } = dfsClientSchedule;

  const awayTeam = transformScheduleTeamEntityToTeam(team_away);
  const homeTeam = transformScheduleTeamEntityToTeam(team_home);

  return {
    id,
    date,
    rgId: rg_id,
    awayTeam,
    homeTeam,
  };
}

export function transformScheduleTeamEntityToTeam(scheduleTeamEntity: ScheduleTeamEntity): Team {
  const { id, name, rg_id, hashtag } = scheduleTeamEntity;

  return {
    id,
    name,
    rgId: rg_id,
    shortName: hashtag,
  };
}
