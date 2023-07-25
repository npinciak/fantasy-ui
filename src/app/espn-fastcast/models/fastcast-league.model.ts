import { LeagueEntity } from '@app/@shared/base-models/base-league.model';
import { LeaguesEntity } from '@sports-ui/ui-sdk/espn-fastcast-client';

type FastcastLeagueAttributes = Pick<LeaguesEntity, 'uid' | 'shortName' | 'isTournament' | 'slug'> & { sport?: string };

export type FastcastLeague = LeagueEntity & FastcastLeagueAttributes;
export type FastcastLeagueMap = Record<string, FastcastLeague>;
