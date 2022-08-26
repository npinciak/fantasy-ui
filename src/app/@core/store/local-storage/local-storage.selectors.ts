import { exists } from '@app/@shared/helpers/utils';
import { Selector } from '@app/@shared/models/typed-selector';
import { LocalStorageKeys, LocalStorageState, LocalStorageStateModel } from './local-storage.state';

export class LocalStorageSelectors {
  @Selector([LocalStorageState])
  static getLocalStorageValue(state: LocalStorageStateModel): (key: LocalStorageKeys) => string | null {
    return (key: LocalStorageKeys) => state[key] ?? null;
  }

  @Selector([LocalStorageSelectors.getLocalStorageValue])
  static localStorageKeyExists(localStorageValueKey: (key: LocalStorageKeys) => string | null): (key: LocalStorageKeys) => boolean {
    return (key: LocalStorageKeys) => exists(localStorageValueKey(key));
  }

  @Selector([LocalStorageSelectors.getLocalStorageValue])
  static getLocalStorageLeagueById(localStorageValueKey: (key: LocalStorageKeys) => string | null): (
    key: LocalStorageKeys,
    leagueId: string
  ) => {
    sport: string;
    leagueId: string;
  } | null {
    return (key: LocalStorageKeys, leagueId: string) => {
      const leagues = localStorageValueKey(key);

      const test: { sport: string; leagueId: string } | null = exists(leagues) ? JSON.parse(leagues)[leagueId] : null;

      return test;
    };
  }
}
