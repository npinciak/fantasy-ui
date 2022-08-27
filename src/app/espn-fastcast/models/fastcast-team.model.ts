import { TeamEntity } from '@app/@shared/base-models/base-team.model';
import { RecordEntity } from '@client/espn-client.model';

type FastcastEventTeamProps = 'score' | 'abbreviation' | 'color' | 'altColor';

type FastcastEventTeamPropsStringNullable = { [key in FastcastEventTeamProps]: string | null };
type FastcastEventTeamProperties = FastcastEventTeamPropsStringNullable & {
  uid: string;
  eventUid: string;
  isWinner: boolean;
  isHome: string;
  rank: number | null;
  winPct: number | null;
  record: string | RecordEntity[];
};

export type FastcastEventTeam = FastcastEventTeamProperties & TeamEntity;
export type FastcastEventTeamMap = Record<string, FastcastEventTeam>;
