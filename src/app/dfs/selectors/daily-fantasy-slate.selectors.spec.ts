import { MOCK_SITE_SLATE_ENTITY_1, MOCK_SITE_SLATE_ENTITY_MAP, MOCK_SLATE_MASTER } from '../models/daily-fantasy-client-slate.mock';
import { ClientSlateTypes } from '../models/daily-fantasy-client.model';
import { DailyFantasySlateStateModel } from '../state/daily-fantasy-slate.state';
import { DailyFantasySlateSelectors } from './daily-fantasy-slate.selectors';

describe('[DailyFantasySlateSelectors]', () => {
  const slateList = Object.values(MOCK_SLATE_MASTER);
  const state: DailyFantasySlateStateModel = {
    map: MOCK_SLATE_MASTER,
    site: null,
  };

  it('should selectSlateList', () => {
    const selector = DailyFantasySlateSelectors.selectSlateList(state.map);
    expect(selector).toEqual(slateList);
  });

  it('should selectSlateByType', () => {
    const slateListBySite = Object.values(MOCK_SITE_SLATE_ENTITY_MAP);
    const selector = DailyFantasySlateSelectors.selectSlateByType(slateListBySite);

    const expected = {
      [ClientSlateTypes.Classic]: [MOCK_SITE_SLATE_ENTITY_1],
      [ClientSlateTypes.Pickem]: [],
      [ClientSlateTypes.Showdown]: [],
      [ClientSlateTypes.Short]: [],
    };

    expect(selector).toEqual(expected);
  });

  it('should show slates are empty', () => {
    const selector = DailyFantasySlateSelectors.slatesEmpty([]);
    const expected = true;
    expect(selector).toEqual(expected);
  });
});
