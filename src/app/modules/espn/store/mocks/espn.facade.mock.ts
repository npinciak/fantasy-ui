import { of } from 'rxjs';
import { Sports } from '../../espn.service';
import { League } from '../../models/league.class';
import { mockMLBTeam } from '../../models/mlb-team.mock';
import { MLBFantasyLeague } from '../../models/mlb/league.class';
import { EspnGetLeague } from '../espn.actions';


const mockLeague: League = {
    id: 1234,
    teams: [mockMLBTeam]
};

export const mockESPNFacade = {
    teams$: of(
        new MLBFantasyLeague(mockLeague).teams
    ),
    teamsSnapshot: new MLBFantasyLeague(mockLeague).teams,
    getLeague: (leagueId: number, sport: Sports) => new EspnGetLeague(leagueId, sport)
};




