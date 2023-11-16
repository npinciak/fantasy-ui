import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { FantasyBaseballPlayerCard } from '../actions/fantasy-baseball-player-card.actions';

@State({ name: FantasyBaseballPlayerCard.stateName })
@Injectable()
export class FantasyBaseballPlayerCardState extends GenericState({
  idProperty: 'id',
  actionHandler: FantasyBaseballPlayerCard,
}) {}
