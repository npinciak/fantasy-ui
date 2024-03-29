import { TeamEntity } from '@app/@shared/base-models/base-team.model';
import { EspnClient } from '@sports-ui/ui-sdk/espn';

import { FootballPlayer } from './football-player.model';

type FootballTeamAttributes = Pick<EspnClient.RecordEntity, 'wins' | 'losses' | 'ties' | 'pointsAgainst' | 'pointsFor' | 'percentage'>;

export type FootballTeam = TeamEntity &
  FootballTeamAttributes & {
    currentRank: number;
    roster: FootballPlayer[];
  };
