import { CardinalDir } from '../weather.enum';

export const WIND_MAP = {
  [CardinalDir.N]: '↓ N',
  [CardinalDir.NNE]: '↙ NNE',
  [CardinalDir.NE]: '↙ NE',
  [CardinalDir.ENE]: '↙ ENE',
  [CardinalDir.E]: '← E',
  [CardinalDir.ESE]: '↖ ESE',
  [CardinalDir.SE]: '↖ SE',
  [CardinalDir.SSE]: '↖ SSE',
  [CardinalDir.S]: '↑ S',
  [CardinalDir.SSW]: '↗ SSW',
  [CardinalDir.SW]: '↗ SW',
  [CardinalDir.WSW]: '↗ WSW',
  [CardinalDir.W]: '→ W',
  [CardinalDir.WNW]: '↘ WNW',
  [CardinalDir.NW]: '↘ NW',
  [CardinalDir.NNW]: '↘ NNW',
  [CardinalDir.NALT]: '↓ N',
};
