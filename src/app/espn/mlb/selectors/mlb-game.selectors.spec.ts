import { TestBed, waitForAsync } from '@angular/core/testing';
import { MOCK_DATA_CLASS, MOCK_DATA_ESPN, MOCK_DATA_MAPS } from '@app/@shared/helpers/testConfigs';
import { NgxsModule, Store } from '@ngxs/store';
import { MOCK_STATE } from '../state/mlb.state.mocks';
import { MlbGameSelectors } from './mlb-game.selectors';

describe('@Selector Mlb Game', () => {
  let store: Store;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgxsModule.forRoot()],
        providers: [],
      }).compileComponents();

      store = TestBed.inject(Store);
    })
  );

  describe('eventToGameMap', () => {
    it('should map events to baseballGame', () => {
      const expected = MOCK_DATA_MAPS.BASEBALL_GAME_MAP;
      const actual = MlbGameSelectors.eventToGameMap(MOCK_STATE.events);
      expect(actual).toEqual(expected);
    });
  });

  describe('getSortedGamesByStartTime', () => {
    it('should select team by Id', () => {
      const expected = [MOCK_DATA_CLASS.BASEBALL_GAME];
      const eventToGameMap = MlbGameSelectors.eventToGameMap(MOCK_STATE.events);
      const actual = MlbGameSelectors.getSortedGamesByStartTime(eventToGameMap);
      expect(actual).toEqual(expected);
    });

    it('should select all teams', () => {
      // const state = mockState;
      // const selector = MlbState.teams(state);
      // const expected = { [MOCK_DATA.ESPN_TEAM.id]: MOCK_DATA.ESPN_TEAM };
      // expect(Object.values(selector).length).toBe(1);
      // expect(selector).toEqual(expected);
    });
  });

  describe('noGames', () => {
    it('should select team by Id', () => {
      // const state = mockState;
      // const selector = MlbState.selectTeamById(state);
      // const expected = MOCK_DATA.ESPN_TEAM;
      // const actual = selector(MOCK_DATA.ESPN_TEAM.id);
      // expect(actual).toEqual(expected);
    });

    it('should select all teams', () => {
      // const state = mockState;
      // const selector = MlbState.teams(state);
      // const expected = { [MOCK_DATA.ESPN_TEAM.id]: MOCK_DATA.ESPN_TEAM };
      // expect(Object.values(selector).length).toBe(1);
      // expect(selector).toEqual(expected);
    });
  });

  describe('getNumberOfGames', () => {
    it('should select team by Id', () => {
      // const state = mockState;
      // const selector = MlbState.selectTeamById(state);
      // const expected = MOCK_DATA.ESPN_TEAM;
      // const actual = selector(MOCK_DATA.ESPN_TEAM.id);
      // expect(actual).toEqual(expected);
    });

    it('should select all teams', () => {
      // const state = mockState;
      // const selector = MlbState.teams(state);
      // const expected = { [MOCK_DATA.ESPN_TEAM.id]: MOCK_DATA.ESPN_TEAM };
      // expect(Object.values(selector).length).toBe(1);
      // expect(selector).toEqual(expected);
    });
  });

  describe('selectGameById', () => {});
});
