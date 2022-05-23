import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EspnClientLeague } from '@app/espn/espn-client.model';
import { EspnEndpointBuilder, FantasySports } from '@app/espn/models/espn-endpoint-builder.model';
import { NgxsModule, Store } from '@ngxs/store';
import { MOCK_BASEBALL_LEAGUE } from '../models/baseball-league.model.mock';
import { ESPN_BASEBALL_FREEAGENT_1 } from './free-agent.mock';
import { MlbService } from './mlb.service';
import { MlbServiceMock } from './mlb.service.mock';
import { ESPN_BASEBALL_TEAM_MOCK } from './team.mock';

describe('MlbService', () => {
  let service: MlbService;
  let httpTestingController: HttpTestingController;

  const leagueId = 1;
  const sport = FantasySports.baseball;
  const scoringPeriodId = 1;

  const mockLeagueResponse: EspnClientLeague = {
    scoringPeriodId,
    teams: [ESPN_BASEBALL_TEAM_MOCK],
    players: [ESPN_BASEBALL_FREEAGENT_1],
    schedule: [],
    seasonId: 2022,
    id: 1,
    settings: {
      name: '',
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxsModule.forRoot()],
      providers: [{ provde: MlbService, useClass: MlbServiceMock }, Store],
    });

    service = TestBed.inject(MlbService);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(MlbService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('baseballLeague', () => {
    it('should make request', () => {
      const spy = spyOn(service, 'baseballLeague').and.callThrough();
      service.baseballLeague(leagueId).subscribe();
      expect(spy).toHaveBeenCalled();

      const endpoint = new EspnEndpointBuilder(sport, leagueId);
      const params = '?view=kona_player_info&view=mLiveScoring&view=mMatchupScore&view=mRoster&view=mScoreboard&view=mTeam';
      const request = httpTestingController.expectOne(`${endpoint.fantasyLeague}${params}`);
      expect(request.request.method).toBe('GET');

      request.flush(MOCK_BASEBALL_LEAGUE);
    });
  });

  describe('baseballFreeAgents', () => {
    // const filter = {
    //   players: {
    //     filterStatus: { value: ['FREEAGENT', 'WAIVERS'] },
    //     filterSlotIds: { value: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 19] },
    //     filterRanksForScoringPeriodIds: { value: [1] },
    //     sortPercOwned: { sortPriority: 2, sortAsc: false },
    //     sortDraftRanks: { sortPriority: 100, sortAsc: true, value: 'STANDARD' },
    //     limit: 50,
    //     filterStatsForTopScoringPeriodIds: {
    //       value: 5,
    //       additionalValue: ['002022', '102022', '002021', '012022', '022022', '032022', '042022', '062022', '010002022'],
    //     },
    //   },
    // };
    // let headers = new HttpHeaders();
    // headers = headers.append('X-Fantasy-Filter', JSON.stringify(filter));
    // it('should make request', () => {
    //   const spy = spyOn(service, 'baseballFreeAgents').and.callThrough();
    //   const expected = { players: [] };
    //   service.baseballFreeAgents({ leagueId, scoringPeriodId }).subscribe();
    //   expect(spy).toHaveBeenCalled();
    //   const endpoint = new EspnEndpointBuilder(sport, leagueId);
    //   const params = `?scoringPeriodId=${scoringPeriodId}&view=${EspnViewParamFragment.PlayerInfo}`;
    //   const request = httpTestingController.expectOne(`${endpoint.fantasyLeague}${params}`);
    //   expect(request.request.method).toBe('GET');
    //   expect(request.request.headers).toEqual(headers);
    //   request.flush(expected);
    // });
  });
});
