import { LeagueEntity } from '@app/@shared/base-models/base-league.model';
import { EspnFastcastClient } from 'sports-ui-sdk/lib/models/espn-fastcast.model';

type FastcastLeagueAttributes = Pick<EspnFastcastClient.LeaguesEntity, 'uid' | 'shortName' | 'isTournament' | 'slug'> & { sport?: string };

export type FastcastLeague = LeagueEntity & FastcastLeagueAttributes;
export type FastcastLeagueMap = Record<string, FastcastLeague>;
