import { Injectable } from '@angular/core';
import { GenericStateModel } from '@app/@shared/generic-state/generic.model';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { ClientSlateTypes, SiteSlateEntity } from '@dfsClient/daily-fantasy-client.model';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { DfsSlatePlayers } from '../actions/dfs-players.actions';
import { DfsSlateAttributes } from '../actions/dfs-slate-attr.actions';
import { DfsSlates } from '../actions/dfs-slates.actions';

import { SlateService } from '../service/slate.service';

@State({ name: DfsSlates.stateName })
@Injectable()
export class DfsSlatesState extends GenericState({
  idProperty: 'importId',
  addOrUpdate: DfsSlates.AddOrUpdate,
  clearAndAdd: DfsSlates.ClearAndAdd,
}) {
  constructor(private store: Store, private slateService: SlateService) {
    super();
  }

  @Action(DfsSlates.Fetch)
  async fetchSlates(
    {}: StateContext<GenericStateModel<SiteSlateEntity>>,
    { payload }: { payload: { sport: string; site: string } }
  ): Promise<void> {
    const { sport, site } = payload;

    const map = await this.slateService.slatesByDate({ sport }).toPromise();

    const slates = Object.values(map[site]) as SiteSlateEntity[];

    await this.store.dispatch([new DfsSlates.ClearAndAdd(slates)]).toPromise();

    if (slates.length > 0) {
      const filteredSlates = slates.filter(s => s.type === ClientSlateTypes.Classic);

      if (filteredSlates.length > 0) {
        const slate = filteredSlates[0].importId; // grab 1st one by default
        const slatePath = filteredSlates[0].slate_path;

        this.store.dispatch([new DfsSlatePlayers.Fetch({ slatePath }), new DfsSlateAttributes.Fetch({ slate })]);
      }
    }
  }
}
