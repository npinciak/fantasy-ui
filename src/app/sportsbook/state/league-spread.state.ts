import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { exists } from '@app/@shared/utilities/utilities.m';
import { Action, State, Store } from '@ngxs/store';
import { SportsBookLeagueSpread } from '../actions/league-spread.actions';
import { LEAGUE_ID } from '../isportgenius-endpoint-builder';
import { SportsBookService } from '../service/sportsbook.service';

@State({ name: SportsBookLeagueSpread.stateName })
@Injectable()
export class SportsBookLeagueSpreadState extends GenericState({ idProperty: 'team', actionHandler: SportsBookLeagueSpread }) {
  constructor(private client: SportsBookService, private store: Store) {
    super();
  }

  @Action(SportsBookLeagueSpread.Fetch)
  async footballLeague() {
    try {
      const {
        upcoming: { spread },
      } = await this.client.leagueStats(LEAGUE_ID.NBA).toPromise();

      if (!exists(spread)) {
        console.log('spread value:', spread);
        return;
      }

      this.store.dispatch([new SportsBookLeagueSpread.AddOrUpdate(spread)]);
    } catch (error) {}
  }
}
