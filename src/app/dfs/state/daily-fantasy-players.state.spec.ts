import { TestBed, waitForAsync } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { MOCK_DFS_SLATE_PLAYER_MAP } from '../models/player.model.mock';
import { PlayerService } from '../service/player.service';
import { PlayerServiceMock } from '../service/player.service.mock';
import { DailyFantasyPlayersState, FetchPlayers } from './daily-fantasy-players.state';

describe('[dailyFantasyPlayers] Store', () => {
  let store: Store;
  let service: PlayerService;

  const slatePath = 'https://example.com';

  const MOCK_STATE = {
    map: MOCK_DFS_SLATE_PLAYER_MAP,
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgxsModule.forRoot([DailyFantasyPlayersState])],
        providers: [{ provide: PlayerService, useClass: PlayerServiceMock }],
      }).compileComponents();

      store = TestBed.inject(Store);
      service = TestBed.inject(PlayerService);
    })
  );

  describe('@Action fetchPlayers', () => {
    it('should create an action and fetch players', async () => {
      const spy = spyOn(service, 'playersBySlate').and.callThrough();
      await store.dispatch(new FetchPlayers({ slatePath })).toPromise();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('@Selector getMap', () => {
    it('should select getMap', () => {
      const expected = MOCK_STATE.map;
      const selector = DailyFantasyPlayersState.getMap(MOCK_STATE);
      expect(selector).toEqual(expected);
    });
  });
});
