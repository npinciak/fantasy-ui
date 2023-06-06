import { EVENT_STATUS, EVENT_STATUS_NAME, EVENT_STATUS_TYPE } from './event-status.const';

export type EventStatus = (typeof EVENT_STATUS)[keyof typeof EVENT_STATUS];
export type EventStatusType = (typeof EVENT_STATUS_TYPE)[keyof typeof EVENT_STATUS_TYPE];
export type EventStatusName = (typeof EVENT_STATUS_NAME)[keyof typeof EVENT_STATUS_NAME];
