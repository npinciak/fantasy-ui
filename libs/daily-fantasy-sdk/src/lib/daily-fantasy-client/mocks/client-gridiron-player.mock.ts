import { NFLClientGridIronPlayer } from '../../models/nfl-client.model';
import { MOCK_SCHEDULE_AWAY_TEAM } from './schedule-team.mock';
import { MOCK_CLIENT_SCHEDULE } from './schedule.mock';
import { MOCK_DFS_SLATE_PLAYER } from './slate-player.mock';

export const MOCK_CLIENT_GRIDIRON_PLAYER: NFLClientGridIronPlayer = {
  PLAYERID: '3491929',
  PLAYER: `${MOCK_DFS_SLATE_PLAYER.player.first_name} ${MOCK_DFS_SLATE_PLAYER.player.last_name}`,
  SALARY: MOCK_DFS_SLATE_PLAYER.schedule.salaries![0].salary.toString(),
  OPP: 'TEN',
  POS: MOCK_DFS_SLATE_PLAYER.player.position,
  TEAM: MOCK_SCHEDULE_AWAY_TEAM.hashtag,
  SCHEDULE_ID: MOCK_CLIENT_SCHEDULE.id,
  INJURY: 'tbd',
  PAATT: '32.44',
  CMP: '19.82',
  PAYDS: '222.89',
  PATD: '1.05',
  INT: '0.41',
  RUATT: '3.25',
  RUYDS: '13.65',
  RUTD: '0.14',
  TAR: '12',
  REC: '9',
  REYDS: '120',
  RETD: '2',
  PP: '14.29',
  UD: '14.29',
  TOTYD: '236.54',
  TOTTD: '1.19',
  PARUYD: '236.54',
  PARUTD: '1.19',
  RUREYD: '13.65',
  RURETD: '0.14',
  SLATE: 'MAIN',
  REFID: '1',
  FPTS: '23.9',
  'FPTS/$': '2.92',
  FLOOR: '9.07',
  CEIL: '22.34',
  SMASH: '3.05',
  VALUE: '41.95',
  POWN: '12',
  PARTNERID: MOCK_DFS_SLATE_PLAYER.player.id,
  OWNERSHIP: {
    '93936': '12',
  },
  RGID: MOCK_DFS_SLATE_PLAYER.player.rg_id,
  SDFLOOR: '13.8',
  SDCEIL: '38.3',
  SDFPTS: '26.1',
};

export const MOCK_CLIENT_GRIDIRON_PLAYER_NULL: NFLClientGridIronPlayer = {
  PLAYERID: null,
  PLAYER: null,
  SALARY: null,
  OPP: null,
  POS: null,
  TEAM: null,
  SCHEDULE_ID: null,
  INJURY: null,
  PAATT: null,
  CMP: null,
  PAYDS: null,
  PATD: null,
  INT: null,
  RUATT: null,
  RUYDS: null,
  RUTD: null,
  TAR: null,
  REC: null,
  REYDS: null,
  RETD: null,
  PP: null,
  UD: null,
  TOTYD: null,
  TOTTD: null,
  PARUYD: null,
  PARUTD: null,
  RUREYD: null,
  RURETD: null,
  SLATE: null,
  REFID: null,
  FPTS: null,
  'FPTS/$': null,
  FLOOR: null,
  CEIL: null,
  SMASH: null,
  VALUE: null,
  POWN: null,
  PARTNERID: null,
  OWNERSHIP: {},
  RGID: null,
};
