import { Injectable } from '@angular/core';
import { RouterSelector } from '@app/@core/store/router/router.selectors';
import { GenericStateModel } from '@app/@shared/generic-state/generic.model';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { SiteSlateEntity } from '@dfsClient/daily-fantasy-client.model';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { ClearAndAddSlates, FetchSlates, name, SetSlates } from '../actions/daily-fantasy-slates.actions';

import { SlateService } from '../service/slate.service';

@State({ name })
@Injectable()
export class DailyFantasySlateState extends GenericState({
  idProperty: 'importId',
  addOrUpdate: SetSlates,
  clearAndAdd: ClearAndAddSlates,
}) {
  constructor(private store: Store, private slateService: SlateService) {
    super();
  }

  @Action(FetchSlates)
  async fetchSlates({}: StateContext<GenericStateModel<SiteSlateEntity>>): Promise<void> {
    const queryParams = this.store.selectSnapshot(RouterSelector.getRouterQueryParams);

    const sport = queryParams?.sport;
    const site = queryParams?.site;

    const map = await this.slateService.slatesByDate({ sport }).toPromise();

    const slates = Object.values(map[site]) as SiteSlateEntity[];

    this.store.dispatch([new ClearAndAddSlates(slates)]);
  }
}
