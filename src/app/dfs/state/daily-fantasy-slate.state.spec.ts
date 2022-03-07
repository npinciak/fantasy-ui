import { TestBed, waitForAsync } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { MOCK_SLATE_MASTER } from '../models/daily-fantasy-client-slate.mock';
import { SlateService } from '../service/slate.service';
import { SlateServiceMock } from '../service/slate.service.mock';
import { DailyFantasySlateState, DailyFantasySlateStateModel, FetchSlates } from './daily-fantasy-slate.state';

describe('[dailyFantasySlate] Store', () => {
  let store: Store;
  let service: SlateService;

  const site = 'draftkings';
  const sport = 'mlb';

  const MOCK_STATE: DailyFantasySlateStateModel = {
    map: MOCK_SLATE_MASTER,
    site: null,
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgxsModule.forRoot([DailyFantasySlateState])],
        providers: [{ provide: SlateService, useClass: SlateServiceMock }],
      }).compileComponents();

      store = TestBed.inject(Store);
      service = TestBed.inject(SlateService);
    })
  );

  describe('@Action fetchSlates', () => {
    it('should create an action and fetch slates', async () => {
      const spy = spyOn(service, 'slatesByDate').and.callThrough();
      await store.dispatch(new FetchSlates({ site, sport })).toPromise();
      expect(spy).toHaveBeenCalledTimes(1);

      const expected = MOCK_STATE.map;
      const selector = store.selectSnapshot(DailyFantasySlateState.slateMap);

      expect(selector).toEqual(expected);
    });
  });

  describe('@Selector site', () => {
    it('should select site', () => {
      const expected = MOCK_STATE.site;
      const selector = DailyFantasySlateState.site(MOCK_STATE);
      expect(selector).toEqual(expected);
    });
  });
});
