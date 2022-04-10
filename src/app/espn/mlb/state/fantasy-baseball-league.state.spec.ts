import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { FetchBaseballLeague } from '../actions/mlb.actions';
import { MlbService } from '../services/mlb.service';
import { MlbServiceMock } from '../services/mlb.service.mock';
import { FantasyBaseballLeagueState } from './fantasy-baseball-league.state';

describe('[fantasyBaseballLeague] Store', () => {
  let store: Store;
  let service: MlbService;

  const leagueId = 1;
  const scoringPeriodId = 1;
  const seasonId = '2';

  const MOCK_LEAGUE_STATE = {
    scoringPeriodId,
    seasonId,
    isLoading: true,
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, NgxsModule.forRoot([FantasyBaseballLeagueState])],
        providers: [{ provide: MlbService, useClass: MlbServiceMock }],
      }).compileComponents();

      store = TestBed.inject(Store);
      service = TestBed.inject(MlbService);
    })
  );

  describe('@Action fetchBaseballLeague', () => {
    it('should create an action and fetch baseball league', async () => {
      const spy = spyOn(service, 'baseballLeague').and.callThrough();

      await store.dispatch(new FetchBaseballLeague({ leagueId })).toPromise();

      expect(spy).toHaveBeenCalledTimes(1);

      const actual = store.selectSnapshot(FantasyBaseballLeagueState.getState);

      expect(actual).toEqual(MOCK_LEAGUE_STATE);
    });

    it('should create an action and NOT fetch baseball league', async () => {
      store.reset({
        ...store.snapshot(),
        fantasyBaseballLeague: { scoringPeriodId: 1 },
      });

      const spy = spyOn(service, 'baseballLeague').and.callThrough();

      await store.dispatch(new FetchBaseballLeague({ leagueId })).toPromise();

      expect(spy).toHaveBeenCalledTimes(0);
    });
  });

  describe('@Selector seasonId', () => {
    it('should select seasonId', () => {
      const state = MOCK_LEAGUE_STATE;
      const selector = FantasyBaseballLeagueState.seasonId(state);
      const expected = seasonId;
      expect(selector).toEqual(expected);
    });
  });

  describe('@Selector scoringPeriodId', () => {
    it('should select scoringPeriodId', () => {
      const state = MOCK_LEAGUE_STATE;
      const selector = FantasyBaseballLeagueState.scoringPeriod(state);
      const expected = scoringPeriodId;
      expect(selector).toEqual(expected);
    });
  });

  describe('@Selector isLoading', () => {
    it('should select isLoading', () => {
      const state = MOCK_LEAGUE_STATE;
      const selector = FantasyBaseballLeagueState.isLoading(state);
      const expected = true;
      expect(selector).toEqual(expected);
    });
  });
});
