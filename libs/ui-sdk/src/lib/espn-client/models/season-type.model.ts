import { SEASON_TYPE } from './season-type.const';

export type SeasonType = (typeof SEASON_TYPE)[keyof typeof SEASON_TYPE];
