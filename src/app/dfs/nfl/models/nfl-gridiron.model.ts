export interface GridIronPlayer {
  PLAYERID: string;
  PLAYER: string;
  SALARY?: string | null;
  OPP?: string | null;
  POS?: string | null;
  TEAM?: string | null;
  SCHEDULE_ID?: string | null;
  ATT: string;
  CMP: string;
  PAYDS: string;
  PATD: string;
  INT: string;
  RUATT: string;
  RUYDS: string;
  TAR: string;
  REC: string;
  REYDS: string;
  'RUYDS+RECYDS': string;
  TD: string;
  PARTNERID: string;
  FPTS: string;
  'FPTS/$': number;
  CEIL: string;
  FLOOR: string;
}
