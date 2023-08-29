import { FASTCAST_EVENT_TYPE } from './event-type.const';

export type FastcastEventType = typeof FASTCAST_EVENT_TYPE[keyof typeof FASTCAST_EVENT_TYPE];
