import { NFLClientStatGroupAttributes } from '@dfsClient/nfl-client.model';

export type ProfilerPosition = NFLClientStatGroupAttributes;
export type ProfilerTimeFrameAttributes = 'season' | 'lastSeason' | 'combined';

type ProfilerBaseAttributes = 'expectedPointsAdded' | 'fantasyPointsPerGame' | 'productionPremium' | 'weeklyVolatility';

type ProfilerQBAttributes =
  | 'passEpa'
  | 'rushEpa'
  | 'productionPremiumRank'
  | 'totalQbr'
  | 'offensiveLineRank'
  | 'airYardsPerAttempt'
  | 'airYardsPerGame'
  | 'attemptsInside10PerGame'
  | 'carriesInside5PerGame'
  | 'passAttemptDistance'
  | 'passingAttempts'
  | 'deepBallAttemptsRank'
  | 'deepBallCompletionPercentage'
  | 'underPressureAttemptsRank'
  | 'pressuredCompletionPercentage'
  | 'protectionRate'
  | 'receiverTargetSeparation'
  | 'catchablePassesPerGame'
  | 'attemptsPerGame'
  | 'receiverContestedCatchRate'
  | 'supportingCastEfficiency'
  | 'receiverYardsAfterTheCatchPerTarget'
  | 'interceptablePasses'
  | 'playActionPassCompletionPercentage'
  | 'truePasserRating'
  | 'underPressureAttemptsPerGame';

export type ProfilerBase = { profilerId: string } & { [attr in ProfilerBaseAttributes]: number | null };

export type ProfilerQB = ProfilerBase & { [attr in ProfilerQBAttributes]: number | null };

type ProfilerRBAttributes =
  | 'rushEpa'
  | 'receivingEpa'
  | 'productionPremiumRank'
  | 'dominatorRating'
  | 'goalLineCarriesPerGame'
  | 'gameScript'
  | 'breakawayRunRate'
  | 'evadedTackles'
  | 'jukeRate'
  | 'stackedFrontCarryRate'
  | 'baseFrontCarryRate'
  | 'lightFrontCarryRate'
  | 'offensiveLineRank'
  | 'opportunityShare'
  | 'yardsPerCarry'
  | 'stackedFrontYardsPerCarry'
  | 'baseFrontYardsPerCarry'
  | 'lightFrontYardsPerCarry'
  | 'redZoneOpportunityShare'
  | 'runBlockingEfficiencyRank'
  | 'weightedOpportunitiesPerGame'
  | 'yardsCreatedPerTouch';

export type ProfilerRB = ProfilerBase & { [attr in ProfilerRBAttributes]: number | null };

type ProfilerReceiverAttributes =
  | 'epaPerTarget'
  | 'targetPremium'
  | 'dominatorRating'
  | 'routeParticipation'
  | 'yardsPerRouteRun'
  | 'fantasyPointsPerRouteRun'
  | 'catchableTargetRate'
  | 'averageTargetDistance'
  | 'airYardsPerTarget'
  | 'airYardsShare'
  | 'targetShare'
  | 'deepTargetsPerGame'
  | 'redZoneTargetShare'
  | 'slotRate'
  | 'contestedCatchConversionRate'
  | 'dropRate'
  | 'targetSeparation'
  | 'hogRate'
  | 'likelyCb'
  | 'matchupRtg';

export type ProfilerReceiver = ProfilerBase & { [attr in ProfilerReceiverAttributes]: number | null };

export type PlayerProfiler = ProfilerQB | ProfilerRB | ProfilerReceiver;
export type PlayerProfilerTimeframeMap = { [prop in ProfilerTimeFrameAttributes]: PlayerProfiler };
export type PlayerProfilerEntityMap = Record<string, PlayerProfilerTimeframeMap>;

export type PlayerProfilerSeason = PlayerProfiler;
export type PlayerProfilerSeasonMap = { [key in ProfilerPosition]: PlayerProfilerSeason };
