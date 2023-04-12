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
  actionHandler: DfsSlates,
}) {
  constructor(private store: Store, private slateService: SlateService) {
    super();
  }

  @Action(DfsSlates.Fetch)
  async fetchSlates(
    _: StateContext<GenericStateModel<SiteSlateEntity>>,
    { payload }: { payload: { sport: string; site: string } }
  ): Promise<void> {
    const { sport, site } = payload;

    const map = await this.slateService.slatesByDate({ sport }).toPromise();

    const slates = Object.values(map[site]) as SiteSlateEntity[];

    await this.store.dispatch([new DfsSlates.AddOrUpdate(slates)]).toPromise();

    if (slates.length <= 0) return;

    const filteredClassicSlates = slates.filter(s => s.type === ClientSlateTypes.Classic);
    const filteredShowdownSlates = slates.filter(s => s.type === ClientSlateTypes.Showdown);

    const filteredClassicSlatesExist = filteredClassicSlates.length > 0;
    const slate = filteredClassicSlatesExist ? filteredClassicSlates[0].importId : filteredShowdownSlates[0].importId;
    const slatePath = filteredClassicSlatesExist ? filteredClassicSlates[0].slate_path : filteredShowdownSlates[0].slate_path;

    this.store.dispatch([new DfsSlatePlayers.Fetch({ slatePath }), new DfsSlateAttributes.Fetch({ slate })]);
  }
}
