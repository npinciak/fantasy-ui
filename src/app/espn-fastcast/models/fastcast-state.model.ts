import { FastcastEventType } from '@app/espn-fastcast/models/espn-fastcast-socket.model';

export interface EspnFastcastStateModel {
  disconnect: number | null;
  connect: number | null;
  lastRefresh: number | null;
  pause: boolean;
  eventType: string | null;
  league: string | null;
  connectionClosed: boolean;
}

export const INITIAL_STATE: EspnFastcastStateModel = {
  disconnect: null,
  connect: null,
  lastRefresh: null,
  eventType: FastcastEventType.TopEvents,
  league: null,
  connectionClosed: true,
  pause: true,
};
