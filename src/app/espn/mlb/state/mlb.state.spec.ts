import { TestBed, waitForAsync } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { MlbState } from './mlb.state';
import { FetchBaseballLeague } from '../actions/mlb.actions';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MlbStateModel } from './mlb-state.model';
import { entityMap } from '@app/@shared/operators';
import { MOCK_DATA_ESPN } from '@app/@shared/helpers/testConfigs';
import { MOCK_STATE } from './mlb.state.mocks';
import { newTeamMap } from '@app/@shared/helpers/mapping';
import { MockGame, MockLeague } from '../mocks';
import { EspnService } from '@espn/espn.service';

describe('[MLB] Store', () => {
  let store: Store;
  let service: EspnService;
  let httpTestingController: HttpTestingController;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, NgxsModule.forRoot([MlbState])],
        providers: [EspnService],
      }).compileComponents();

      store = TestBed.inject(Store);
      service = TestBed.inject(EspnService);
      httpTestingController = TestBed.inject(HttpTestingController);
    })
  );

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('@Action fetchBaseballLeague', () => {
    it('should create an action and fetch baseball league', () => {
      const spy = spyOn(service, 'fetchEspnBaseball').and.callThrough();

      const expected = MOCK_STATE;

      store.dispatch(new FetchBaseballLeague(MOCK_DATA_ESPN.ESPN_LEAGUE_ID));

      expect(spy).toHaveBeenCalledTimes(1);

      const requestOne = httpTestingController.expectOne(MOCK_DATA_ESPN.ESPN_LEAGUE_REQUEST);

      const requestTwo = httpTestingController.expectOne(MOCK_DATA_ESPN.ESPN_GAME_REQUEST);

      expect(requestOne.request.method).toBe('GET');
      expect(requestTwo.request.method).toBe('GET');

      requestOne.flush(MockLeague);
      requestTwo.flush(MockGame);

      const actual = store.selectSnapshot(MlbState.getState);

      expect(actual).toEqual(expected);
    });
  });

  describe('@Selector scoringPeriodId', () => {
    it('should select scoringPeriodId', () => {
      const state = MOCK_STATE;

      const selector = MlbState.scoringPeriod(state);
      const expected = MOCK_DATA_ESPN.ESPN_LEAGUE.scoringPeriodId;

      expect(selector).toEqual(expected);
    });
  });

  describe('@Selector liveScore', () => {
    it('should map teams to BaseballTeam', () => {
      // const state = mockState;
      // const teamSelector = MlbState.baseballTeamMap(state, state.teams, state.schedule);
      // const expected = MOCK_DATA_ESPN.BASEBALL_TEAM_MAP;
      // expect(teamSelector).toEqual(expected);
    });

    it('should map teams to BaseballTeam', () => {
      // const state = mockState;
      // const teamSelector = MlbState.baseballTeamMap(state, state.teams, state.schedule);
      // const liveScoreSelector = MlbState.liveScore(state, teamSelector);
      // const expected = Object.values(MOCK_DATA_ESPN.BASEBALL_TEAM_MAP);
      // expect(liveScoreSelector).toEqual(expected);
    });
  });
});
