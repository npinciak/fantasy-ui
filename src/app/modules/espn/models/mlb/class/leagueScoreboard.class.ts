import { ScheduleTeams } from '../interface/league';

export class LeagueScoreboard {
    private _teams: ScheduleTeams[] = [];

    constructor(scheduleTeams: ScheduleTeams[]) {
        for (const team of scheduleTeams) {
            this._teams.push(team);
        }
    }

    get scoreBoard() {
        return this._scoreboard;
    }

    private get _scoreboard() {
        const final = new Map<number, number>();
        this._teams.map(team => final.set(team.teamId, team.totalPointsLive));
        return final;
    }

}
