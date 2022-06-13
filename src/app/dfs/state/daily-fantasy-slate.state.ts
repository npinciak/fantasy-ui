import { Injectable } from '@angular/core';
import { GenericStateModel } from '@app/@shared/generic-state/generic.model';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { Action, State, StateContext } from '@ngxs/store';
import { FetchSlates, Set, Slates } from '../actions/daily-fantasy-slates.actions';
import { SiteSlateEntity } from '../models/daily-fantasy-client.model';
import { SlateService } from '../service/slate.service';

@State({ name: 'dailyFantasySlates' })
@Injectable()
export class DailyFantasySlateState extends GenericState({ idProperty: 'importId', addOrUpdate: Set\Slates }) {
  constructor(private slateService: SlateService) {
    super();
  }

  @Action(FetchSlates)
  async fetchSlates(
    { dispatch }: StateContext<GenericStateModel<SiteSlateEntity>>,
    { payload: { site, sport } }: FetchSlates
  ): Promise<void> {
    const map = await this.slateService.slatesByDate({ sport }).toPromise();

    const slates = Object.values(map[site]) as SiteSlateEntity[];

    dispatch([new Set\Slates(slates)]);
  }
}
