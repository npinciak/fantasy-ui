import { HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MOCK_FASTCAST_EVENT_1 } from '@app/espn-fastcast/models/fastcast-event.model.mock';
import { MOCK_FASTCAST_LEAGUE_1 } from '@app/espn-fastcast/models/fastcast-league.model.mock';
import { NgxsModule, Store } from '@ngxs/store';
import { includeSports, transformDownDistancePositionText, transformUidToId } from '../espn-helpers';
import { EspnEndpointBuilder, EspnViewParamFragment, FantasySports } from '../models/espn-endpoint-builder.model';
import { EspnService } from './espn.service';

describe('EspnService', () => {
  let service: EspnService;
  let httpTestingController: HttpTestingController;

  const mockFastcastLeague = MOCK_FASTCAST_LEAGUE_1;
  const mockFastcastEvent = MOCK_FASTCAST_EVENT_1;

  const sport = FantasySports.baseball;
  const scoringPeriodId = 1;
  const leagueId = 1;
  const league = 'nfl';
  const playerId = '12345';
  const lookbackDays = '1';

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

  describe('espnFantasyLeagueBySport', () => {
    it('should make request', () => {
      const spy = spyOn(service, 'espnFantasyLeagueBySport').and.callThrough();
      service.espnFantasyLeagueBySport(sport, leagueId).subscribe();
      expect(spy).toHaveBeenCalled();

      const endpoint = new EspnEndpointBuilder(sport, leagueId);
      const params = '?view=kona_player_info&view=mLiveScoring&view=mMatchupScore&view=mRoster&view=mScoreboard&view=mTeam';

      const request = httpTestingController.expectOne(`${endpoint.fantasyLeague}${params}`);
      expect(request.request.method).toBe('GET');

      request.flush({});
    });
  });

  describe('espnUpdateFantasyTeam', () => {
    it('should make request', () => {
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
  });

  describe('espnFantasyPlayerNewsBySport', () => {
    it('should make request', () => {
      const spy = spyOn(service, 'espnFantasyPlayerNewsBySport').and.callThrough();

      const expected = {};

      service.espnFantasyPlayerNewsBySport({ sport, lookbackDays, playerId }).subscribe();

      expect(spy).toHaveBeenCalled();

      const endpoint = new EspnEndpointBuilder(sport);
      const params = `?days=${lookbackDays}&playerId=${playerId}`;

      const request = httpTestingController.expectOne(`${endpoint.fantasyPlayerNews}${params}`);
      expect(request.request.method).toBe('GET');

      request.flush(expected);
    });
  });

  describe('espnFantasyFreeAgentsBySport', () => {
    it('should make request', () => {
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

  describe('espnFastcast', () => {
    it('should make request', () => {
      const spy = spyOn(service, 'espnFastcast').and.callThrough();

      const expected = { sports: [] };
      const endpoint = 'https://jsonplaceholder.typicode.com/posts';

      service.espnFastcast(endpoint).subscribe();

      expect(spy).toHaveBeenCalled();

      const request = httpTestingController.expectOne(endpoint);

      expect(request.request.method).toBe('GET');

      request.flush(expected);
    });
  });

  describe('includeSports', () => {
    it('should be true', () => {
      const actual = includeSports('1');
      expect(actual).toBeTrue();
    });

    it('should be false', () => {
      const actual = includeSports('18');
      expect(actual).toBeFalse();
    });
  });

  describe('transformUidToId', () => {
    it('should return id', () => {
      const expected = mockFastcastLeague.id;
      const actual = transformUidToId(mockFastcastLeague.uid);
      expect(actual).toEqual(expected);
    });

    it('should return null', () => {
      const actual = transformUidToId('');
      expect(actual).toEqual(null);
    });
  });

  describe('transformDownDistancePositionText ', () => {
    it('should return down distance and possession ', () => {
      // const expected = `${mockFastcastEvent.footballSituation?.shortDownDistanceText}, ${mockFastcastEvent.lastPlay.text}`;
      // const actual = transformDownDistancePositionText(
      //   mockFastcastEvent.footballSituation?.shortDownDistanceText,
      //   mockFastcastEvent.lastPlay.text
      // );
      // expect(actual).toEqual(expected);
    });

    it('should return null', () => {
      const actual = transformDownDistancePositionText('', null);
      expect(actual).toEqual(null);
    });
  });
});
