import { EventStatusType } from '../../espn-client/models/event-status.model';

export type FullStatus = { type: FullStatusType };
export type FullStatusType = { id: EventStatusType; name: string; state: string; completed: boolean };
