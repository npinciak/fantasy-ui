enum StatTypeId {
    seasonProj,
    last7Days = 1,
    last15Days = 2,
    last30Days = 3,
    //currentYear = 4,?
    live = 5
}

enum TeamColumn {
    rank = 'currentRank',
    name = 'teamName',
    totalPoints = 'totalPoints',
    liveScore = 'liveScore'
}

enum RotoColumn {
    run = 'rotoStats.r',
    homeRun = 'rotoStats.hr',
    rbi = 'rotoStats.rbi',
    sb = 'rotoStats.sb',
    avg = 'rotoStats.avg',
    strikeOut = 'rotoStats.k',
    win = 'rotoStats.w',
    save = 'rotoStats.sv',
    era = 'rotoStats.era',
    whip = 'rotoStats.whip',
    pitchingLimit = 'pitchingLimit',
    battingTotal = 'totalBattingRoto',
    pitchingTotal = 'totalPitchingRoto'
}

enum StatsColumn {
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

export { StatsColumn, RotoColumn, TeamColumn, StatTypeId };
