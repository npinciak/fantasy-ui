import { TestBed, waitForAsync } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { MOCK_DFS_TEAM_LIST, MOCK_DFS_TEAM_MAP } from '../models/team.model.mock';
import { DailyFantasyTeamsState, PatchTeams } from './daily-fantasy-team.state';

describe('[dailyFantasyTeams] Store', () => {
  let store: Store;

  const teams = MOCK_DFS_TEAM_LIST;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgxsModule.forRoot([DailyFantasyTeamsState])],
      }).compileComponents();

      store = TestBed.inject(Store);
    })
  );

  afterEach(() => {});

  describe('@Action PatchTeams', () => {
    it('should create an action and patch teams', () => {
      const expected = MOCK_DFS_TEAM_MAP;
      store.dispatch(new PatchTeams({ teams }));
      const actual = store.selectSnapshot(DailyFantasyTeamsState.getMap);
      expect(actual).toEqual(expected);
    });
  });
});
