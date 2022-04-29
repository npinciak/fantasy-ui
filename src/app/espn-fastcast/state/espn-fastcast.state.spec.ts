import { TestBed, waitForAsync } from '@angular/core/testing';
import { EspnService } from '@app/espn/service/espn.service';
import { EspnServiceMock } from '@app/espn/service/espn.service.mock';
import { NgxsModule, Store } from '@ngxs/store';
import { EspnFastcastService } from '../service/espn-fastcast.service';
import { EspnFastcastServiceMock } from '../service/espn-fastcast.service.mock';
import { EspnFastcastState } from './espn-fastcast.state';

describe('[espnFastcast] Store', () => {
  let store: Store;
  let espnService: EspnService;
  let fastcastService: EspnFastcastService;

  const url = 'ws://localhost:9876';

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgxsModule.forRoot([EspnFastcastState])],
        providers: [
          { provide: EspnService, useClass: EspnServiceMock },
          { provide: EspnFastcastService, useClass: EspnFastcastServiceMock },
        ],
      }).compileComponents();

      store = TestBed.inject(Store);
      espnService = TestBed.inject(EspnService);
      fastcastService = TestBed.inject(EspnFastcastService);
    })
  );

  afterEach(() => {
    // fastcastService.disconnect();
    // fastcastService.webSocketSubject$.complete();
    // console.log(fastcastService.webSocketSubject$.closed);
  });

  describe('@Action connectWebsocket', () => {
    it('should create an action and open websocket connection', async () => {
      // const spy = spyOn(fastcastService, 'fastCastWebsocket').and.callThrough();
      // await store.dispatch(new ConnectWebSocket()).toPromise();
      // expect(spy).toHaveBeenCalledTimes(1);
      // // await store.dispatch(new DisconnectWebSocket()).toPromise();
      // // fastcastService.webSocketSubject$.next({ op: OperationCode.C });
      // fastcastService.webSocketSubject$.subscribe(res => {
      //   console.log(res);
      // });
    });

    // it('should create an action and subscribe to webSocketSubject$', async () => {
    //   fastcastService.webSocketSubject$.next({ op: OperationCode.C });
    //   fastcastService.webSocketSubject$.subscribe(res => {
    //     console.log(res);
    //   });
    // });
  });

  describe('@Action disconnectWebsocket', () => {
    it('should create an action and patch baseball freeagents', async () => {});
  });

  describe('@Action fetchFastcast', () => {
    it('should create an action and patch baseball freeagents', async () => {});
  });
});
