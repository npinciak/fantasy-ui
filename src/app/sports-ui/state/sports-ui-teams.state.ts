import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { SportsUiTeams } from '../actions/sports-ui-teams.actions';

@State({ name: SportsUiTeams.stateName })
@Injectable()
export class SportsUiTeamsState extends GenericState({
  idProperty: 'team_id',
  actionHandler: SportsUiTeams,
}) {}
