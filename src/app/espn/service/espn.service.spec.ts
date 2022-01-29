import { HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { EspnEndpointBuilder, EspnViewParamFragment, FantasySports } from '../models/espn-endpoint-builder.model';
import { EspnService } from './espn.service';

describe('EspnService', () => {
  let service: EspnService;
  let httpTestingController: HttpTestingController;

  const sport = FantasySports.baseball;
  const scoringPeriodId = 1;
  const leagueId = 1;
  const playerId = 12345;
  const lookbackDays = 1;

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

  it('should call espnFantasyLeagueBySport', () => {
    const spy = spyOn(service, 'espnFantasyLeagueBySport').and.callThrough();
    service.espnFantasyLeagueBySport(sport, leagueId).subscribe();
    expect(spy).toHaveBeenCalled();

    const endpoint = new EspnEndpointBuilder(sport, leagueId);
    const params = '?view=kona_player_info&view=mLiveScoring&view=mMatchupScore&view=mRoster&view=mScoreboard&view=mTeam';

    const request = httpTestingController.expectOne(`${endpoint.fantasyLeague}${params}`);
    expect(request.request.method).toBe('GET');

    request.flush({});
  });

  it('should update team', () => {
    const spy = spyOn(service, 'espnUpdateFantasyTeam').and.callThrough();

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

    service.espnUpdateFantasyTeam({}, sport, leagueId).subscribe(res => {
      expect(res).toEqual(expected);
    });

    expect(spy).toHaveBeenCalled();

    const endpoint = new EspnEndpointBuilder(sport, leagueId);

    const request = httpTestingController.expectOne(endpoint.fantasyPlayerTransaction);
    expect(request.request.method).toBe('POST');

    request.flush(expected);
  });

  it('should retrieve player news', () => {
    const spy = spyOn(service, 'espnFantasyPlayerNewsBySport').and.callThrough();

    const expected = {};

    service.espnFantasyPlayerNewsBySport(sport, lookbackDays, playerId).subscribe();

    expect(spy).toHaveBeenCalled();

    const endpoint = new EspnEndpointBuilder(sport);
    const params = `?days=${lookbackDays}&playerId=${playerId}`;

    const request = httpTestingController.expectOne(`${endpoint.fantasyPlayerNews}${params}`);
    expect(request.request.method).toBe('GET');

    request.flush(expected);
  });

  it('should retrieve free agents', () => {
    const spy = spyOn(service, 'espnFantasyFreeAgentsBySport').and.callThrough();

    const expected = {};

    service.espnFantasyFreeAgentsBySport(sport, leagueId, scoringPeriodId, new HttpHeaders()).subscribe();

    expect(spy).toHaveBeenCalled();

    const endpoint = new EspnEndpointBuilder(sport, leagueId);
    const params = `?scoringPeriodId=${scoringPeriodId}&view=${EspnViewParamFragment.PlayerInfo}`;

    const request = httpTestingController.expectOne(`${endpoint.fantasyLeague}${params}`);

    expect(request.request.method).toBe('GET');

    request.flush(expected);
  });
});
