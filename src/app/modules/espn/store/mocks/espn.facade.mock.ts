import { of } from 'rxjs';
import { Sports } from '../../espn.service';
import { BaseballTeam } from '../../models/mlb/class/team.class';
import { League } from '../../models/mlb/interface';
import { mockBaseballTeam, mockMLBTeam } from '../../models/mlb/mocks/mlb-team.mock';
import { EspnGetBaseballLeague } from '../espn.actions';

const mockLeague: League = {
    id: 1234,
    teams: [],
    schedule: [],
    settings: null,
};

export const mockESPNFacade = {
    teams$: of([mockBaseballTeam]),
    teamsSnapshot: [mockBaseballTeam],
    getLeague: (leagueId: number) => new EspnGetBaseballLeague(leagueId)
};



// const mockBaseballTeam =   {
//     const team = new BaseballTeam(mockMLBTeam)
//     team.roster = [mockMLBPlayer];
//     return team
// };

