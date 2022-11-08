import { Injectable } from '@angular/core';
import { GenericStateModel } from '@app/@shared/generic-state/generic.model';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { ClientSlateTypes, SiteSlateEntity } from '@dfsClient/daily-fantasy-client.model';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { FetchPlayers } from '../actions/daily-fantasy-players.actions';
import { ClearAndAddSlates, FetchSlates, name, SetSlates } from '../actions/daily-fantasy-slates.actions';

import { SlateService } from '../service/slate.service';
import { FetchSlateAttr } from './daily-fantasy-slate-attr.state';

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
  async fetchSlates({}: StateContext<GenericStateModel<SiteSlateEntity>>, { payload: { site, sport } }: FetchSlates): Promise<void> {
    const map = await this.slateService.slatesByDate({ sport }).toPromise();

    const slates = Object.values(map[site]) as SiteSlateEntity[];

    await this.store.dispatch([new ClearAndAddSlates(slates)]).toPromise();

    if (slates.length > 0) {
      const filteredSlates = slates.filter(s => s.type === ClientSlateTypes.Classic);

      if (filteredSlates.length > 0) {
        const slate = filteredSlates[0].importId; // grab 1st one by default
        const slatePath = filteredSlates[0].slate_path;

        this.store.dispatch([new FetchPlayers({ slatePath }), new FetchSlateAttr({ slate })]);
      }
    }
  }
}
