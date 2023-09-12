import { TestBed } from '@angular/core/testing';
import { GenericStateModel } from '@app/@shared/generic-state/generic.model';
import { NgxsModule, Store } from '@ngxs/store';
import { existsFilter } from '@sports-ui/ui-sdk/helpers';
import { FantasyBaseballTeamsLive } from '../actions/fantasy-baseball-team-live.actions';
import { FantasyBaseballTeams } from '../actions/fantasy-baseball-team.actions';
import { FantasyBaseballScoringPeriod } from '../fantasy-baseball-scoring-period';
import {
  MOCK_BASEBALL_PLAYER_B,
  MOCK_BASEBALL_PLAYER_BATTER_LIST,
  MOCK_BASEBALL_PLAYER_BATTER_STATS_ROW_LIST,
  MOCK_BASEBALL_PLAYER_B_1,
  MOCK_BASEBALL_PLAYER_P,
  MOCK_BASEBALL_PLAYER_PITCHER_LIST,
  MOCK_BASEBALL_PLAYER_PITCHER_STATS_ROW_LIST,
  MOCK_BASEBALL_PLAYER_P_1,
} from '../models/baseball-player.model.mock';
import { BaseballTeam } from '../models/baseball-team.model';
import { MOCK_BASEBALL_TEAM_1, MOCK_BASEBALL_TEAM_2, MOCK_BASEBALL_TEAM_LIST } from '../models/baseball-team.model.mock';
import { FantasyBaseballTeamsLiveState } from '../state/fantasy-baseball-team-live.state';
import { FantasyBaseballTeamState } from '../state/fantasy-baseball-team.state';
import { FantasyBaseballTeamSelector } from './fantasy-baseball-team.selector';

describe('FantasyBaseballTeamSelector', () => {
  let store: Store;

  const MOCK_STATE: GenericStateModel<BaseballTeam> = {
    map: {
      [MOCK_BASEBALL_TEAM_1.id]: MOCK_BASEBALL_TEAM_1,
      [MOCK_BASEBALL_TEAM_2.id]: MOCK_BASEBALL_TEAM_2,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([FantasyBaseballTeamState, FantasyBaseballTeamsLiveState])],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(Store);
    store.reset({ [FantasyBaseballTeams.stateName]: MOCK_STATE, [FantasyBaseballTeamsLive.stateName]: MOCK_STATE });
  });

  const teamId = MOCK_BASEBALL_TEAM_1.id;
  const mockRosterBatters = MOCK_BASEBALL_TEAM_1.roster.filter(p => !p.isPitcher);
  const mockRosterPitchers = MOCK_BASEBALL_TEAM_1.roster.filter(p => p.isPitcher);

  describe('getTeamInfoByTeamId', () => {
    it('should return getTeamInfoByTeamId', () => {
      const actual = FantasyBaseballTeamSelector.getTeamInfoByTeamId(MOCK_BASEBALL_TEAM_1.id, () => MOCK_BASEBALL_TEAM_1);
      const expected = MOCK_BASEBALL_TEAM_1;
      expect(actual).toEqual(expected);
    });

    it('should return getTeamInfoByTeamId', () => {
      // const actual = FantasyBaseballTeamSelector.getTeamInfoByTeamId(null, () => MOCK_BASEBALL_TEAM_1);
      // expect(actual).toThrow();
    });
  });

  it('should return teamListFilterOptions', () => {
    const actual = FantasyBaseballTeamSelector.teamListFilterOptions(MOCK_BASEBALL_TEAM_LIST);
    const expected = MOCK_BASEBALL_TEAM_LIST.map(t => ({ label: t.name, value: t.id }));
    expect(actual).toEqual(expected);
  });

  it('should return the current roster for a given team ID, excluding pitchers', () => {
    const actual = FantasyBaseballTeamSelector.getCurrentRosterByTeamId(teamId, () => mockRosterBatters);
    const expected = MOCK_BASEBALL_PLAYER_BATTER_LIST;
    expect(actual).toEqual(expected);
  });

  it('should return the batters on the roster for a given team ID, excluding pitchers', () => {
    const actual = FantasyBaseballTeamSelector.getTeamBatters(teamId, () => mockRosterBatters);
    const expected = MOCK_BASEBALL_PLAYER_BATTER_LIST;
    expect(actual).toEqual(expected);
  });

  it('should return the batters stats row', () => {
    const actual = FantasyBaseballTeamSelector.getTeamBatterStats(
      MOCK_BASEBALL_PLAYER_BATTER_LIST,
      '2023'
    )(FantasyBaseballScoringPeriod.season('2023'));
    const expected = existsFilter(MOCK_BASEBALL_PLAYER_BATTER_STATS_ROW_LIST);
    expect(actual).toEqual(expected);
  });

  // it('should return the batters on the live roster for a given team ID, excluding pitchers', () => {
  //   const liveBattersSelector = FantasyBaseballTeamSelector.getLiveTeamBatters;
  //   const teamId = '15';
  //   const getLiveTeamById = (id: string) => ({ roster: mockRoster.filter(p => p.teamId === id) });
  //   const expectedLiveBatters = mockRoster.filter(p => p.teamId === teamId && !p.isPitcher);
  //   const result = liveBattersSelector(teamId, getLiveTeamById);
  //   expect(result).toEqual(expectedLiveBatters);
  // });

  it('should return the starting batters on a team', () => {
    const actual = FantasyBaseballTeamSelector.getTeamStartingBatters(mockRosterBatters);
    const expected = [MOCK_BASEBALL_PLAYER_B];
    expect(actual).toEqual(expected);
  });

  it('should return the bench batters on a team', () => {
    const actual = FantasyBaseballTeamSelector.getTeamBenchBatters(mockRosterBatters);
    const expected = [MOCK_BASEBALL_PLAYER_B_1];
    expect(actual).toEqual(expected);
  });

  it('should return all the pitchers on a team', () => {
    const actual = FantasyBaseballTeamSelector.getTeamPitchers(teamId, () => mockRosterPitchers);
    const expected = MOCK_BASEBALL_PLAYER_PITCHER_LIST;
    expect(actual).toEqual(expected);
  });

  it('should return the starting pitchers on a team', () => {
    const actual = FantasyBaseballTeamSelector.getTeamStartingPitchers(mockRosterPitchers);
    const expected = [MOCK_BASEBALL_PLAYER_P];
    expect(actual).toEqual(expected);
  });

  it('should return the bench pitchers on a team', () => {
    const actual = FantasyBaseballTeamSelector.getTeamPitchersBench(mockRosterPitchers);
    const expected = [MOCK_BASEBALL_PLAYER_P_1];
    expect(actual).toEqual(expected);
  });

  it("should return the pitchers' stats on a team", () => {
    const actual = FantasyBaseballTeamSelector.getTeamPitcherStats(
      MOCK_BASEBALL_PLAYER_PITCHER_LIST,
      '2023'
    )(FantasyBaseballScoringPeriod.season('2023'));
    const expected = existsFilter(MOCK_BASEBALL_PLAYER_PITCHER_STATS_ROW_LIST);
    expect(actual).toEqual(expected);
  });
});
