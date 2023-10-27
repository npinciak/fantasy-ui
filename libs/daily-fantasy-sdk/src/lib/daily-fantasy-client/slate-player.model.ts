import { BattingAttributes } from '../models/mlb-client.model';
import { Schedule } from './schedule.model';

export interface DfsSlatePlayer {
  attributes?: BattingAttributes;
  fpts: number;
  player: SlatePlayerEntity;
  schedule: Schedule;
  stat_group: string;
  status: null;
}

type SlatePlayerAttributes = 'id' | 'rg_id' | 'first_name' | 'last_name' | 'position' | 'sport_id' | 'team_id';
export type SlatePlayerEntity = { [attr in SlatePlayerAttributes]: string } & {
  rg_team_id: string | null;
  xml_id: string | null;
};
