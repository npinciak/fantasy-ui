import { Game } from 'src/app/modules/espn/models/mlb/class/game.class';
import { LeagueScoreboard } from 'src/app/modules/espn/models/mlb/class/leagueScoreboard.class';
import { BaseballPlayer } from 'src/app/modules/espn/models/mlb/class/player.class';
import { BaseballTeam } from 'src/app/modules/espn/models/mlb/class/team.class';
import { Player, Team, Event } from 'src/app/modules/espn/models/mlb/interface';
import { ScheduleEntry } from 'src/app/modules/espn/models/mlb/interface/league';



const teamMap = (teams: Team[], entries: ScheduleEntry[]): Map<number, BaseballTeam> => {
    if (teams.length === 0 || entries.length === 0) {
        return new Map();
    }

    const leagueScoreboard = new LeagueScoreboard(entries[0].teams);

    const liveScores = leagueScoreboard.scoreBoard;
    const newMap = new Map<number, BaseballTeam>();

    teams.map(team => {
        const newTeam = new BaseballTeam(team);
        newTeam.roster = team.roster.entries;
        if (liveScores.has(team.id)) {
            newTeam.liveScore = liveScores.get(team.id);
        }
        newMap.set(newTeam.teamId, newTeam);
    });

    return newMap;

};

const gameMap = (competitions: Event[]) => {
    const compMap = new Map<number, Game>();
    for (const comp of competitions) {
        const competition = new Game();

        competition.id = comp.id;
        competition.competitors = comp.competitors;
        competition.summary = comp.summary;

        compMap.set(competition.gameId, competition);
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

export { teamMap, gameMap, rosterMap };
