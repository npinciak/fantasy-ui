import { Injectable } from '@angular/core';
import { GenericStateModel } from '@app/@shared/generic-state/generic.model';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { SiteSlateEntity } from '@dfsClient/daily-fantasy-client.model';
import { Action, State, StateContext } from '@ngxs/store';
import { ClearAndAddSlates, FetchSlates, SetSlates } from '../actions/daily-fantasy-slates.actions';
import { SlateService } from '../service/slate.service';

@State({ name: 'dailyFantasySlates' })
@Injectable()
export class DailyFantasySlateState extends GenericState({
  idProperty: 'importId',
  addOrUpdate: SetSlates,
  clearAndAdd: ClearAndAddSlates,
}) {
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

    dispatch([new ClearAndAddSlates(slates)]);
  }
}
