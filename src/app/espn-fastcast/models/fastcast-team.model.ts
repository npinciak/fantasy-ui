import { TeamEntity } from '@app/@shared/base-models/base-team.model';
import { EspnFastcastClient } from 'sports-ui-sdk';

type FastcastEventTeamAttr = 'score' | 'color' | 'altColor';

type FastcastEventTeamPropsStringNullable = { [key in FastcastEventTeamAttr]: string | null };
type FastcastEventTeamProperties = FastcastEventTeamPropsStringNullable & {
  eventUid: string;
  isWinner: boolean;
  isHome: string;
  winPct: number | null;
  record: string | null;
};

export type FastcastEventTeam = TeamEntity & Pick<EspnFastcastClient.CompetitorsEntity, 'uid' | 'rank'> & FastcastEventTeamProperties;
export type FastcastEventTeamMap = Record<string, FastcastEventTeam>;
