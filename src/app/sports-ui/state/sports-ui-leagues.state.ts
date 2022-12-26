import { Injectable } from '@angular/core';
import { GenericStateClass } from '@app/@shared/generic-state/generic.model';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { SportsUiLeagues } from '../../sports-ui/actions/sports-ui-leagues.actions';
import { SportsUiLeagueForm } from '../actions/sports-ui-league-form.actions';
import { SportsUiClientLeague } from '../models/sports-ui-league.model';
import { SportsUiLeagueFormSelectors } from '../selectors/sports-ui-league-form.selectors';
import { LeaguesClientService } from '../service/leagues-client.service';

@State({ name: SportsUiLeagues.name })
@Injectable()
export class SportsUiLeaguesState extends GenericState({
  idProperty: 'leagueId',
  addOrUpdate: SportsUiLeagues.SetLeagues,
  clearAndAdd: SportsUiLeagues.ClearAndAddLeagues,
}) {
  constructor(private leagueClientService: LeaguesClientService, private store: Store) {
    super();
  }

  @Action(SportsUiLeagues.FetchLeagues)
  async fetchEspnLeagues({ dispatch }: StateContext<GenericStateClass<SportsUiClientLeague>>): Promise<void> {
    const leagues = await this.leagueClientService.getAll();
    dispatch([new SportsUiLeagues.ClearAndAddLeagues(leagues)]);
  }

  @Action(SportsUiLeagues.DeleteLeague)
  async deleteEspnLeague(
    { dispatch }: StateContext<GenericStateClass<SportsUiClientLeague>>,
    { payload: { leagueId } }: SportsUiLeagues.DeleteLeague
  ): Promise<void> {
    try {
      await this.leagueClientService.delete(leagueId);
    } catch (error) {}
    dispatch([new SportsUiLeagues.FetchLeagues()]);
  }

  @Action(SportsUiLeagues.CreateLeague)
  async create() {
    const { leagueSport, leagueId, leagueYear } = this.store.selectSnapshot(SportsUiLeagueFormSelectors.getForm);

    if (leagueId && leagueSport && leagueYear) {
      await this.leagueClientService.create({ leagueSport, leagueId, leagueYear, leagueName: leagueSport });
      this.store.dispatch([new SportsUiLeagues.FetchLeagues(), new SportsUiLeagueForm.Reset()]);
    }
  }

  @Action(SportsUiLeagues.VerifyLeagues)
  async verify() {
    const { leagueSport, leagueId, leagueYear } = this.store.selectSnapshot(SportsUiLeagueFormSelectors.getForm);

    if (leagueId && leagueSport && leagueYear) {
      try {
        const data = await this.api.verifyLeague({ leagueId, leagueSport, leagueYear }).toPromise();
        const leagueName = data.leagueName;

        this.store.dispatch([new SportsUiLeagueForm.SetLeagueNameValue({ leagueName }), new SportsUiLeagues.CreateLeague()]);
      } catch (er) {
        console.error(er);
      }
    }
  }
}
