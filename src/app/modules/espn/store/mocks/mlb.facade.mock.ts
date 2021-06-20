import { of } from 'rxjs';

const MOCK_MLB_FACADE = {
    teams$: of({ 1: {} }),
    scoreboard$: of({ 1: {} }),
    isLoading$: of(false),
    scoringPeriod: 1,
    teamsSnapshot: { 1: {} },
    // getLeague (leagueId: number) { }
};

export { MOCK_MLB_FACADE };
