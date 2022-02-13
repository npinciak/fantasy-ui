export enum TeamColumn {
  rank = 'currentRank',
  name = 'name',
  totalPoints = 'totalPoints',
  liveScore = 'liveScore',
}

export enum PlayingStatus {
  Probable = 'PROBABLE',
  NotStarting = 'NOTSTARTING',
  Starting = 'STARTING',
  Active = 'ACTIVE',
}

export enum RotoColumn {
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
  pitchingTotal = 'totalPitchingRoto',
}

export enum StatsColumn {
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
  whip = 'stats.whip',
}
