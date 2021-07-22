import { TestBed, waitForAsync } from '@angular/core/testing';
import { MOCK_DATA_CLASS, MOCK_DATA_MAPS } from '@app/@shared/helpers/testConfigs';
import { NgxsModule, Store } from '@ngxs/store';
import { MOCK_STATE, MOCK_STATE_EMPTY } from '../state/mlb.state.mocks';
import { MlbTeamSelectors } from './mlb-team.selectors';
import { MlbSelectors } from './mlb.selectors';

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

  describe('baseballTeamMap', () => {
    it('should return map of baseball teams', () => {
      const expected = MOCK_DATA_MAPS.BASEBALL_TEAM_MAP;
      const result = MlbTeamSelectors.baseballTeamMap(MOCK_STATE.teams);
      expect(result).toEqual(expected);
    });
  });

  describe('selectBaseballTeamById', () => {
    it('should select team by id', () => {
      const expected = MOCK_DATA_CLASS.BASEBALL_TEAM;
      const result = MlbTeamSelectors.selectBaseballTeamById(MOCK_DATA_MAPS.BASEBALL_TEAM_MAP)(6);
      expect(result).toEqual(expected);
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
      const expected = MOCK_DATA_MAPS.BASEBALL_PLAYER_MAP;
      const selectBaseballTeamById = MlbTeamSelectors.selectBaseballTeamById(MOCK_DATA_MAPS.BASEBALL_TEAM_MAP);
      const actual = MlbTeamSelectors.getTeamRoster(selectBaseballTeamById)(MOCK_DATA_CLASS.BASEBALL_TEAM.teamId);
      expect(actual).toEqual(expected);
    });
  });

  describe('getTeamBatters', () => {
    it('should filter batters by team id', () => {
      const expected = [
        MOCK_DATA_CLASS.BASEBALL_PLAYER_HEALTHY,
        MOCK_DATA_CLASS.BASEBALL_PLAYER_BENCH,
        MOCK_DATA_CLASS.BASEBALL_PLAYER_INJURED,
      ];
      const selectBaseballTeamById = MlbTeamSelectors.selectBaseballTeamById(MOCK_DATA_MAPS.BASEBALL_TEAM_MAP);
      const getTeamRoster = MlbTeamSelectors.getTeamRoster(selectBaseballTeamById);
      const actual = MlbTeamSelectors.getTeamBatters(getTeamRoster)(MOCK_DATA_CLASS.BASEBALL_TEAM.teamId);
      expect(actual).toEqual(expected);
    });
  });

  describe('getTeamStartingBatters', () => {
    it('should filter batters by team id who are in current team lineup', () => {
      const expected = [MOCK_DATA_CLASS.BASEBALL_PLAYER_HEALTHY];
      const selectBaseballTeamById = MlbTeamSelectors.selectBaseballTeamById(MOCK_DATA_MAPS.BASEBALL_TEAM_MAP);
      const getTeamRoster = MlbTeamSelectors.getTeamRoster(selectBaseballTeamById);
      const getTeamBatters = MlbTeamSelectors.getTeamBatters(getTeamRoster);
      const actual = MlbTeamSelectors.getTeamStartingBatters(getTeamBatters)(MOCK_DATA_CLASS.BASEBALL_TEAM.teamId);
      expect(actual).toEqual(expected);
    });
  });

  describe('getTeamBenchBatters', () => {
    it('should filter batters by team id who are on the bench', () => {
      const expected = [MOCK_DATA_CLASS.BASEBALL_PLAYER_BENCH];
      const selectBaseballTeamById = MlbTeamSelectors.selectBaseballTeamById(MOCK_DATA_MAPS.BASEBALL_TEAM_MAP);
      const getTeamRoster = MlbTeamSelectors.getTeamRoster(selectBaseballTeamById);
      const getTeamBatters = MlbTeamSelectors.getTeamBatters(getTeamRoster);
      const actual = MlbTeamSelectors.getTeamBenchBatters(getTeamBatters)(MOCK_DATA_CLASS.BASEBALL_TEAM.teamId);
      expect(actual).toEqual(expected);
    });
  });

  describe('getTeamPitchers', () => {
    it('should filter pitchers by team id ', () => {
      const expected = [MOCK_DATA_CLASS.BASEBALL_PLAYER_PITCHER];
      const selectBaseballTeamById = MlbTeamSelectors.selectBaseballTeamById(MOCK_DATA_MAPS.BASEBALL_TEAM_MAP);
      const getTeamRoster = MlbTeamSelectors.getTeamRoster(selectBaseballTeamById);
      const actual = MlbTeamSelectors.getTeamPitchers(getTeamRoster)(MOCK_DATA_CLASS.BASEBALL_TEAM.teamId);
      expect(actual).toEqual(expected);
    });
  });
});
