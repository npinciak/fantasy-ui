import { EspnClientTeam } from '@app/espn/mlb/interface';

/**
 * Base/Parent Class for all ESPN _fantasy_ teams
 *
 * @description FootballTeam, BaseballTeam classes should _extend_ this class. Ingests EspnClientTeam
 * @constructor EspnClientTeam
 */
export class Team {
  protected _team: EspnClientTeam;

  constructor(team: EspnClientTeam) {
    this._team = team;
  }
}
