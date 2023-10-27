import { MOCK_CLIENT_VEGAS } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client/mocks';
import { Vegas } from './vegas.model';

export const MOCK_VEGAS: Vegas = {
  overUnder: MOCK_CLIENT_VEGAS['o/u'],
  oppTotal: MOCK_CLIENT_VEGAS.opp_total,
  total: MOCK_CLIENT_VEGAS.total,
  line: MOCK_CLIENT_VEGAS.line,
  movement: MOCK_CLIENT_VEGAS.movement,
};
