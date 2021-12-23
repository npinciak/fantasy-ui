import { Selector } from '@ngxs/store';
import { ChartDataset } from 'chart.js';
import { DfsMatchup } from '../class/matchup.class';
import { MLBDfsMatchup } from '../class/mlb-matchup.class';
import { DfsPlayer } from '../class/player.class';
import { TeamAttributes } from '../models/slate.interface';
import { DfsSlate } from '../models/slateMaster.interface';
import { SlatePlayerAttr } from '../models/slatePlayer.interface';
import { MlbDfsState } from '../state/mlb-dfs.state';
import { Schedule } from '../models/dfsPlayer.interface';

class NFLMatchup {
  constructor(home: any, away: any) {}
}

export class MatchupSelectors {
  @Selector([MlbDfsState.slateTeams])
  static getMatchups(slates: { [id: number]: TeamAttributes }): MLBDfsMatchup[] {
    const matchups: { [id: string]: MLBDfsMatchup } = {};

    for (const [key, value] of Object.entries(slates)) {
      matchups[key] = new MLBDfsMatchup(key, value);
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
  static matchupsEmpty(slates: DfsMatchup[]): boolean {
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
