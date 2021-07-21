import { TestBed, waitForAsync } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { MOCK_STATE, MOCK_STATE_EMPTY } from '../state/mlb.state.mocks';
import { MlbTeamSelectors } from './mlb-team.selectors';

describe('@Selector Mlb Team', () => {
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

  describe('selectBaseballTeamById', () => {
    it('should select team by id', () => {
      // const expected = MOCK_DATA.BASEBALL_TEAM;
      // const result = MlbTeamSelectors.selectBaseballTeamById(MOCK_STATE.teams)(6);
      // console.log(MOCK_STATE.teams);
      // expect(result).toEqual(expected);
    });
  });

  describe('teamsEmpty', () => {
    it('should return false', () => {
      const actual = MlbTeamSelectors.teamsEmpty(MOCK_STATE);
      expect(actual).toEqual(false);
    });

    it('should return true', () => {
      const actual = MlbTeamSelectors.teamsEmpty(MOCK_STATE_EMPTY);
      expect(actual).toEqual(true);
    });
  });

  describe('getTeamRoster', () => {
    it('should select roster by team id', () => {
      // const expected = MOCK_DATA.BASEBALL_ROSTER;
      // const selectBaseballTeamById = MlbTeamSelectors.selectBaseballTeamById(MOCK_STATE.teams);
      // const actual = MlbTeamSelectors.getTeamRoster(selectBaseballTeamById)(MOCK_DATA.ESPN_TEAM.id);
      // expect(actual).toEqual(expected);
    });
  });

  describe('getTeamBatters', () => {
    it('should select roster by team id', () => {
      // const expected = [MOCK_DATA.BASEBALL_ROSTER[1]];
      // const selectBaseballTeamById = MlbTeamSelectors.selectBaseballTeamById(MOCK_STATE.teams);
      // const getTeamRoster = MlbTeamSelectors.getTeamRoster(selectBaseballTeamById);
      // const actual = MlbTeamSelectors.getTeamBatters(getTeamRoster)(MOCK_DATA.ESPN_TEAM.id).filter(player => !player.isPitcher);
      // expect(actual).toEqual(expected);
    });
  });
});
