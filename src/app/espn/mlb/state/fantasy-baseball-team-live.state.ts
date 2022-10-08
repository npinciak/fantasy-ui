import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { BaseballTeamLive } from '../models/baseball-team.model';

export class SetEspnFantasyLeagueTeamsLive {
  static readonly type = '[fantasyBaseballTeamsLive] SetEspnFantasyLeagueTeamsLive';
  constructor(public payload: BaseballTeamLive[]) {}
}

export class ClearAndAddEspnFantasyLeagueTeamsLive {
  static readonly type = '[fantasyBaseballTeamsLive] ClearAndAddEspnFantasyLeagueTeamsLive';
  constructor(public payload: BaseballTeamLive[]) {}
}

@State({ name: 'fantasyBaseballTeamsLive' })
@Injectable()
export class FantasyBaseballTeamsLiveState extends GenericState({
  idProperty: 'id',
  addOrUpdate: SetEspnFantasyLeagueTeamsLive,
  clearAndAdd: ClearAndAddEspnFantasyLeagueTeamsLive,
}) {}
