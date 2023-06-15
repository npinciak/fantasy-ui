import { Site } from './site.model';

type ExpertConsensusRankAttributes = 'rank | avg';
export type ExpertConsensusRank = { [attr in ExpertConsensusRankAttributes]: string };
export type ExpertConsensusRankBySite = Record<Site, ExpertConsensusRank>;
