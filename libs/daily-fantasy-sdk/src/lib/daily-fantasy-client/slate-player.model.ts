import { ClientMlbBattingAttributes } from '../daily-fantasy-client-mlb/batting-attributes.model';
import { Schedule } from './schedule.model';

export interface ClientSlatePlayer {
  attributes?: ClientMlbBattingAttributes;
  fpts: number;
  player: ClientSlatePlayerDetails;
  schedule: Schedule;
  stat_group: string;
  status: null;
}

type SlatePlayerAttributes = 'id' | 'rg_id' | 'first_name' | 'last_name' | 'position' | 'sport_id' | 'team_id';
export type ClientSlatePlayerDetails = Record<SlatePlayerAttributes, string> & {
  rg_team_id: string | null;
  xml_id: string | null;
};
