import { EspnClient } from '@sports-ui/ui-sdk/espn';

type CompetitorsProps = Pick<EspnClient.Competitor, 'id' | 'abbreviation' | 'homeAway'>;

export type BaseballEvent = Pick<EspnClient.EventEntity, 'id' | 'uid'> & {
  competitors: Record<string, CompetitorsProps>;
};
