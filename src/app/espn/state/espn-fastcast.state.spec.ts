/* eslint-disable quote-props */
import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';

import { EspnFastcastService } from '../espn-fastcast.service';
import { EspnFastcastServiceMock } from '../espn-fastcast.service.mock';
import { EspnService } from '../espn.service';
import { EspnServiceMock } from '../espn.service.mock';
import { MOCK_FASTCAST_EVENT_1 } from '../models/fastcast-event.model.mock';
import { EspnFastcastState, EspnFastcastStateModel } from './espn-fastcast.state';

describe('Fastcast State', () => {
  let store: Store;
  let fastcastService: EspnFastcastService;

  const MOCK_STATE: EspnFastcastStateModel = {
    map: {
      [MOCK_FASTCAST_EVENT_1.id]: MOCK_FASTCAST_EVENT_1,
    },
    disconnect: null,
    connect: null,
    lastRefresh: null,
  };

  const MOCK_WS_MESSAGE = { [MOCK_FASTCAST_EVENT_1.id]: MOCK_FASTCAST_EVENT_1 };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([EspnFastcastState])],
      providers: [
        { provide: EspnFastcastService, useClass: EspnFastcastServiceMock },
        { provide: EspnService, useClass: EspnServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fastcastService = TestBed.inject(EspnFastcastService);
    store = TestBed.inject(Store);
    store.reset({ map: MOCK_STATE.map });
  });

  describe('selectSportMap', () => {
    it('returns a hash map of fastcast sports', () => {
      const result = EspnFastcastState.selectMap(MOCK_STATE);
      expect(result).toEqual(MOCK_STATE.map);
    });
  });

  describe('selectLastRefresh', () => {
    it('returns last refresh of websocket', () => {
      const result = EspnFastcastState.selectLastRefresh(MOCK_STATE);
      expect(result).toEqual(MOCK_STATE.lastRefresh);
    });
  });

  // TODO
  describe('connectWebsocket', () => {
    it('fetches results and sets results', async () => {});
  });
});
