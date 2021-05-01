import { TestBed, async, waitForAsync } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { EspnState, EspnStateModel } from './espn.state';
import { EspnAction, EspnGetBaseballLeague } from './espn.actions';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EspnService } from '../espn.service';

describe('Espn store', () => {
  let store: Store;
  let espnService: EspnService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          NgxsModule.forRoot([EspnState]),
        ],
        providers: [EspnService]
      }).compileComponents();

      store = TestBed.inject(Store);
      espnService = TestBed.inject(EspnService);

    }));

  it('should create an action and add an item', () => {
    const expected: EspnStateModel = {
      leagueId: null,
      leagueName: null,
      teams: [],
      freeAgents: [],
      isLoading: true
    };
    store.dispatch(new EspnAction('item-1'));
    const actual = store.selectSnapshot(EspnState.getState);
    expect(actual).toEqual(expected);
  });

  it('should call getBaseballLeague', () => {

    const spy = spyOn(espnService, 'getBaseballLeague');

    store.dispatch(new EspnGetBaseballLeague(1));

    expect(espnService.getBaseballLeague).toHaveBeenCalled();

    // const expected: EspnStateModel = {
    //   leagueId: null,
    //   leagueName: null,
    //   teams: [],
    //   freeAgents: [],
    //   isLoading: true
    // };
    // store.dispatch(new EspnAction('item-1'));
    // const actual = store.selectSnapshot(EspnState.getState);
    // expect(actual).toEqual(expected);
  });




});
