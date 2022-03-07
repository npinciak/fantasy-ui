import { TestBed, waitForAsync } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { MOCK_PLAYER_SLATE_ATTR_MAP } from '../models/player-slate-attr.model.mock';
import { MOCK_SLATE_TEAM_MAP } from '../models/team.model.mock';
import { NflDfsPlayerGridIronState } from '../nfl/state/nfl-dfs-player-gridiron.state';
import { PlayerService } from '../service/player.service';
import { PlayerServiceMock } from '../service/player.service.mock';
import { SlateService } from '../service/slate.service';
import { SlateServiceMock } from '../service/slate.service.mock';
import { DailyFantasySlateAttrState, FetchSlateAttr } from './daily-fantasy-slate-attr.state';

describe('[dailyFantasySlateAttr] Store', () => {
  let store: Store;
  let slateService: SlateService;
  let playerService: PlayerService;

  const MOCK_STATE = {
    teams: MOCK_SLATE_TEAM_MAP,
    players: MOCK_PLAYER_SLATE_ATTR_MAP,
    slate: '123456',
    site: null,
  };

  const sport = 'mlb';
  const site = 'draftkings';
  const slateId = '123456';

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgxsModule.forRoot([DailyFantasySlateAttrState, NflDfsPlayerGridIronState])],
        providers: [
          { provide: SlateService, useClass: SlateServiceMock },
          { provide: PlayerService, useClass: PlayerServiceMock },
        ],
      }).compileComponents();

      store = TestBed.inject(Store);
      slateService = TestBed.inject(SlateService);
      playerService = TestBed.inject(PlayerService);
    })
  );

  describe('@Action FetchSlateAttr', () => {
    it('should create an action and fetch slate attributes', async () => {
      const spy = spyOn(slateService, 'getGameAttrBySlateId').and.callThrough();
      await store.dispatch(new FetchSlateAttr({ sport, site, slateId })).toPromise();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('@Action FetchGridIronPlayers', () => {
    it('should create an action and fetch gridiron player info if sport is nfl', async () => {
      const spy = spyOn(playerService, 'getGridIronPlayers').and.callThrough();
      await store.dispatch(new FetchSlateAttr({ sport: 'nfl', site, slateId })).toPromise();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('@Selector teamMap', () => {
    it('should select teamMap', () => {
      const expected = MOCK_STATE.teams;
      const selector = DailyFantasySlateAttrState.teamMap(MOCK_STATE);
      expect(selector).toEqual(expected);
    });
  });

  describe('@Selector playerMap', () => {
    it('should select playerMap', () => {
      const expected = MOCK_STATE.players;
      const selector = DailyFantasySlateAttrState.playerMap(MOCK_STATE);
      expect(selector).toEqual(expected);
    });
  });

  describe('@Selector slate', () => {
    it('should select slate', () => {
      const expected = MOCK_STATE.slate;
      const selector = DailyFantasySlateAttrState.slate(MOCK_STATE);
      expect(selector).toEqual(expected);
    });
  });
});
