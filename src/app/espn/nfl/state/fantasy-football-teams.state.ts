import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { ClearAndAddFantasyFootballTeams, SetFantasyFootballTeams } from '../actions/fantasy-football-teams.actions';

@State({ name: 'fantasyFootballTeams' })
@Injectable()
export class FantasyFootballTeamState extends GenericState({
  idProperty: 'id',
  addOrUpdate: SetFantasyFootballTeams,
  clearAndAdd: ClearAndAddFantasyFootballTeams,
}) {}
