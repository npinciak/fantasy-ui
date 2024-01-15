import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import { FantasyFootballPlayerCard } from '../actions/fantasy-football-player-card.actions';

@State({ name: FantasyFootballPlayerCard.stateName + 'ActionHandler' })
@Injectable()
export class FantasyBaseballPlayerCardActionHandler {}
