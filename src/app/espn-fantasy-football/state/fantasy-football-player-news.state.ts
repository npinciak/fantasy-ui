import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { FantasyFootballPlayerNews } from '../actions/fantasy-football-player-news.actions';

@State({ name: FantasyFootballPlayerNews.stateName })
@Injectable()
export class FantasyFootballPlayerNewsState extends GenericState({
  idProperty: 'id',
  actionHandler: FantasyFootballPlayerNews,
}) {}
