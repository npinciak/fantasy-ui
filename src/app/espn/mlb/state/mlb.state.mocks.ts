import { MOCK_DATA } from '@app/@shared/helpers/testConfigs';
import { MlbStateModel } from './mlb-state.model';

const mockState: MlbStateModel = {
  schedule: { [MOCK_DATA.ESPN_SCHEDULE[0].id]: MOCK_DATA.ESPN_SCHEDULE[0] },
  teams: { [MOCK_DATA.ESPN_TEAM.id]: MOCK_DATA.ESPN_TEAM },
  events: { [Number(MOCK_DATA.ESPN_EVENT.id)]: MOCK_DATA.ESPN_EVENT },
  scoringPeriodId: MOCK_DATA.ESPN_LEAGUE.scoringPeriodId,
  isLoading: false,
};

export { mockState };
