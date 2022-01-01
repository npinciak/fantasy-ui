import { EspnClientTeam } from '@app/espn/espn-client.model';
import { Team } from '@app/espn/models/team.model';

export type FantasyTeam = Team; //& Partial<EspnClientTeam>;
