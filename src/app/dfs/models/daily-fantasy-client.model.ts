export interface SiteSlateConfig {
  draftkings: SiteConfig;
}

export interface SiteConfig {
  mlb: Configs;
  nfl: Configs;
}

export interface Configs {
  id: number;
  types: SlateTypes;
}

export interface SlateTypes {
  classic: SlateConfig;
  showdown: SlateConfig;
  pickem: SlateConfig;
  short: SlateConfig;
}

export interface SlateConfig {
  salaryCap: number;
  slots: Slot[];
  fpts_multipliers: Multiplier;
}

export interface Slot {
  posName: string;
  posOpts: { [id: number]: string };
}

export interface Multiplier {
  [id: number]: number;
}

export interface GameAttrTeams {
  teams: GameAttrTeam;
}

export interface GameAttrTeam {
  [id: number]: TeamAttr;
}
export interface TeamAttr {
  stack_value: TeamAttrValueSite;
  top_value: TeamAttrValueSite;
  smash_value: TeamAttrValueSite;
  stack_leverage: TeamAttrValueSite;
  stack_field: TeamAttrValueSite;
  stack_diff: TeamAttrValueSite;
  pitcher: Pitcher;
  vegas: Vegas;
  team_total: number;
}
export interface TeamAttrValueSite {
  draftkings: string;
  fanduel: string;
  yahoo: string;
}
export interface Pitcher {
  last_name: string;
  first_name: string;
  hand: string;
  id: string;
}
export interface Vegas {
  'o/u': number;
  opp_total: number;
  total: number;
  line: number;
  movement: number;
}

export interface SlatePlayer {
  players: { [id: number]: SlatePlayerAttr };
}

export interface SlatePlayerAttr {
  hand: string;
  xml_id: string;
  team: string;
  stats: StatSplit;
  salary_diff: SalaryDiff;
  ownership: Ownership;
  slate_ownership: Ownership;
  batting_order: BattingOrder;
  stat_group: 'mlb-hitter' | 'mlb-pitcher';
  plateiq: PlateIq;
  ecr: Ecr;
}

export interface Ecr {
  2: { rank: number; average: number };
  20: { rank: number; average: number };
}

export interface StatSplit {
  'last-two': Stats;
  season: Stats;
  '12weeks': Stats;
  '4weeks': Stats;
  '2weeks': Stats;
  '1week': Stats;
  yesterday: Pick<Stats, 'id' | 'name' | 'muwoba' | 'ab' | 'avg' | 'woba' | 'iso' | 'obp' | 'slg' | 'k%' | 'bb%' | 'ops' | 'babip'>;
}
export interface Stats {
  xwoba: string;
  wellHitPct: string;
  obp: string;
  ops: string;
  slg: string;
  hbp: string;
  'hr/fb': string;
  k: string;
  sb: string;
  gp: string;
  ab: string;
  woba: string;
  iso: string;
  babip: string;
  avg: string;
  'k%': string;
  'bb%': string;
  muwoba: string;
  id: string;
  name: string;
}

export interface SalaryDiff {
  2: DKFD;
  20: DKFD;
}
export interface DKFD {
  salary: string;
  position: string;
  diff: number;
  rank_diff: number;
  rank: number;
}

export interface Ownership {
  2: null;
  20: null;
  43: null;
  50: null;
}

export interface PlateIq {
  score: PlateIqScore;
  factors: PlateIqFactors;
}
export interface PlateIqScore {
  contact: number;
  context: number;
  pitchTypes: number;
  production: number;
  plateDiscipline: number;
  recentSkill: number;
  stolenBase: number;
  sbFactor: number;
  overall: number;
}
export interface PlateIqFactors {
  positive: FactorEntity[] | null;
  negative: FactorEntity[] | null;
  positiveCt: number;
  negativeCt: number;
}
export interface FactorEntity {
  name: string;
  comparisonValue: number;
  description: string;
  type: string;
}
export interface SiteSlates {
  superdraft: { [id: number]: DfsSlate };
  draftkings: { [id: number]: DfsSlate };
  fanduel: { [id: number]: DfsSlate };
  yahoo: { [id: number]: DfsSlate };
}

export type SlateMaster = SiteSlates;

export interface SiteSlateEntity {
  date: string;
  importId: string;
  name: string;
  games: DfsSlateGamesEntity[] | null;
  start: string;
  type: string;
  salaryCap: number;
  slate_path: string;
  source: string;
  default: boolean;
  taggable: boolean;
  hidden: boolean;
}

export type DfsSlate = SiteSlateEntity;

export interface SiteSlateGameEntity {
  date: string;
  time: string;
  scheduleId: string;
  rgScheduleId: string | null;
  teamAwayId: string;
  rgTeamAwayId: string | null;
  teamHomeId: string;
  rgTeamHomeId: string | null;
  teamAwayHashtag: string;
  teamHomeHashtag: string;
}

export type DfsSlateGamesEntity = SiteSlateGameEntity;

export interface DfsSlatePlayer {
  attributes: BattingAttributes;
  fpts: number;
  player: SlatePlayerEntity;
  schedule: Schedule;
  stat_group: string;
  status: null;
}

export interface BattingAttributes {
  batting_order: BattingOrder;
}

export interface BattingOrder {
  order: string;
  confirmed: number;
}

export interface SlatePlayerEntity {
  id: string;
  rg_id: string;
  first_name: string;
  last_name: string;
  position: string;
  sport_id: string;
  team_id: string;
  rg_team_id: string | null;
  xml_id: string | null;
}

export interface Schedule {
  date: string;
  id: string;
  rg_id: string;
  sport_id: string;
  team_away: ScheduleTeamEntity;
  team_home: ScheduleTeamEntity;
  salaries: SalariesEntity[] | null;
}

export interface ScheduleTeamEntity {
  hashtag: string;
  id: string;
  rg_id: string;
  name: string;
}

export interface SalariesEntity {
  position: string;
  salary: number;
  player_id: string;
}

export type CoreSlatePlayer = Pick<DfsSlatePlayer, 'attributes'>;

export type CoreSchedule = Pick<Schedule, 'date' | 'id' | 'rg_id' | 'sport_id' | 'team_away' | 'team_home' | 'salaries'>;
