import { Injectable } from '@angular/core';
import { GenericStateClass } from '@app/@shared/generic-state/generic.model';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { SportsUiLeagues } from '../../sports-ui/actions/sports-ui-leagues.actions';
import { SportsUiClientLeague } from '../models/sports-ui-league.model';
import { LeaguesClientService } from '../service/leagues-client.service';

@State({ name: SportsUiLeagues.stateName })
@Injectable()
export class SportsUiLeaguesState extends GenericState({
  idProperty: 'leagueId',
  actionHandler: SportsUiLeagues,
}) {
  constructor(private leagueClientService: LeaguesClientService, private store: Store) {
    super();
  }

  @Action(SportsUiLeagues.DeleteLeague)
  async deleteUserLeague(_: StateContext<GenericStateClass<SportsUiClientLeague>>, { payload: { leagueId } }): Promise<void> {
    try {
      // await this.leagueClientService.delete(leagueId);
    } catch (error) {}
    this.store.dispatch([new SportsUiLeagues.Fetch()]);
  }

  @Action(SportsUiLeagues.VerifyLeagues)
  async verify() {
    // const { leagueSport, leagueId, leagueYear } = this.store.selectSnapshot(SportsUiLeagueFormSelectors.getForm);
    // if (leagueId && leagueSport && leagueYear) {
    //   try {
    //     const data = await this.api.verifyLeague({ leagueId, leagueSport, leagueYear }).toPromise();
    //     const leagueName = data.leagueName;
    //     this.store.dispatch([new SportsUiLeagueForm.SetLeagueNameValue({ leagueName }), new SportsUiLeagues.CreateLeague()]);
    //   } catch (er) {
    //     console.error(er);
    //   }
    // }
  }
}
