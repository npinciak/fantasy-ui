/* eslint-disable max-len */
import { HttpHeaders } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MOCK_DATA } from '@app/@shared/helpers/testConfigs';
import { NgxsModule, Store } from '@ngxs/store';

import { EspnService } from './espn.service';

describe('EspnService', () => {
  let service: EspnService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxsModule.forRoot()],
      providers: [EspnService, Store],
    });

    service = TestBed.inject(EspnService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call fetchEspnBaseball', () => {
    const spy = spyOn(service, 'fetchEspnBaseball').and.callThrough();

    service.fetchEspnBaseball(MOCK_DATA.LEAGUE_ID).subscribe();

    expect(spy).toHaveBeenCalled();

    const requestOne = httpTestingController.expectOne(
      MOCK_DATA.LEAGUE_REQUEST
    );

    const requestTwo = httpTestingController.expectOne(
      MOCK_DATA.ESPN_GAME_REQUEST
    );

    expect(requestOne.request.method).toBe('GET');
    expect(requestTwo.request.method).toBe('GET');

    requestOne.flush(MOCK_DATA.ESPN_LEAGUE);
    requestTwo.flush(MOCK_DATA.ESPN_GAME_REQUEST);
  });

  it('should update team', () => {
    const spy = spyOn(service, 'updateTeam').and.callThrough();

    const expected = {
      bidAmount: 0,
      executionType: 'EXECUTE',
      id: 'XXX-XXX-XXX-XXX',
      isActingAsTeamOwner: false,
      isLeagueManager: false,
      isPending: false,
      items: [
        {
          fromLineupSlotId: 5,
          fromTeamId: 0,
          isKeeper: false,
          overallPickNumber: 0,
          playerId: 35568,
          toLineupSlotId: 16,
          toTeamId: 0,
          type: 'LINEUP',
        },
      ],
      memberId: '{XXX-XXX-XXX-XXX-XXXX}',
      proposedDate: 1624751945319,
      rating: 0,
      scoringPeriodId: 87,
      skipTransactionCounters: false,
      status: 'EXECUTED',
      subOrder: 0,
      teamId: 6,
      type: 'ROSTER',
    };

    service.updateTeam({}, MOCK_DATA.LEAGUE_ID).subscribe((res) => {
      expect(res).toEqual(expected);
    });

    expect(spy).toHaveBeenCalled();

    const request = httpTestingController.expectOne(MOCK_DATA.ESPN_UPDATE_TEAM);

    expect(request.request.method).toBe('POST');

    request.flush(expected);
  });

  it('should retrieve player news', () => {
    const spy = spyOn(service, 'playerNews').and.callThrough();

    const expected = {};

    service.playerNews(1, 12345).subscribe();

    expect(spy).toHaveBeenCalled();

    const request = httpTestingController.expectOne(
      'https://site.api.espn.com/apis/fantasy/v2/games/flb/news/players?days=1&playerId=12345'
    );

    expect(request.request.method).toBe('GET');

    request.flush(expected);
  });

  it('should retrieve free agents', () => {
    const spy = spyOn(service, 'freeAgents').and.callThrough();

    const expected = {};

    service.freeAgents(1, new HttpHeaders()).subscribe();

    expect(spy).toHaveBeenCalled();

    const request = httpTestingController.expectOne(
      'https://fantasy.espn.com/apis/v3/games/flb/seasons/2021/segments/0/leagues/1?scoringPeriodId=26&view=kona_player_info'
    );

    expect(request.request.method).toBe('GET');

    request.flush(expected);
  });
});
