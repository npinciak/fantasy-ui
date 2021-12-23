import { Selector } from '@ngxs/store';

import { EspnFastcastState, LeagueEventList, LeagueMapModel, SportMapModel } from '../state/espn-fastcast.state';

export class EspnFastcastSelectors {
  @Selector([EspnFastcastState.selectSportMap])
  static selectSportMap(sportMap: { [id: string]: SportMapModel }): { [id: string]: SportMapModel } {
    return sportMap;
  }

  @Selector([EspnFastcastState.selectSportMap])
  static selectSportMapOptions(sportMap: { [id: string]: SportMapModel }): SportMapModel[] {
    return Object.values(sportMap);
  }

  @Selector([EspnFastcastSelectors.selectSportMap])
  static selectLeagueListBySlug(sport: { [slug: string]: SportMapModel }): (slug: string) => LeagueEventList[] {
    return (slug: string) => {
      const league = sport[slug].league;
      const leagueKeys = Object.keys(league);

      return leagueKeys.map(key => ({ league: key, events: league[key].event }));
    };
  }

  @Selector([EspnFastcastSelectors.selectLeagueListBySlug])
  static selectLeagueBySportSlugList(league: string, selectLeagueListBySlug: (slug: string) => LeagueEventList) {
    return (slug: string) => selectLeagueListBySlug(slug);
  }
}
