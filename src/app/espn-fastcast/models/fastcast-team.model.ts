import { TeamEntity } from '@app/@shared/base-models/base-team.model';
import { CompetitorsEntity } from '@espnClient/espn-fastcast.model';

type FastcastEventTeamAttr = 'score' | 'color' | 'altColor';

type FastcastEventTeamPropsStringNullable = { [key in FastcastEventTeamAttr]: string | null };
type FastcastEventTeamProperties = FastcastEventTeamPropsStringNullable & {
  eventUid: string;
  isWinner: boolean;
  isHome: string;
  winPct: number | null;
};

export type FastcastEventTeam = TeamEntity & Pick<CompetitorsEntity, 'uid' | 'rank' | 'record'> & FastcastEventTeamProperties;
export type FastcastEventTeamMap = Record<string, FastcastEventTeam>;
