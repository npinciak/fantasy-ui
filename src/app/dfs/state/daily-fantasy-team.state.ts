import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { PatchTeams } from '../actions/daily-fantasy-teams.actions';

@State({ name: 'dailyFantasyTeams' })
@Injectable()
export class DailyFantasyTeamsState extends GenericState({
  idProperty: 'rgId',
  patchAction: PatchTeams,
}) {}
