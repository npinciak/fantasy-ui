import { Selector } from '@ngxs/store';
import { NO_LOGO } from '../espn.const';
import { GameStatusId } from '../espn.service';
import { CompetitorsEntity, EventsEntity, LeaguesEntity, Situation } from '../models/espn-fastcast.model';

import { FastcastEvent } from '../models/fastcast-event.model';
import { FastcastEventTeam } from '../models/fastcast-team.model';
import { EspnFastcastLeagueState } from '../state/espn-fastcast-league.state';

export class EspnFastcastLeagueSelectors {
  static transformEventImportToFastcastEvent = (events: EventsEntity[]): FastcastEvent[] =>
    events.map(event => ({
      id: event.id,
      priority: event.priority,
      timestamp: new Date(event.date).getTime(),
      state: event.fullStatus.type.state,
      status: event.status,
      name: event.name,
      shortname: event.shortName,
      location: event.location,
      clock: event.clock,
      summary: event.summary,
      period: event.period,
      teams: EspnFastcastLeagueSelectors.transformFastcastCompetitorsToTeams(event.competitors, event.situation),
      isHalftime: event.fullStatus.type?.id ? Number(event.fullStatus?.type?.id) === GameStatusId.Halftime : false,
      downDistancePositionText: EspnFastcastLeagueSelectors.transformDownDistancePostitionText(
        event.situation?.shortDownDistanceText,
        event.situation?.possessionText
      ),
      lastPlay: event.situation?.lastPlay ?? null,
    }));

  static transformFastcastCompetitorsToTeams = (
    data: CompetitorsEntity[],
    situation: Situation | null
  ): { [homeAway: string]: FastcastEventTeam } => {
    const winPctMap: { home: number | null; away: number | null } = { home: null, away: null };

    if (!situation) {
      winPctMap.home = null;
      winPctMap.away = null;
    } else {
      winPctMap.home = situation.lastPlay?.probability?.homeWinPercentage;
      winPctMap.away = situation.lastPlay?.probability?.awayWinPercentage;
    }

    return data.reduce((acc, val) => {
      acc[val.homeAway] = {
        id: val.id,
        score: val.score,
        abbrev: val.abbreviation,
        logo: val.logo === '' ? NO_LOGO : val.logo,
        isWinner: val.winner,
        name: val.name ?? val.abbreviation,
        color: val.color === 'ffffff' || val.color === 'ffff00' ? '#1a1a1a' : `#${val.color}`,
        altColor: `#${val.alternateColor}`,
        record: val.record,
        rank: val.rank ?? null,
        winPct: winPctMap[val.homeAway],
        hasPossession: situation?.possession === val.id,
        isRedzone: (situation?.possession === val.id && situation?.isRedZone) ?? false,
      };
      return acc;
    }, {});
  };

  static transformDownDistancePostitionText = (downDistanceText: string | null, possessionText: string | null): string | null => {
    if (downDistanceText && possessionText) {
      return `${downDistanceText}, ${possessionText}`;
    }
    return null;
  };

  @Selector([EspnFastcastLeagueState.selectMap])
  static selectLeagueById(map: { [id: string]: LeaguesEntity }): (id: string) => LeaguesEntity {
    return (id: string) => map[id];
  }

  @Selector([EspnFastcastLeagueState.selectMap])
  static selectLeagueList(eventMap: { [id: string]: LeaguesEntity }): LeaguesEntity[] {
    return Object.values(eventMap);
  }

  @Selector([EspnFastcastLeagueSelectors.selectLeagueById])
  static selectFastcastEventsByLeagueId(selectLeagueById: (id: string) => LeaguesEntity): (id: string) => FastcastEvent[] {
    return (id: string) => {
      const league = selectLeagueById(id);
      return EspnFastcastLeagueSelectors.transformEventImportToFastcastEvent(league.events);
    };
  }
}
