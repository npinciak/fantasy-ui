import { of } from 'rxjs';

const MOCK_MLB_FACADE = {
    teams$: of([]),
    scoreboard$: of([]),
    isLoading$: of(false),
    scoringPeriod: 1,
    teamsSnapshot: new Map<1, null>(),
    // getLeague (leagueId: number) { }
};

export { MOCK_MLB_FACADE };
