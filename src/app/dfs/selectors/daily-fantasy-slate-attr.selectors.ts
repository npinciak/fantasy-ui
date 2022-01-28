import { pickAxisData, scatterData } from '@app/@shared/helpers/graph.helpers';
import { Selector } from '@ngxs/store';
import { ChartData } from 'chart.js';
import { Team } from '../models/team.model';
import { SlateTeam, SlateTeamMap } from '../service/slate.service';
import { DailyFantasySlateAttrState } from '../state/daily-fantasy-slate-attr.state';
import { DailyFantasyTeamsSelectors } from './daily-fantasy-team.selectors';

export class DailyFantasySlateAttrSelectors {
  @Selector([DailyFantasySlateAttrState.teamMap])
  static selectTeamById(map: SlateTeamMap): (id: string) => SlateTeam {
    return (id: string) => map[id];
  }

  @Selector([DailyFantasySlateAttrState.teamMap, DailyFantasyTeamsSelectors.selectTeamById])
  static selectTeamList(map: SlateTeamMap, selectTeamById: (id: string) => Team): TeamList[] {
    return Object.values(map).map(t => ({
      ...t,
      team: selectTeamById(t.id),
    }));
  }

  @Selector([DailyFantasySlateAttrSelectors.selectTeamList])
  static scatterChartLabels(teamList: TeamList[]): string[] {
    return teamList.map(d => d.team.name);
  }

  @Selector([DailyFantasySlateAttrSelectors.selectTeamList, DailyFantasySlateAttrSelectors.scatterChartLabels])
  static scatterChartData(teamList: TeamList[], labels: string[]): ChartData<'scatter'> {
    const xaxis = pickAxisData(teamList, obj => obj.safpts.RawQB);
    const yaxis = pickAxisData(teamList, obj => obj.vegas.total);

    const data = scatterData(xaxis, yaxis);

    return {
      labels,
      datasets: [
        {
          data: data,
          label: 'Series A',
          pointRadius: 5,
          borderColor: '#F37723',
          backgroundColor: '#F37723',
          pointBackgroundColor: '#F37723',
          pointBorderColor: '#F37723',
        },
      ],
    };
  }
}

export type TeamList = SlateTeam & Pick<Team, 'id'> & { team: Team };
