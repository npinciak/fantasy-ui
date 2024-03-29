import {
  ClientScheduleTeamEntity,
  ClientSlatePlayer,
  ClientSchedule as ScheduleImport,
} from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';
import { NFLClientGridIronPlayer } from '@sports-ui/daily-fantasy-sdk/models';
import { exists } from '@sports-ui/ui-sdk/helpers';
import { SlatePlayer } from '../models/player.model';
import { Schedule } from '../models/schedule.model';
import { Team } from '../models/team.model';
import { GridIronPlayer } from '../nfl/models/nfl-gridIron.model';

export function normalizeNFLClientGridIronPlayer(gridIronPlayer: NFLClientGridIronPlayer): GridIronPlayer | null {
  if (!exists(gridIronPlayer.PLAYERID)) return null; //throw new Error('gridIronPlayer.PLAYERID must exist');

  const {
    PLAYERID,
    SALARY,
    SCHEDULE_ID,
    PAATT,
    PAYDS,
    CMP,
    PATD,
    INT,
    RUATT,
    RUYDS,
    RUTD,
    TAR,
    REC,
    REYDS,
    RETD,
    FPTS,
    SDFPTS,
    FLOOR,
    SDFLOOR,
    CEIL,
    SDCEIL,
    SMASH,
    VALUE,
    POWN,
    PARTNERID,
    RGID,
  } = gridIronPlayer;

  const map = {} as GridIronPlayer;

  map['opp'] = gridIronPlayer.OPP ?? null;
  map['pos'] = gridIronPlayer.POS ?? null;
  map['team'] = gridIronPlayer.TEAM ?? null;
  map['slate'] = gridIronPlayer.SLATE ?? null;
  map['injury'] = gridIronPlayer.INJURY ?? null;
  map['player'] = gridIronPlayer.PLAYER ?? null;
  map['playerId'] = Number(PLAYERID);
  map['salary'] = SALARY ? Number(SALARY) : null;
  map['scheduleId'] = SCHEDULE_ID ? Number(SCHEDULE_ID) : null;
  map['paatt'] = PAATT ? Number(PAATT) : null;
  map['comp'] = CMP ? Number(CMP) : null;
  map['payds'] = PAYDS ? Number(PAYDS) : null;
  map['patd'] = PATD ? Number(PATD) : null;
  map['int'] = INT ? Number(INT) : null;
  map['ruatt'] = RUATT ? Number(RUATT) : null;
  map['ruyds'] = RUYDS ? Number(RUYDS) : null;
  map['rutd'] = RUTD ? Number(RUTD) : null;
  map['tar'] = TAR ? Number(TAR) : null;
  map['rec'] = REC ? Number(REC) : null;
  map['reyds'] = REYDS ? Number(REYDS) : null;
  map['retd'] = RETD ? Number(RETD) : null;
  map['fpts'] = FPTS ? Number(FPTS) : null;
  map['sdFpts'] = SDFPTS ? Number(SDFPTS) : null;
  map['fptsPerDollar'] = gridIronPlayer['FPTS/$'] ? Number(gridIronPlayer['FPTS/$']) : null;
  map['floor'] = FLOOR ? Number(FLOOR) : null;
  map['sdFloor'] = SDFLOOR ? Number(SDFLOOR) : null;
  map['ceil'] = CEIL ? Number(CEIL) : null;
  map['sdCeil'] = SDCEIL ? Number(SDCEIL) : null;
  map['smash'] = SMASH ? Number(SMASH) : null;
  map['value'] = VALUE ? Number(VALUE) : null;
  map['pown'] = POWN ? Number(POWN) : null;
  map['partnerId'] = PARTNERID ? Number(PARTNERID) : null;
  map['ownership'] = convertObjectValuesToNumbers(gridIronPlayer.OWNERSHIP);
  map['rgid'] = RGID ? Number(RGID) : null;

  return map;
}

export function convertObjectValuesToNumbers(obj: Record<string, string | number>): Record<string, number | null> {
  const result: Record<string, number | null> = {};

  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (typeof value === 'string' && !isNaN(Number(value))) {
        result[key] = Number(value);
      } else {
        result[key] = null;
      }
    }
  }

  return result;
}

export function transformDfsClientPlayerToPlayer(dfsClientPlayer: ClientSlatePlayer): SlatePlayer {
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

export function transformScheduleTeamEntityToTeam(scheduleTeamEntity: ClientScheduleTeamEntity): Team {
  const { id, name, rg_id, hashtag } = scheduleTeamEntity;

  return {
    id,
    name,
    rgId: rg_id,
    shortName: hashtag,
  };
}
