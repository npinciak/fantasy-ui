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

  get teamId() {
    return this._team.id;
  }

  get teamName() {
    return `${this._team.location} ${this._team.nickname}`;
  }

  get teamAbbrev() {
    return this._team.abbrev;
  }

  get teamLogo() {
    return this._team.logo;
  }

  get roster() {
    return this._team.roster.entries;
  }

  get totalPoints() {
    return this._team.points;
  }

  get currentRank() {
    return this._team.playoffSeed;
  }

  get rankDiff() {
    return this._team.draftDayProjectedRank - this._team.playoffSeed;
  }
}
