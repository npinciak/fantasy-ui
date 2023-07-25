import { EventStatusType } from '../../espn-client/espn-client.m';

export type FullStatus = { type: FullStatusType };
export type FullStatusType = { id: EventStatusType; name: string; state: string; completed: boolean };
