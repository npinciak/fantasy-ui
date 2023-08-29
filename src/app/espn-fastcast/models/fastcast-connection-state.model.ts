import { FASTCAST_EVENT_TYPE } from '@sports-ui/ui-sdk/espn-fastcast-client';

export interface EspnFastcastConnectionStateModel {
  disconnect: number | null;
  connect: number | null;
  lastRefresh: number | null;
  pause: boolean;
  eventType: string | null;
  league: string | null;
  date: string | null;
  connectionClosed: boolean;
}

export const INITIAL_STATE: EspnFastcastConnectionStateModel = {
  disconnect: null,
  connect: null,
  lastRefresh: null,
  eventType: FASTCAST_EVENT_TYPE.TopEvents,
  league: '90',
  connectionClosed: true,
  pause: true,
  date: null,
};
