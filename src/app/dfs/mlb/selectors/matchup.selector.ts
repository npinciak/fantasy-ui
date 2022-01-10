import { Selector } from '@ngxs/store';
import { TeamAttributes } from '../models/slate.interface';
import { MlbDfsState } from '../state/mlb-dfs.state';
import { MLBDfsMatchup } from '../models/mlb-matchup.model';
import { Matchup } from '@app/dfs/models/matchup.model';
import { Schedule } from '@app/dfs/models/daily-fantasy-client.model';

export class MatchupSelectors {
  @Selector([MlbDfsState.slateTeams])
  static getMatchups(slates: { [id: number]: TeamAttributes }): MLBDfsMatchup[] {
    const matchups: { [id: string]: MLBDfsMatchup } = {};

    for (const [key, value] of Object.entries(slates)) {
      matchups[key] = {
        teamId: null,
        matchupAttr: null,
        teamTotal: value.team_total,
        team: null,
        stackValue: Number(value.stack_value),
        topValue: Number(value.top_value),
        smashVal: Number(value.smash_value),
        stackLeverage: Number(value.stack_leverage),
        stackDiff: Number(value.stack_diff),
      };
    }

    return Object.values(matchups).sort((a, b) => b.teamTotal - a.teamTotal);
  }

  @Selector([MlbDfsState.schedule, MlbDfsState.slateTeams])
  static selectMLBMatchups(schedule: { [id: number]: Schedule }, slates: { [id: number]: TeamAttributes }): any[] {
    const newSchedule = {};
    for (const [key, value] of Object.entries(schedule)) {
      newSchedule[key] = {
        home: {
          info: value.team_home,
          ...slates[value.team_home.rg_id],
        },
        away: {
          info: value.team_away,
          ...slates[value.team_away.rg_id],
        },
      };
    }
    console.log(newSchedule);
    return Object.values(newSchedule);
  }

  @Selector([MatchupSelectors.getMatchups])
  static matchupsEmpty(slates: Matchup[]): boolean {
    return slates.length === 0;
  }

  @Selector([MatchupSelectors.getMatchups])
  static selectTeamsInSlate(matchups: MLBDfsMatchup[]): string[] {
    const set = new Set<string>();
    matchups.map(matchup => set.add(matchup.team));
    return Array.from(set);
  }

  @Selector([MatchupSelectors.getMatchups])
  static totalPointsGraph(matchups: MLBDfsMatchup[]) {
    const total = matchups.map(matchup => matchup.teamTotal);
    const labels = matchups.map(matchup => matchup.team);
    //[{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }];
    // public lineChartLabels: MatLabel[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    return { dataset: [{ data: total, label: 'seres' }], labels };
  }

  //{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }
  // [{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }]
}
