import { ImageBuilder } from '@app/espn/const/image-builder';
import { PRO_LEAGUE_ABBREV_BY_PRO_LEAGUE_TYPE, ProLeagueType, SPORT_TYPE } from '@sports-ui/ui-sdk';

const config = {
  sport: SPORT_TYPE.Baseball,
  league: PRO_LEAGUE_ABBREV_BY_PRO_LEAGUE_TYPE[ProLeagueType.MLB].toLowerCase(),
};

export class FantasyBaseballImageBuilder extends ImageBuilder(config) {}
