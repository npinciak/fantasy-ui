import { MOCK_FASTCAST_EVENT_1 } from '../models/fastcast-event.model.mock';
import { SportMapModel } from '../state/espn-fastcast.state';
import { EspnFastcastSelectors } from './espn-fastcast.selectors';

describe('FastCastSelector', () => {
  describe('selectSportMap', () => {
    it('retrieves account settings based on account ID', () => {
      // const getAccountById = () => expected;
      // const result = AccountSelector.getAccount(MOCK_ACCOUNT_DEMAND_BRAND.coreData.accountId, getAccountById);
      // expect(result).toEqual(expected);
    });
  });

  describe('selectSportMapOptions', () => {
    it('retrieves account settings based on account ID', () => {
      const expected: SportMapModel[] = [{ football: { nfl: { event: [MOCK_FASTCAST_EVENT_1] } } }];

      const actual = EspnFastcastSelectors.selectSportMapOptions({ map: { football: { nfl: { event: [MOCK_FASTCAST_EVENT_1] } } } });
      // const expected = MOCK_ACCOUNT_DEMAND_BRAND;
      // const getAccountById = () => expected;
      // const result = AccountSelector.getAccount(MOCK_ACCOUNT_DEMAND_BRAND.coreData.accountId, getAccountById);
      expect(actual).toEqual(expected);
    });
  });

  describe('selectLeagueListBySlug', () => {
    it('retrieves account settings based on account ID', () => {
      // const expected = MOCK_ACCOUNT_DEMAND_BRAND;
      // const getAccountById = () => expected;
      // const result = AccountSelector.getAccount(MOCK_ACCOUNT_DEMAND_BRAND.coreData.accountId, getAccountById);
      // expect(result).toEqual(expected);
    });
  });

  describe('selectLeagueBySportSlugList', () => {
    it('retrieves account settings based on account ID', () => {
      // const expected = MOCK_ACCOUNT_DEMAND_BRAND;
      // const getAccountById = () => expected;
      // const result = AccountSelector.getAccount(MOCK_ACCOUNT_DEMAND_BRAND.coreData.accountId, getAccountById);
      // expect(result).toEqual(expected);
    });
  });
});
