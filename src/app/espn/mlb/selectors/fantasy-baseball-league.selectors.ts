import { LocalStorageSelectors } from '@app/@core/store/local-storage/local-storage.selectors';
import { LocalStorageKeys } from '@app/@core/store/local-storage/local-storage.state';
import { exists } from '@app/@shared/helpers/utils';
import { Selector } from '@app/@shared/models/typed-selector';
import { LeagueStorageEntity } from '../models/baseball-league-storage.model';
import { BaseballTeam, BaseballTeamLive } from '../models/baseball-team.model';
import { FantasyBaseballTeamsLiveSelector } from './fantasy-baseball-teams-live.selector';
import { FantasyBaseballTeamsSelector } from './fantasy-baseball-teams.selector';

const average = (arr: number[]): number => {
  const sum = arr.reduce((a, b) => a + b, 0);
  return sum / arr.length;
};

export class FantasyBaseballLeagueSelectors {
  @Selector([FantasyBaseballTeamsSelector.getList, FantasyBaseballTeamsLiveSelector.getById])
  static standings(teamList: BaseballTeam[], getById: (id: string | null) => BaseballTeamLive): BaseballTeam[] {
    return teamList
      .map(t => {
        const liveTeam = getById(t.id);
        return {
          ...t,
          liveScore: liveTeam.liveScore,
        };
      })
      .sort((a, b) => b.liveScore - a.liveScore);
  }

  @Selector([LocalStorageSelectors.getLocalStorageValue])
  static getLeagueExists(getLocalStorageValue: (key: LocalStorageKeys) => string | null): (key: string) => boolean {
    const leagues = getLocalStorageValue(LocalStorageKeys.UserLeagues);
    const parsed: Record<string, { sport: string; leagueId: string }> | null = exists(leagues) ? JSON.parse(leagues) : null;

    return (key: string) => (exists(parsed) ? Object.keys(parsed).includes(key) : false);
  }

  @Selector([LocalStorageSelectors.getLocalStorageValue])
  static getLeagueById(getLocalStorageValue: (key: LocalStorageKeys) => string | null) {
    const leagues = getLocalStorageValue(LocalStorageKeys.UserLeagues);
    const parsed: Record<string, { sport: string; leagueId: string }> | null = exists(leagues) ? JSON.parse(leagues) : null;

    return (key: string) => (exists(parsed) ? parsed[key] : null);
  }

  @Selector([LocalStorageSelectors.getLocalStorageValue])
  static getLocalStorageLeagues(getLocalStorageValue: (key: LocalStorageKeys) => string | null): LeagueStorageEntity[] {
    const leagues = getLocalStorageValue(LocalStorageKeys.UserLeagues);
    return exists(leagues) ? Object.values(JSON.parse(leagues)) : [];
  }
}
