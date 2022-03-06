import { LocalStorageKeys, LocalStorageState } from '@app/@core/store/local-storage/local-storage.state';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { Selector } from '@ngxs/store';
import { LeagueStorageEntity } from '../models/baseball-league-storage.model';
import { BaseballTeam } from '../models/baseball-team.model';
import { FantasyBaseballTeamsSelector } from './fantasy-baseball-teams.selector';

export class FantasyBaseballLeagueSelectors {
  @Selector([FantasyBaseballTeamsSelector.selectTeamList])
  static standings(teamList: BaseballTeam[]): BaseballTeam[] {
    return teamList.sort((a, b) => b.totalPoints - a.totalPoints);
  }

  @Selector()
  static statsGroup(list: string[]): FilterOptions[] {
    return [];
  }

  @Selector([LocalStorageState.getLocalStorageValue])
  static getLeagueExists(getLocalStorageValue: (key: string) => string): (key: string) => boolean {
    const league = getLocalStorageValue(LocalStorageKeys.UserLeagues);
    const parsed: Record<string, { sport: string }> = JSON.parse(league);
    return (key: string) => Object.keys(parsed).includes(key);
  }

  @Selector([LocalStorageState.getLocalStorageValue])
  static getLeagueById(getLocalStorageValue: (key: string) => string) {
    const league = getLocalStorageValue(LocalStorageKeys.UserLeagues);
    const parsed: LeagueStorageEntity = JSON.parse(league);

    return (key: string) => parsed[key];
  }

  @Selector([LocalStorageState.getLocalStorageValue])
  static getLocalStorageLeagues(getLocalStorageValue: (key: string) => string): LeagueStorageEntity[] {
    const leagues = getLocalStorageValue(LocalStorageKeys.UserLeagues);
    return Object.values(JSON.parse(leagues));
  }
}
