import { Injectable } from '@angular/core';
import { exists } from '@app/@shared/utilities/exists';
import { Action, State, Store } from '@ngxs/store';
import { SportsBookLeagueSpread } from '../actions/league-spread.actions';
import { LEAGUE_ID } from '../isportgenius-endpoint-builder';
import { SportsBookService } from '../service/sportsbook.service';

@State({ name: SportsBookLeagueSpread.stateName + 'Actionhandler' })
@Injectable()
export class SportsBookLeagueSpreadActionHandler {
  constructor(private client: SportsBookService, private store: Store) {}

  @Action(SportsBookLeagueSpread.Fetch)
  async footballLeague() {
    try {
      const {
        upcoming: { spread },
      } = await this.client.leagueStats(LEAGUE_ID.NBA).toPromise();

      if (!exists(spread)) return;

      this.store.dispatch([new SportsBookLeagueSpread.AddOrUpdate(spread)]);
    } catch (error) {}
  }
}
