import { Injectable } from '@angular/core';
import { Action, State } from '@ngxs/store';
import { firstValueFrom } from 'rxjs';
import { FantasyFootballEvents } from '../actions/fantasy-football-events.actions';
import { FantasyFootballEventsFacade } from '../facade/fantasy-football-events.facade';
import { FantasyFootballService } from '../services/fantasy-football.service';

@State({ name: FantasyFootballEvents.stateName + 'ActionHandler' })
@Injectable()
export class FantasyFootballEventsActionHandler {
  constructor(private fantasyFootballService: FantasyFootballService, private fantasyFootballEventsFacade: FantasyFootballEventsFacade) {}

  @Action(FantasyFootballEvents.Fetch)
  async fetchFootballEvents(): Promise<void> {
    const events = await firstValueFrom(this.fantasyFootballService.footballEvents());
    this.fantasyFootballEventsFacade.addOrUpdate(events);
  }
}
