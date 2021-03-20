import { Team } from './league.class';
import { mockMLBPlayer } from './mlb-player.mock';

export const mockMLBTeam: Team = {
    abbrev: 'ROCK',
    currentProjectedRank: 0,
    // divisionId: 0,
    draftDayProjectedRank: 10,
    // draftStrategy: {},
    id: 10,
    // isActive: false,
    location: 'Rocky\'s',
    logo: 'https://g.espncdn.com/lm-static/logo-packs/flb/Letter-and-Number-Caps-ESPN/capsR.svg',
    // logoType: 'VECTOR',
    nickname: 'Rockers',
    // owners: [
    //     '{5161CD25-A3CF-11D1-B570-00A0C9111034}'
    // ],
    // playoffSeed: 1,
    points: 55,
    // pointsAdjusted: 0,
    pointsByStat: {
        0: 0,
        1: 0,
        2: 5.5,
        5: 5.5,
        20: 5.5,
        21: 5.5,
        23: 5.5,
        33: 0,
        34: 0,
        37: 0,
        39: 0,
        41: 5.5,
        45: 0,
        47: 5.5,
        48: 5.5,
        53: 5.5,
        57: 5.5
    },
    // pointsDelta: 55,
    // primaryOwner: '{5161CD25-A3CF-11D1-B570-00A0C9111034}',
    rankCalculatedFinal: 1,
    // rankFinal: 0,
    // record: {
    //     away: {
    //         gamesBack: 0,
    //         losses: 0,
    //         percentage: 0,
    //         pointsAgainst: 0,
    //         pointsFor: 0,
    //         streakLength: 0,
    //         streakType: 'NONE',
    //         ties: 0,
    //         wins: 0
    //     },
    //     division: {
    //         gamesBack: 0,
    //         losses: 0,
    //         percentage: 0,
    //         pointsAgainst: 0,
    //         pointsFor: 0,
    //         streakLength: 0,
    //         streakType: 'NONE',
    //         ties: 0,
    //         wins: 0
    //     },
    //     home: {
    //         gamesBack: 0,
    //         losses: 0,
    //         percentage: 0,
    //         pointsAgainst: 0,
    //         pointsFor: 0,
    //         streakLength: 0,
    //         streakType: 'NONE',
    //         ties: 0,
    //         wins: 0
    //     },
    //     overall: {
    //         gamesBack: 0,
    //         losses: 0,
    //         percentage: 0,
    //         pointsAgainst: 0,
    //         pointsFor: 0,
    //         streakLength: 0,
    //         streakType: 'NONE',
    //         ties: 0,
    //         wins: 0
    //     }
    // },
    roster: {
        entries: [
            mockMLBPlayer
        ],
    },
    valuesByStat: {
        0: 0,
        1: 0,
        2: 0,
        5: 0,
        20: 0,
        21: 0,
        23: 0,
        33: 0,
        34: 0,
        37: 0,
        39: 0,
        41: null,
        45: 0,
        47: null,
        48: 0,
        53: 0,
        57: 0
    }
    // waiverRank: 2
};
