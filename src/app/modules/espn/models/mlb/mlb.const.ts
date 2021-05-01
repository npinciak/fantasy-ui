import { SeasonConst } from './interface/adv.stats';
import { RotoColumn, StatsColumn, TeamColumn } from './mlb.enums';

const weights2020: SeasonConst = {
    wBB: 0.699,
    wHBP: 0.728,
    w1B: 0.883,
    w2B: 1.238,
    w3B: 1.558,
    wHR: 1.979,
};

const weights2021: SeasonConst = {
    wBB: 0.711,
    wHBP: 0.742,
    w1B: 0.901,
    w2B: 1.269,
    w3B: 1.600,
    wHR: 2.035,
    cFIP: 3.073
};

const standingsColumns = [
    TeamColumn.rank,
    TeamColumn.name,
    RotoColumn.run,
    RotoColumn.homeRun,
    RotoColumn.rbi,
    RotoColumn.sb,
    RotoColumn.avg,
    RotoColumn.battingTotal,
    RotoColumn.pitchingLimit,
    RotoColumn.pitchingTotal,

    // RotoColumn.strikeOut,
    // RotoColumn.win,
    // RotoColumn.save,
    // RotoColumn.era,
    // RotoColumn.whip,
    // TeamColumn.totalPoints,
    // TeamColumn.liveScore
];



const battingStatsColumns = [
    TeamColumn.rank,
    TeamColumn.name,
    StatsColumn.hits,
    StatsColumn.run,
    StatsColumn.homeRun,
    StatsColumn.rbi,
    StatsColumn.sb,
    StatsColumn.avg
];

const pitchingStatsColumns = [
    TeamColumn.rank,
    TeamColumn.name,
    StatsColumn.win,
    StatsColumn.strikeOut,
    StatsColumn.whip
];

enum StatsColumnroste5r {
    hits = 'stats.h',
    run = 'stats.r',
    homeRun = 'stats.hr',
    rbi = 'stats.rbi',
    sb = 'stats.sb',
    avg = 'stats.avg',
    strikeOut = 'stats.k',
    win = 'stats.w',
    save = 'stats.sv',
    era = 'stats.era',
    whip = 'stats.whip'
}

const rosterColumns = {
    batters: {
        season: [

        ],
        l7: [
            StatsColumn.hits,
            StatsColumn.run,
            StatsColumn.homeRun,
            StatsColumn.rbi,
            StatsColumn.sb,
            StatsColumn.avg
        ],
        l15: [
            StatsColumn.hits,
            StatsColumn.run,
            StatsColumn.homeRun,
            StatsColumn.rbi,
            StatsColumn.sb,
            StatsColumn.avg
        ],
        l30: [
            StatsColumn.hits,
            StatsColumn.run,
            StatsColumn.homeRun,
            StatsColumn.rbi,
            StatsColumn.sb,
            StatsColumn.avg
        ]
    },
    pitchers: [

    ]
};

export { rosterColumns, battingStatsColumns, pitchingStatsColumns, standingsColumns, weights2020, weights2021 };
