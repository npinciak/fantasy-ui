/* eslint-disable @typescript-eslint/naming-convention */
export interface SlateMaster {
  superdraft: { [id: number]: DfsSlate };
  draftkings: { [id: number]: DfsSlate };
  fanduel: { [id: number]: DfsSlate };
  yahoo: { [id: number]: DfsSlate };
}

export interface DfsSlate {
  date: string;
  importId: string;
  name: string;
  games?: DfsSlateGamesEntity[] | null;
  start: string;
  type: string;
  salaryCap: number;
  slate_path: string;
  source: string;
  default: boolean;
  taggable: boolean;
  hidden: boolean;
}

export interface DfsSlateGamesEntity {
  date: string;
  time: string;
  scheduleId: string;
  rgScheduleId: string | null;
  teamAwayId: string;
  rgTeamAwayId: string | null;
  teamHomeId: string;
  rgTeamHomeId: string | null;
  teamAwayHashtag: string;
  teamHomeHashtag: string;
}

//       date(pin): "2021-10-08 00:20:00"
// time(pin): "8:20PM ET"
// scheduleId(pin): "5746346"
// rgScheduleId(pin): null
// teamAwayId(pin): "343"
// rgTeamAwayId(pin): null
// teamHomeId(pin): "361"
// rgTeamHomeId(pin): null
// teamAwayHashtag(pin): "LAR"
// teamHomeHashtag(pin): "SEA"

export type CoreDfsSlate = Pick<
  DfsSlate,
  'date' | 'importId' | 'name' | 'games' | 'start' | 'type' | 'salaryCap' | 'slate_path' | 'source' | 'default' | 'taggable' | 'hidden'
>;
