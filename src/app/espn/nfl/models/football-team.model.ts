import { TeamEntity } from '@app/@shared/base-models/base-team.model';
import { FootballPlayer } from './football-player.model';

type FootballTeamAttributes = 'wins' | 'losses' | 'ties' | 'pointsAgainst' | 'pointsScored' | 'currentRank' | 'winPct';

export type FootballTeam = TeamEntity &
  { [key in FootballTeamAttributes]: number } & {
    roster: FootballPlayer[];
  };
