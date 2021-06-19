import { EspnEvent, Team } from '../../models/mlb/interface';
import { ScheduleEntry } from '../../models/mlb/interface/league';

interface MlbStateModel {
    schedule: ScheduleState;
    teams: TeamState;
    games: EventState;
    stadiums: Record<string, unknown>;
    isLoading: boolean;
    scoringPeriodId: number;
}

interface ScheduleState {
    [id: number]: ScheduleEntry;
}

interface TeamState {
    [id: number]: Team;
}

interface EventState {
    [id: number]: EspnEvent;
}

export { MlbStateModel, ScheduleState, TeamState, EventState };
