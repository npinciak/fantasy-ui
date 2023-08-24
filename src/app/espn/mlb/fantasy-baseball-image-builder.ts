import { PRO_LEAGUE_ABBREV_BY_PRO_LEAGUE_TYPE, ProLeagueType, SPORT_TYPE } from '@sports-ui/ui-sdk';
import { ImageBuilder } from '../const/image-builder';

const config = {
  sport: SPORT_TYPE.Baseball,
  league: PRO_LEAGUE_ABBREV_BY_PRO_LEAGUE_TYPE[ProLeagueType.MLB].toLowerCase(),
};

export class FantasyBaseballImageBuilder extends ImageBuilder(config) {}
