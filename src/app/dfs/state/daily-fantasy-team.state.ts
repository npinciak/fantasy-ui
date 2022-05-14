import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { Team } from '../models/team.model';

export class PatchTeams {
  static readonly type = `[dailyFantasyTeams] PatchTeams`;
  constructor(public payload: Team[]) {}
}

@Injectable()
export class DailyFantasyTeamsState extends GenericState({
  name: 'dailyFantasyTeams',
  idProperty: 'id', //rgId
  patchAction: PatchTeams,
}) {}
