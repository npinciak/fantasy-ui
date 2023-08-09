import { EventStatus, SeasonType } from '@sports-ui/ui-sdk/espn-client';

export type EventSummaryBySeasonTypeByEventStatus = {
  [key in SeasonType]: {
    [key in EventStatus]: string | null;
  };
};
