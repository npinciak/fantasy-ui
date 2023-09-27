import { Observable } from 'rxjs';
import { IBaseLeagueActionsClass, IFantasyLeagueBaseFacade } from './base-league.model';

export function FantasyLeagueBaseFacade({ actionHandler }: { actionHandler: IBaseLeagueActionsClass }): {
  new (...args: any[]): IFantasyLeagueBaseFacade;
} {
  class FantasyLeagueBaseFacadeClass {
    id: string | null;
    seasonId: string | null;
    scoringPeriodId: string | null;
    firstScoringPeriod: string | null;
    finalScoringPeriod: string | null;
    matchupPeriodCount: string | null;

    setLeague(state: any): void {
      throw new Error('Method not implemented.');
    }
    fetch(): Observable<void> {
      throw new Error('Method not implemented.');
    }
    refresh(): Observable<void> {
      throw new Error('Method not implemented.');
    }
  }

  return FantasyLeagueBaseFacadeClass;
}
