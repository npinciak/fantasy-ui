import { ImageBuilder } from '@app/espn/const/image-builder';
import { PRO_LEAGUE_ABBREV_BY_PRO_LEAGUE_TYPE, ProLeagueType, SPORT_TYPE } from '@sports-ui/ui-sdk';

const config = {
  sport: SPORT_TYPE.Football,
  league: PRO_LEAGUE_ABBREV_BY_PRO_LEAGUE_TYPE[ProLeagueType.NFL].toLowerCase(),
};

export class FantasyFootballImageBuilder extends ImageBuilder(config) {}
