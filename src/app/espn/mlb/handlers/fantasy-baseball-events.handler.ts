import { Injectable } from '@angular/core';
import { Action, State } from '@ngxs/store';
import { FantasyBaseballEvents } from '../actions/fantasy-baseball-events.actions';
import { FantasyBaseballEventsFacade } from '../facade/fantasy-baseball-events.facade';
import { FantasyBaseballService } from '../services/fantasy-baseball.service';

@State({ name: FantasyBaseballEvents.stateName + 'ActionHandler' })
@Injectable()
export class FantasyBaseballEventsActionHandler {
  constructor(private mlbService: FantasyBaseballService, private fantasyBaseballEventsFacade: FantasyBaseballEventsFacade) {}

  @Action(FantasyBaseballEvents.Fetch)
  async fetchBaseballEvents(): Promise<void> {
    const events = await this.mlbService.baseballEvents().toPromise();
    this.fantasyBaseballEventsFacade.addOrUpdate(events);
  }
}
