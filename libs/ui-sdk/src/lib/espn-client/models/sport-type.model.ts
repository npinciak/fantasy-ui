import { SPORT_TYPE } from './sport-type.const';

export type SportType = typeof SPORT_TYPE[keyof typeof SPORT_TYPE];
