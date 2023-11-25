import { RouterSelector } from '@app/@core/router/router.selectors';
import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { Selector } from '@app/@shared/models/typed-selector';
import { EspnClient } from '@sports-ui/ui-sdk';
import { exists } from '@sports-ui/ui-sdk/helpers';
import { FootballPlayer } from '../models/football-player.model';
import { FantasyFootballEventsState } from '../state/fantasy-football-events.state';
import { FantasyFootballTeamSelectors } from './fantasy-football-team.selectors';

export class FantasyFootballEventsSelectors extends GenericSelector(FantasyFootballEventsState) {
  @Selector([RouterSelector.getTeamId, FantasyFootballTeamSelectors.getTeamStarters, FantasyFootballEventsSelectors.getById])
  static getLiveTeamStats(
    teamId: string | null,
    players: FootballPlayer[],
    getFootballEventById: (id: string | null) => EspnClient.EventEntity
  ) {
    if (!teamId) throw new Error('teamId cannot be null');
    return players.map(p => {
      const eventIds = exists(p.stats) ? Object.keys(p.stats) : [];

      const event = eventIds.find(id => getFootballEventById(id.substring(2)));

      const stats = exists(event) ? (exists(p.stats) ? p.stats[event]?.stats : null) : ({} as any);
      const { id, name, injured, injuryStatus, img, team, position, lineupSlotId } = p;

      return {
        id,
        name,
        injured,
        injuryStatus,
        img,
        team,
        position,
        lineupSlotId,
        stats,
      };
    });
  }
}
