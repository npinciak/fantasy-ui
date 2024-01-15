import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { FantasyFootballPlayerCard } from '../actions/fantasy-football-player-card.actions';

@State({ name: FantasyFootballPlayerCard.stateName })
@Injectable()
export class FantasyFootballPlayerCardState extends GenericState({
  idProperty: 'id',
  actionHandler: FantasyFootballPlayerCard,
}) {}
