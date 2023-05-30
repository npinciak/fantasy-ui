import { SLATE_TYPES } from './daily-fantasy-client.const';
import { ClientVegas } from './daily-fantasy-client.model';

export type SlateType = typeof SLATE_TYPES[keyof typeof SLATE_TYPES];

export interface SlateAttrTeamProperties {
  vegas: ClientVegas;
}
