import { TeamState } from '@app/modules/espn/store/mlb';
import { CurrentConditions } from '@app/modules/weather/weather/models/class';
import { WeatherValues } from '@app/modules/weather/weather/models/interface/currentWeather.interface';
import { Game } from 'src/app/modules/espn/models/mlb/class/game.class';
import { LeagueScoreboard } from 'src/app/modules/espn/models/mlb/class/leagueScoreboard.class';
import { BaseballPlayer } from 'src/app/modules/espn/models/mlb/class/player.class';
import { BaseballTeam } from 'src/app/modules/espn/models/mlb/class/team.class';
import { Player, Team, EspnEvent } from 'src/app/modules/espn/models/mlb/interface';
import { ScheduleEntry } from 'src/app/modules/espn/models/mlb/interface/league';


const newTeamMap = (entities: TeamState, entries?: ScheduleEntry[]): { [id: number]: BaseballTeam } => {
    const finalMap = {};

    const entityLength = Object.values(entities).length;

    if (entityLength === 0 || entries.length === 0) {
        return finalMap;
    } else {

        const leagueScoreboard = new LeagueScoreboard(entries[0].teams);
        const liveScores = leagueScoreboard.scoreBoard;

        for (const team of Object.values(entities)) {

            const newTeam = new BaseballTeam(team);
            newTeam.roster = team.roster.entries;

            if (liveScores.hasOwnProperty(team.id)) {
                newTeam.liveScore = liveScores[team.id];
            } else {
                newTeam.liveScore = 0;
            }
            finalMap[newTeam.teamId] = newTeam;
        }
        return finalMap;

    }

};

const teamMap = (teams: Team[], entries: ScheduleEntry[]): Map<number, BaseballTeam> => {
    if (teams.length === 0 || entries.length === 0) {
        return new Map();
    }

    const leagueScoreboard = new LeagueScoreboard(entries[0].teams);

    // const liveScores = leagueScoreboard.scoreBoard;
    const newMap = new Map<number, BaseballTeam>();

    teams.map(team => {
        const newTeam = new BaseballTeam(team);
        newTeam.roster = team.roster.entries;
        // if (liveScores.has(team.id)) {
        //     newTeam.liveScore = liveScores.get(team.id);
        // }
        newMap.set(newTeam.teamId, newTeam);
    });

    return newMap;

};

const gameMap = (competitions: { [id: number]: EspnEvent }) => {
    if (Object.values(competitions).length === 0) {
        return {};
    }
    const compMap: { [id: number]: Game } = {};
    for (const comp of Object.values(competitions)) {
        const competition = new Game(comp);

        competition.competitors = comp.competitors;

        compMap[competition.gameId] = competition;
    }
    return compMap;
};

const rosterMap = (roster: Player[]): Map<number, BaseballPlayer> => {
    if (roster.length === 0) {
        return new Map();
    }

    const playerMap = new Map<number, BaseballPlayer>();
    roster.forEach(player => {

        const baseballPlayer = new BaseballPlayer(player);

        baseballPlayer.ownership = player.playerPoolEntry.player.ownership;
        baseballPlayer.ratings = player.playerPoolEntry.ratings;
        baseballPlayer.eligibleSlots = player.playerPoolEntry.player.eligibleSlots;
        baseballPlayer.gameStatus = player.playerPoolEntry.player.starterStatusByProGame;

        playerMap.set(player.playerId, baseballPlayer);

    });

    return playerMap;
};

const stadiumConditionsMap = (conditions: { [id: number]: WeatherValues }) => {
    if (Object.values(conditions).length === 0) {
        return {};
    }

    const conditionsMap: { [id: number]: CurrentConditions } = {};

    for (const [key, val] of Object.entries(conditions)) {
        conditionsMap[key] = new CurrentConditions(val);
    }

    return conditionsMap;
};

export { newTeamMap, teamMap, gameMap, rosterMap, stadiumConditionsMap };
