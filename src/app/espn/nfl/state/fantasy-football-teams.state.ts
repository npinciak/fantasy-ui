import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { FantasyFootballTeams } from '../actions/fantasy-football-teams.actions';

@State({ name: FantasyFootballTeams.stateName })
@Injectable()
export class FantasyFootballTeamState extends GenericState({
  idProperty: 'id',
  actionHandler: FantasyFootballTeams,
}) {}
