export interface EspnClientFastcast {
  sports?: SportsEntity[] | null;
}
export interface SportsEntity {
  id: string;
  uid: string;
  name: string;
  slug: string;
  leagues?: LeaguesEntity[] | null;
  $ref?: string | null;
  guid?: string | null;
  logos?: LogosEntity[] | null;
}
export interface LeaguesEntity {
  id: string;
  uid: string;
  name: string;
  abbreviation: string;
  shortName: string;
  slug: string;
  isTournament: boolean;
  events?: EventsEntity[] | null;
  smartdates?: (string | SmartdatesEntity)[] | null;
  tag?: string | null;
}
export interface EventsEntity {
  gamecastAvailable: boolean;
  playByPlayAvailable: boolean;
  commentaryAvailable: boolean;
  recent: boolean;
  id: string;
  competitionId: string;
  uid: string;
  date: string;
  timeValid: boolean;
  name: string;
  shortName: string;
  location: string;
  season: number;
  seasonStartDate: string;
  seasonEndDate: string;
  seasonType: string;
  seasonTypeHasGroups: boolean;
  group: Group;
  period: number;
  clock: string;
  status: string;
  summary: string;
  fullStatus: FullStatus;
  link: string;
  links?: LinksEntity[] | null;
  onWatch: boolean;
  seriesSummary?: string | null;
  odds: Odds;
  competitors?: CompetitorsEntity[] | null;
  situation?: Situation | null;
  priority: number;
  appLinks?: (AppLinksEntity | null)[] | null;
  broadcasts?: BroadcastsEntity[] | null;
  broadcast?: string | null;
  week?: number | null;
  weekText?: string | null;
  note?: string | null;
  notes?: NotesEntity[] | null;
  video?: Video | null;
  addedClock?: number | null;
}
export interface Group {
  groupId: string;
  name: string;
  abbreviation: string;
  shortName: string;
}
export interface FullStatus {
  clock: number;
  displayClock: string;
  period: number;
  type: Type;
  addedClock?: number | null;
}
export interface Type {
  id: string;
  name: string;
  state: string;
  completed: boolean;
  description: string;
  detail: string;
  shortDetail: string;
  altDetail?: string | null;
}
export interface LinksEntity {
  language?: string | null;
  rel?: string[] | null;
  href: string;
  text: string;
  isExternal?: boolean | null;
  isPremium?: boolean | null;
}
export interface Odds {
  provider: Provider;
  details: string;
  overUnder: number;
  spread?: number | null;
  overOdds?: number | null;
  underOdds?: number | null;
  awayTeamOdds: HomeAwayOdds;
  homeTeamOdds: HomeAwayOdds;
  links?: null[] | null;
  moneylineWinner: boolean;
  spreadWinner: boolean;
  home?: MoneyLine | null;
  away?: MoneyLine | null;
  drawOdds?: MoneyLine | null;
  draw?: MoneyLine | null;
}
export interface Provider {
  id: string;
  name: string;
  priority: number;
}
export interface HomeAwayOdds {
  favorite: boolean;
  underdog: boolean;
  moneyLine?: number | null;
  spreadOdds?: number | null;
  team: Team;
  averageScore?: number | null;
  spreadRecord?: SpreadRecord | null;
  pastPerformances?: PastPerformancesOrGroups | null;
}
export interface Team {
  id: string;
  abbreviation: string;
}
export interface SpreadRecord {
  wins: number;
  losses: number;
  pushes: number;
  summary: string;
}
export interface PastPerformancesOrGroups {
  $ref: string;
}
export interface MoneyLine {
  moneyLine: number;
}

export interface CompetitorsEntity {
  id: string;
  uid: string;
  type: string;
  order: number;
  homeAway: string;
  score: string;
  aggregateScore?: number;
  record: string | RecordEntity[];
  logo: string;
  logoDark: string;
  winner: boolean;
  displayName: string;
  name: string;
  abbreviation: string;
  location: string;
  color: string;
  alternateColor?: string | null;
  group: string;
  competitionIdPrevious: string;
  competitionIdNext?: string | null;
  rank?: number | null;
  leaders?: Leaders[] | null;
  goalieSummary?: GoalieSummaryEntity[] | null;
  shortenedRecord?: string | null;
  scoringSummary?: ScoringEntity[] | null;
  advance?: boolean | null;
  groups?: PastPerformancesOrGroups | null;
  form?: string | null;
  isNational?: boolean | null;
  uniform?: Uniform | null;
}

export interface RecordEntity {
  type: string;
  summary: string;
  displayValue: string;
}

export interface Leaders {
  name: string;
  displayName: string;
  shortDisplayName: string;
  abbreviation: string;
  leaders?: Leader[] | null;
}

export interface Leader {
  displayValue: string;
  value: number;
  athlete: Athlete;
  team: Team;
}
export interface Athlete {
  id: string;
  fullName: string;
  displayName: string;
  shortName: string;
  headshot: string;
  jersey: string;
  position: Position;
  team: Team;
  lastName?: string | null;
  active: boolean;
}
export interface Position {
  abbreviation: string;
}
export interface Team {
  id: string;
}
export interface GoalieSummaryEntity {
  athlete: Athlete;
  displayValue: string;
}

export interface ScoringEntity {
  athlete: Athlete;
  displayValue: string;
}

export interface Uniform {
  type: string;
  color: string;
  alternateColor?: string | null;
}

export interface Situation {
  lastPlay: LastPlay | null;
  down: number;
  yardLine: number;
  distance: number;
  downDistanceText: string;
  shortDownDistanceText: string;
  possessionText: string;
  isRedZone: boolean;
  homeTimeouts: number;
  awayTimeouts: number;
  possession: string;
  balls: number;
  strikes: number;
  outs: number;
  onFirst: boolean;
  onSecond: boolean;
  onThird: boolean;
}

export type NflSituation = Situation & {
  down: number;
  yardLine: number;
  distance: number;
  downDistanceText: string;
  shortDownDistanceText: string;
  possessionText: string;
  isRedZone: boolean;
  homeTimeouts: number;
  awayTimeouts: number;
  possession: string;
};

export type MlbSituation = {
  balls: number;
  strikes: number;
  outs: number;
  onFirst: boolean;
  onSecond: boolean;
  onThird: boolean;
};

export interface LastPlay {
  id: string;
  type: LastPlayType;
  text: string;
  scoreValue: number;
  team?: Team | null;
  athletesInvolved?: AthletesInvolvedEntity[] | null;
  probability?: Probability | null;
}

export interface LastPlayType {
  id: string;
  text: string;
  abbreviation?: string | null;
}

export interface AthletesInvolvedEntity {
  id: string;
  fullName: string;
  displayName: string;
  shortName: string;
  links?: AthletesInvolvedLinksEntity[] | null;
  headshot: string;
  jersey: string;
  position: string;
  team: Team;
}
export type AthletesInvolvedLinksEntity = Pick<LinksEntity, 'rel' | 'href'>;

export interface Probability {
  tiePercentage: number;
  homeWinPercentage: number;
  awayWinPercentage: number;
}
export interface AppLinksEntity {
  language: string;
  rel?: string[] | null;
  href: string;
  text: string;
  shortText: string;
  isExternal: boolean;
  isPremium: boolean;
}
export interface BroadcastsEntity {
  type: string;
  station: string;
  slug: string;
  priority: number;
  lang: string;
  region: string;
  typeId: number;
  isNational: boolean;
  broadcasterId: number;
  broadcastId: number;
  name: string;
  shortName: string;
  callLetters: string;
}
export interface NotesEntity {
  type: string;
  headline?: string | null;
  text: string;
  date?: string | null;
  source?: string | null;
}
export interface Video {
  source: string;
  id: number;
  headline: string;
  caption: string;
  description: string;
  premium: boolean;
  ad: Ad;
  tracking: Tracking;
  cerebroId: string;
  pccId: string;
  contributingPartner: string;
  contributingSystem: string;
  lastModified: string;
  originalPublishDate: string;
  timeRestrictions: TimeRestrictions;
  deviceRestrictions: DeviceRestrictions;
  syndicatable: boolean;
  duration: number;
  categories?: CategoriesEntity[] | null;
  gameId: number;
  keywords?: null[] | null;
  posterImages: PosterImages;
  images?: ImagesEntity[] | null;
  thumbnail: string;
  links: Links;
}
export interface Ad {
  sport: string;
  bundle: string;
}
export interface Tracking {
  sportName: string;
  leagueName: string;
  coverageType: string;
  trackingName: string;
  trackingId: string;
}
export interface TimeRestrictions {
  embargoDate: string;
  expirationDate: string;
}
export interface DeviceRestrictions {
  type: string;
  devices?: string[] | null;
}
export interface CategoriesEntity {
  id: number;
  description: string;
  type: string;
  sportId: number;
  teamId?: number | null;
  team?: CategoriesEntityTeam | null;
  uid?: string | null;
  leagueId?: number | null;
  league?: League | null;
  athleteId?: number | null;
  athlete?: Athlete3 | null;
}

export interface CategoriesEntityTeam {
  id: number;
  description: string;
  links: CategoriesEntityTeamLinks;
}
export interface CategoriesEntityTeamLinks {
  api: ApiWebMobile;
  web: ApiWebMobile;
  mobile: ApiWebMobile;
}
export interface ApiWebMobile {
  teams: ApiWebMobileSrc;
}
export interface ApiWebMobileSrc {
  href: string;
}
export interface League {
  id: number;
  description: string;
  links: Links2;
}
export interface Links2 {
  api: ApiOrWebOrMobile1;
  web: ApiOrWebOrMobile1;
  mobile: ApiOrWebOrMobile1;
}
export interface ApiOrWebOrMobile1 {
  leagues: ApiWebMobileSrc;
}
export interface Athlete3 {
  id: number;
  description: string;
  links: Links3;
}
export interface Links3 {
  api: ApiOrWebOrMobile2;
  web: ApiOrWebOrMobile2;
  mobile: ApiOrWebOrMobile2;
}
export interface ApiOrWebOrMobile2 {
  athletes: ApiWebMobileSrc;
}
export interface PosterImages {
  default: Default;
  full: ApiWebMobileSrc;
  wide: ApiWebMobileSrc;
  square: ApiWebMobileSrc;
}
export interface Default {
  href: string;
  width: number;
  height: number;
}
export interface ImagesEntity {
  name: string;
  url: string;
  alt: string;
  caption: string;
  credit: string;
  width: number;
  height: number;
}
export interface Links {
  api: Api;
  web: Web;
  source: Source;
  mobile: Mobile;
}
export interface Api {
  self: ApiWebMobileSrc;
  artwork: ApiWebMobileSrc;
}
export interface Web {
  href: string;
  short: ApiWebMobileSrc;
  self: ApiWebMobileSrc;
}
export interface Source {
  mezzanine: ApiWebMobileSrc;
  flash: ApiWebMobileSrc;
  hds: ApiWebMobileSrc;
  HLS: HLS;
  HD: ApiWebMobileSrc;
  full: ApiWebMobileSrc;
  href: string;
}
export interface HLS {
  href: string;
  HD: ApiWebMobileSrc;
}
export interface Mobile {
  alert: ApiWebMobileSrc;
  source: ApiWebMobileSrc;
  href: string;
  streaming: ApiWebMobileSrc;
  progressiveDownload: ApiWebMobileSrc;
}
export interface SmartdatesEntity {
  label: string;
  seasontype: number;
  week: number;
  season: number;
}
export interface LogosEntity {
  href: string;
  width: number;
  height: number;
  alt: string;
  rel?: string[] | null;
  lastUpdated: string;
}
