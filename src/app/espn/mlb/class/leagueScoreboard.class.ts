/* eslint-disable @typescript-eslint/prefer-for-of */
import { EspnClientScheduleTeams } from '../interface/league';

export class LeagueScoreboard {
  private _teams: EspnClientScheduleTeams[] = [];
  private _scoreboard = {};

  constructor(scheduleTeams: EspnClientScheduleTeams[]) {
    this._teams = scheduleTeams;
    this.createScoreboard();
  }

  get scoreBoard() {
    return this._scoreboard;
  }

  private createScoreboard() {
    const final = {};
    for (let i = 0; i < this._teams.length; i++) {
      const team = this._teams[i];
      final[team.teamId] = team.totalPointsLive;
    }

    this._scoreboard = final;
  }
}
