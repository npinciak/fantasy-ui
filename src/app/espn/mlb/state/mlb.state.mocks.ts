import { MOCK_DATA_ESPN } from '@app/@shared/helpers/testConfigs';
import { MlbStateModel } from './mlb-state.model';

const MOCK_STATE: MlbStateModel = {
  schedule: { [MOCK_DATA_ESPN.ESPN_SCHEDULE[0].teams[0].teamId]: MOCK_DATA_ESPN.ESPN_SCHEDULE[0].teams[0] },
  teams: { [MOCK_DATA_ESPN.ESPN_TEAM.id]: MOCK_DATA_ESPN.ESPN_TEAM },
  events: { [Number(MOCK_DATA_ESPN.ESPN_EVENT.id)]: MOCK_DATA_ESPN.ESPN_EVENT },
  scoringPeriodId: MOCK_DATA_ESPN.ESPN_LEAGUE.scoringPeriodId,
  isLoading: false,
};

const MOCK_STATE_EMPTY: MlbStateModel = {
  schedule: {},
  teams: {},
  events: {},
  scoringPeriodId: null,
  isLoading: true,
};

export { MOCK_STATE, MOCK_STATE_EMPTY };
