import { ScheduleTeams } from '../interface/league';

export class LeagueScoreboard {
    private _teams: ScheduleTeams[];

    constructor() { }

    get scoreBoard() {
        const final = new Map<number, number>();
        this._teams.map(team => final.set(team.teamId, team.totalPointsLive));
        return final;
    }

    set teams(scheduleTeams: ScheduleTeams[]) {
        this._teams = scheduleTeams;
    }

}
