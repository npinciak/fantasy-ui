import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { MOCK_BASEBALL_FREEAGENT_1 } from '../models/baseball-player.model.mock';
import { MlbService } from '../services/mlb.service';
import { MlbServiceMock } from '../services/mlb.service.mock';
import {
  FantasyBaseballFreeAgentsState,
  FetchFantasyBaseballFreeAgents,
  PatchFantasyBaseballFreeAgents,
} from './fantasy-baseball-free-agents.state';

describe('[fantasyBaseballFreeAgents] Store', () => {
  let store: Store;
  let service: MlbService;

  const leagueId = 1;
  const scoringPeriodId = 1;

  const MOCK_FREEAGENTS_STATE = {
    map: { [MOCK_BASEBALL_FREEAGENT_1.id]: MOCK_BASEBALL_FREEAGENT_1 },
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, NgxsModule.forRoot([FantasyBaseballFreeAgentsState])],
        providers: [{ provide: MlbService, useClass: MlbServiceMock }],
      }).compileComponents();

      store = TestBed.inject(Store);
      service = TestBed.inject(MlbService);
    })
  );

  describe('@Action fetchFantasyBaseballFreeAgents', () => {
    it('should create an action and fetch baseball freeagents', async () => {
      const spy = spyOn(service, 'baseballFreeAgents').and.callThrough();

      await store.dispatch(new FetchFantasyBaseballFreeAgents({ leagueId, scoringPeriodId })).toPromise();

      expect(spy).toHaveBeenCalledTimes(1);

      const actual = store.selectSnapshot(FantasyBaseballFreeAgentsState.map);

      expect(actual).toEqual(MOCK_FREEAGENTS_STATE.map);
    });
  });

  describe('@Action patchFantasyBaseballFreeAgents', () => {
    it('should create an action and patch baseball freeagents', async () => {
      const freeAgents = [MOCK_BASEBALL_FREEAGENT_1];
      await store.dispatch(new PatchFantasyBaseballFreeAgents({ freeAgents })).toPromise();

      const actual = store.selectSnapshot(FantasyBaseballFreeAgentsState.map);

      expect(actual).toEqual(MOCK_FREEAGENTS_STATE.map);
    });

    // it('should select isLoading', () => {
    //   const state = MOCK_LEAGUE_STATE;
    //   const selector = FantasyBaseballLeagueState.isLoading(state);
    //   const expected = true;
    //   expect(selector).toEqual(expected);
    // });
  });
});
