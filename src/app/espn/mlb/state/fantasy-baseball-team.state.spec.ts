import { TestBed, waitForAsync } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { MOCK_BASEBALL_TEAM_1 } from '../models/baseball-team.model.mock';
import { FantasyBaseballTeamState, PatchFantasyBaseballTeams } from './fantasy-baseball-team.state';
import { MOCK_TEAM_STATE } from './fantasy-baseball-team.state.mock';

describe('[fantasyBaseballTeams] Store', () => {
  let store: Store;

  const teams = [MOCK_BASEBALL_TEAM_1];

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgxsModule.forRoot([FantasyBaseballTeamState])],
      }).compileComponents();

      store = TestBed.inject(Store);
    })
  );

  describe('@Action PatchFantasyBaseballTeams', () => {
    it('should create an action and patch baseball teams', () => {
      const expected = MOCK_TEAM_STATE;

      store.dispatch(new PatchFantasyBaseballTeams({ teams }));

      const actual = store.selectSnapshot(FantasyBaseballTeamState.map);
      expect(actual).toEqual(expected.map);
    });
  });
});
