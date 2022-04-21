import { Injectable } from '@angular/core';
import { EspnFantasyBaseState } from '@app/espn/state/espn-fantasy-base.state';
import { BaseballTeamLive } from '../models/baseball-team.model';

export class SetEspnFantasyLeagueTeamsLive {
  static readonly type = '[fantasyBaseballTeamsLive] SetEspnFantasyLeagueTeamsLive';
  constructor(public payload: { teams: BaseballTeamLive[] }) {}
}

@Injectable()
export class FantasyBaseballTeamsLiveState extends EspnFantasyBaseState<BaseballTeamLive>({
  name: 'fantasyBaseballTeamsLive',
  setEntities: SetEspnFantasyLeagueTeamsLive,
}) {}
