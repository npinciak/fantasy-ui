import { Injectable } from '@angular/core';
import { GenericState, GenericStateClass } from '@app/@shared/generic-state/generic.state';
import { SchemeHeaderExpertService } from '@app/sports-ui/service/scheme-header-expert.service';
import { Action, State, StateContext } from '@ngxs/store';
import { SportsUiLeagues } from '../../sports-ui/actions/sports-ui-leagues.actions';
import { SportsUiClientLeague } from '../models/sports-ui-league.model';

@State({ name: SportsUiLeagues.name })
@Injectable()
export class SportsUiLeaguesState extends GenericState({
  idProperty: 'leagueId',
  addOrUpdate: SportsUiLeagues.SetLeagues,
  clearAndAdd: SportsUiLeagues.ClearAndAddLeagues,
}) {
  constructor(private apiService: SchemeHeaderExpertService) {
    super();
  }

  @Action(SportsUiLeagues.FetchLeagues)
  async fetchEspnLeagues({ dispatch }: StateContext<GenericStateClass<SportsUiClientLeague>>): Promise<void> {
    const leagues = await this.apiService.getLeagues().toPromise();
    dispatch([new SportsUiLeagues.ClearAndAddLeagues(leagues)]);
  }

  @Action(SportsUiLeagues.DeleteLeague)
  async deleteEspnLeague(
    { dispatch }: StateContext<GenericStateClass<SportsUiClientLeague>>,
    { payload: { leagueId } }: SportsUiLeagues.DeleteLeague
  ): Promise<void> {
    try {
      await this.apiService.deleteLeague({ leagueId }).toPromise();
    } catch (error) {}
    dispatch([new SportsUiLeagues.FetchLeagues()]);
  }
}
