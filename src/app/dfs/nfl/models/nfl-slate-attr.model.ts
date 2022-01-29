import { SlateAttrTeam } from '@app/dfs/models/team.model';
import { OutsidersEntity, SafptsEntity } from './nfl-client.model';

export type ScheduleAdjFptsProps = SafptsEntity;
export type OutsidersProps = OutsidersEntity;

export type NFLSlateAttrTeam = SlateAttrTeam & {
  safpts: ScheduleAdjFptsProps;
  outsiders: OutsidersProps;
};
