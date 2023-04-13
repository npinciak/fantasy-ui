import { Injectable } from '@angular/core';
import { Action, State } from '@ngxs/store';
import { FangraphsConstants } from './fangraphs-const.actions';
import { FangraphsConstantsFacade } from './fangraphs-const.facade';
import { FangraphsService } from './fangraphs.service';

@State({ name: FangraphsConstants.stateName + 'Actionhandler' })
@Injectable()
export class FangraphsConstantsActionHandler {
  constructor(private fangraphsService: FangraphsService, private fangraphsConstantsFacade: FangraphsConstantsFacade) {}

  @Action(FangraphsConstants.Fetch)
  async fetchFangraphsConstants() {
    const seasonConstants = await this.fangraphsService.getFangraphsConstantsBySeason(2023);
    this.fangraphsConstantsFacade.addOrUpdate(seasonConstants);
  }
}
