import { TeamEntity } from '@app/@shared/base-models/base-team.model';
import { ParsedUid } from '@app/espn/espn-helpers';
import { CompetitorsEntity } from '@sports-ui/ui-sdk/espn-fastcast-client';

type FastcastEventTeamAttr = 'score' | 'color' | 'altColor';

type FastcastEventTeamPropsStringNullable = { [key in FastcastEventTeamAttr]: string | null };
type FastcastEventTeamProperties = FastcastEventTeamPropsStringNullable & {
  eventIds: ParsedUid | null;
  isWinner: boolean;
  isHome: string;
  winPct: number | null;
  record: string | null;
};

export type FastcastEventTeam = TeamEntity &
  Pick<CompetitorsEntity, 'uid' | 'rank' | 'seriesRecord' | 'aggregateScore'> &
  FastcastEventTeamProperties;
export type FastcastEventTeamMap = Record<string, FastcastEventTeam>;
