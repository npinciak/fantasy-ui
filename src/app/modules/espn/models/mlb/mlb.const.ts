import { SeasonConst } from './interface/adv.stats';
import { MLBTeam, RotoColumn, StatsColumn, TeamColumn } from './mlb.enums';

const domeStadiums = [
  MLBTeam.Tor,
  MLBTeam.Ari,
  MLBTeam.TB,
  MLBTeam.Min,
  MLBTeam.Hou,
  MLBTeam.Mia,
  MLBTeam.Tex,
];

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
  w3B: 1.6,
  wHR: 2.035,
  cFIP: 3.073,
};

const standingsColumns = {
  batting: {
    rotoValue: [
      TeamColumn.rank,
      TeamColumn.name,
      RotoColumn.run,
      RotoColumn.homeRun,
      RotoColumn.rbi,
      RotoColumn.sb,
      RotoColumn.avg,
      RotoColumn.battingTotal,
    ],
    statValue: [
      TeamColumn.rank,
      TeamColumn.name,
      StatsColumn.run,
      StatsColumn.homeRun,
      StatsColumn.rbi,
      StatsColumn.sb,
      StatsColumn.avg,
    ],
  },
  pitching: {
    rotoValue: [
      TeamColumn.rank,
      TeamColumn.name,
      RotoColumn.strikeOut,
      RotoColumn.win,
      RotoColumn.save,
      RotoColumn.era,
      RotoColumn.whip,
      RotoColumn.pitchingTotal,
    ],
    statValue: [
      TeamColumn.rank,
      TeamColumn.name,
      StatsColumn.win,
      StatsColumn.save,
      StatsColumn.strikeOut,
      StatsColumn.whip,
    ],
  },
};

enum PlayerInfoColumn {
  slot = 'lineupSlot',
  name = 'name',
  injuryStatus = 'injuryStatus',
  totalRatingSeason = 'ratingsSeason.totalRating',
  positionalRankingSeason = 'ratingsSeason.positionalRanking',
  ownershipChange = 'ownershipChange',
  percentOwned = 'percentOwned',
}

enum BattingStatColumn {
  hits = `h`,
  run = 'r',
  homeRun = 'hr',
  rbi = 'rbi',
  stolenBase = 'sb',
  avg = 'avg',
  obp = 'obp',
  ops = 'ops',
  slg = 'slg',
  runsCreated = 'rc',
}

enum PitchingStatColumn {
  strikeOut = 'k',
  win = 'w',
  save = 'sv',
  era = 'era',
  whip = 'whip',
}

const battingStats = {
  hits: 'h',
  run: 'r',
  homeRun: 'hr',
  rbi: 'rbi',
  sb: 'sb',
  avg: 'avg',
};

const advBattingStats = {
  obp: '',
};

const pitchingStats = {
  strikeOut: 'k',
  win: 'w',
  save: 'sv',
  era: 'era',
  whip: 'whip',
};

const rosterColumns = {
  batters: [
    PlayerInfoColumn.slot,
    PlayerInfoColumn.name,
    BattingStatColumn.run,
    BattingStatColumn.homeRun,
    BattingStatColumn.rbi,
    BattingStatColumn.stolenBase,
  ],
  pitchers: [],
};

export {
  PlayerInfoColumn,
  rosterColumns,
  standingsColumns,
  weights2020,
  weights2021,
  domeStadiums,
};
