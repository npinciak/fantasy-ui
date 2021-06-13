/* eslint-disable @typescript-eslint/naming-convention */
export interface FreeAgent {
    players?: (PlayersEntity)[] | null;
}
export interface PlayersEntity {
    draftAuctionValue: number;
    id: number;
    keeperValue: number;
    keeperValueFuture: number;
    lineupLocked: boolean;
    onTeamId: number;
    player: FAPlayer;
    ratings: Ratings;
    rosterLocked: boolean;
    status: string;
    tradeLocked: boolean;
}

export interface FAPlayer {
    active: boolean;
    defaultPositionId: number;
    draftRanksByRankType: DraftRanksByRankType;
    droppable: boolean;
    eligibleSlots?: (number)[] | null;
    firstName: string;
    fullName: string;
    id: number;
    injured: boolean;
    injuryStatus?: string | null;
    jersey?: string | null;
    lastName: string;
    lastNewsDate?: number | null;
    ownership: FreeAgentOwnership;
    proTeamId: number;
    starterStatusByProGame: StarterStatusByProGame;
    stats?: (StatsEntity)[] | null;
    gamesPlayedByPosition?: GamesPlayedByPosition | null;
    seasonOutlook?: string | null;
}
export interface DraftRanksByRankType {
    STANDARD: STANDARD;
}
export interface STANDARD {
    auctionValue: number;
    published: boolean;
    rank: number;
    rankSourceId: number;
    rankType: string;
    slotId: number;
}
export interface FreeAgentOwnership {
    activityLevel?: null;
    auctionValueAverage: number;
    auctionValueAverageChange: number;
    averageDraftPosition: number;
    averageDraftPositionPercentChange: number;
    date: number;
    leagueType: number;
    percentChange: number;
    percentOwned: number;
    percentStarted: number;
}

export interface StarterStatusByProGame {
    test: number;
}

export interface StatsEntity {
    externalId: string;
    id: string;
    proTeamId: number;
    scoringPeriodId: number;
    seasonId: number;
    statSourceId: number;
    statSplitTypeId: number;
    stats: Stats;
}
export interface Stats {
    32?: number | null;
    34?: number | null;
    35?: number | null;
    37?: number | null;
    38?: number | null;
    39?: number | null;
    41?: string | number | null;
    42?: number | null;
    43?: number | null;
    44?: number | null;
    45?: number | null;
    46?: number | null;
    47?: string | number | null;
    48?: number | null;
    50?: number | null;
    53?: number | null;
    54?: number | null;
    55?: number | null;
    82?: string | number | null;
    0?: number | null;
    1?: number | null;
    2?: number | null;
    3?: number | null;
    5?: number | null;
    6?: number | null;
    7?: number | null;
    8?: number | null;
    9?: number | null;
    10?: number | null;
    16?: number | null;
    17?: number | null;
    18?: number | null;
    20?: number | null;
    21?: number | null;
    23?: number | null;
    24?: number | null;
    25?: number | null;
    26?: number | null;
    27?: number | null;
    81?: number | null;
    33?: number | null;
    36?: number | null;
    40?: number | null;
    49?: number | null;
    51?: number | null;
    52?: number | null;
    56?: number | null;
    57?: number | null;
    58?: number | null;
    59?: number | null;
    60?: number | null;
    61?: number | null;
    62?: number | null;
    63?: number | null;
    64?: number | null;
    66?: number | null;
    74?: number | null;
    75?: number | null;
    76?: number | null;
    77?: number | null;
    78?: number | null;
    79?: number | null;
    80?: number | null;
    83?: number | null;
    4?: number | null;
    11?: number | null;
    12?: number | null;
    13?: number | null;
    14?: number | null;
    15?: number | null;
    19?: number | null;
    22?: number | null;
    28?: number | null;
    29?: number | null;
    31?: number | null;
    67?: number | null;
    68?: number | null;
    69?: number | null;
    70?: number | null;
    71?: number | null;
    72?: number | null;
    73?: number | null;
}
export interface GamesPlayedByPosition {
    11?: number | null;
    3?: number | null;
    10?: number | null;
    8?: number | null;
    9?: number | null;
    6?: number | null;
    12?: number | null;
    4?: number | null;
    5?: number | null;
    7?: number | null;
}
export interface Ratings {
    0: number;
    // 0: 0Or1Or2Or3;
    // 1: 0Or1Or2Or3;
    // 2: 0Or1Or2Or3;
    // 3: 0Or1Or2Or3;
}
