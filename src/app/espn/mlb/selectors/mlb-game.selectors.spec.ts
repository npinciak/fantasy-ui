import { TestBed, waitForAsync } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';

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

  describe('getSortedGamesByStartTime', () => {
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
