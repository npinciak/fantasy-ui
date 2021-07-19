import { TestBed, waitForAsync } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { MlbState } from './mlb.state';
import { FetchBaseballLeague } from '../actions/mlb.actions';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MlbStateModel } from './mlb-state.model';
import { entityMap } from '@app/@shared/operators';
import { MOCK_DATA } from '@app/@shared/helpers/testConfigs';
import { mockState } from './mlb.state.mocks';
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

      const expected = mockState;

      store.dispatch(new FetchBaseballLeague(MOCK_DATA.LEAGUE_ID));

      expect(spy).toHaveBeenCalledTimes(1);

      const requestOne = httpTestingController.expectOne(MOCK_DATA.LEAGUE_REQUEST);

      const requestTwo = httpTestingController.expectOne(MOCK_DATA.ESPN_GAME_REQUEST);

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
      const state = mockState;

      const selector = MlbState.scoringPeriod(state);
      const expected = MOCK_DATA.ESPN_LEAGUE.scoringPeriodId;

      expect(selector).toEqual(expected);
    });
  });

  describe('@Selector teams', () => {
    it('should select team by Id', () => {
      const state = mockState;

      const selector = MlbState.selectTeamById(state);
      const expected = MOCK_DATA.ESPN_TEAM;
      const actual = selector(MOCK_DATA.ESPN_TEAM.id);

      expect(actual).toEqual(expected);
    });

    it('should select all teams', () => {
      const state = mockState;

      const selector = MlbState.teams(state);
      const expected = { [MOCK_DATA.ESPN_TEAM.id]: MOCK_DATA.ESPN_TEAM };

      expect(Object.values(selector).length).toBe(1);
      expect(selector).toEqual(expected);
    });
  });

  describe('@Selector games', () => {
    it('should select event by Id', () => {
      const state = mockState;

      const selector = MlbState.selectEventById(state);
      const expected = MOCK_DATA.ESPN_EVENT;
      const actual = selector(Number(MOCK_DATA.ESPN_EVENT.id));

      expect(actual).toEqual(expected);
    });

    it('should select all events', () => {
      const state = mockState;

      const selector = MlbState.events(state);

      const expected = {
        [Number(MOCK_DATA.ESPN_EVENT.id)]: MOCK_DATA.ESPN_EVENT,
      };

      expect(selector).toEqual(expected);
    });
  });

  describe('@Selector schedule', () => {
    it('should select schedule', () => {
      const state = mockState;

      const selector = MlbState.schedule(state);

      const expected = {
        [MOCK_DATA.ESPN_SCHEDULE[0].id]: MOCK_DATA.ESPN_SCHEDULE[0],
      };

      expect(selector).toEqual(expected);
    });
  });

  describe('@Selector liveScore', () => {
    it('should map teams to BaseballTeam', () => {
      const state = mockState;

      const teamSelector = MlbState.baseballTeamMap(state, state.teams, state.schedule);
      const expected = MOCK_DATA.BASEBALL_TEAM_MAP;

      expect(teamSelector).toEqual(expected);
    });

    it('should map teams to BaseballTeam', () => {
      const state = mockState;

      const teamSelector = MlbState.baseballTeamMap(state, state.teams, state.schedule);
      const liveScoreSelector = MlbState.liveScore(state, teamSelector);

      const expected = Object.values(MOCK_DATA.BASEBALL_TEAM_MAP);

      expect(liveScoreSelector).toEqual(expected);
    });
  });
});
