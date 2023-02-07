import { FASTCAST_EVENT_TYPE } from '@app/espn-fastcast/models/espn-fastcast-socket.model';

export interface EspnFastcastConnectionStateModel {
  disconnect: number | null;
  connect: number | null;
  lastRefresh: number | null;
  pause: boolean;
  eventType: string | null;
  league: string | null;
  connectionClosed: boolean;
}

export const INITIAL_STATE: EspnFastcastConnectionStateModel = {
  disconnect: null,
  connect: null,
  lastRefresh: null,
  eventType: FASTCAST_EVENT_TYPE.TopEvents,
  league: null,
  connectionClosed: true,
  pause: false,
};
