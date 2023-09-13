import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { FantasyFootballTeam } from '../actions/fantasy-football-team.actions';

@State({ name: FantasyFootballTeam.stateName })
@Injectable()
export class FantasyFootballTeamState extends GenericState({
  idProperty: 'id',
  actionHandler: FantasyFootballTeam,
}) {}
