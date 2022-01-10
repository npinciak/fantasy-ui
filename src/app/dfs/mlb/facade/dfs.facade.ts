import { Injectable } from '@angular/core';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DfsSite } from '../../dfs.const';
import { CoreDfsSlate, DfsSlate } from '../models/slateMaster.interface';
import { MatchupSelectors } from '../selectors/matchup.selector';
import { MlbPlayerSlateAttrSelectors } from '../selectors/playerSlateAttr.selector';
import { SlateSelectors } from '../selectors/slate.selector';
import { FetchNFLResources, FetchResources } from '../state/dfs-slate.actions';
import { UpdateStatLine } from '../state/mlb-dfs.actions';
import { MlbDfsState } from '../state/mlb-dfs.state';
import { MLBDfsMatchup } from '../models/mlb-matchup.model';
import { MlbDfsPlayer } from '../models/mlb-player.model';

@Injectable({
  providedIn: 'root',
})
export class DfsFacade {
  @Select(SlateSelectors.getSlatesByClassic) public slatesByClassic$: Observable<DfsSlate[]>;

  @Select(MatchupSelectors.selectMLBMatchups) public selectMLBMatchups$: Observable<any>;
  @Select(MatchupSelectors.matchupsEmpty) public matchupsEmpty$: Observable<boolean>;
  @Select(MatchupSelectors.getMatchups) public getMatchups$: Observable<MLBDfsMatchup[]>;
  @Select(MatchupSelectors.selectTeamsInSlate) public selectTeamsInSlate$: Observable<string[]>;
  @Select(MatchupSelectors.totalPointsGraph) public totalPointsGraph$: Observable<any[]>;

  @Select(MlbPlayerSlateAttrSelectors.battersEmpty) public battersEmpty$: Observable<MLBDfsMatchup[]>;
  @Select(MlbPlayerSlateAttrSelectors.pitchersEmpty) public pitchersEmpty$: Observable<MLBDfsMatchup[]>;
  @Select(MlbPlayerSlateAttrSelectors.batters) public batters$: Observable<MlbDfsPlayer[]>;
  @Select(MlbPlayerSlateAttrSelectors.pitchers) public pitchers$: Observable<MlbDfsPlayer[]>;
  @Select(MlbPlayerSlateAttrSelectors.selectStatLine) public statLine$: Observable<string>;

  @SelectSnapshot(MlbDfsState.slateGames) public slateGames: { [id: number]: unknown };
  @SelectSnapshot(MlbDfsState.slateTeams) public slateTeams: any[];

  // @SelectSnapshot(SlateSelectors.selectSlateConfigBySite()) ftest: any[];

  constructor(private store: Store) {}

  fetchNFLResources = (sport: string, site: DfsSite, slate: DfsSlate) => this.store.dispatch(new FetchNFLResources(sport, site, slate));

  getResources = (sport: string, site: DfsSite, slate: CoreDfsSlate) => {
    switch (sport) {
      case 'nfl':
        this.store.dispatch(new FetchNFLResources(sport, site, slate));
        break;
      default:
        this.store.dispatch(new FetchResources(sport, site, slate));
        break;
    }
  };

  updateStatLine = statLine => this.store.dispatch(new UpdateStatLine(statLine));
}
