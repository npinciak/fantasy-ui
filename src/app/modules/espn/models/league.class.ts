export class League {
    private teams: any[];
    private leagueId: number;

    constructor(leagueId: number, teams: any[]) {
        this.leagueId = leagueId;
        this.teams = teams;
    }

    getTeams = () => this.teams;
    getLeagueId = () => this.leagueId;
}
