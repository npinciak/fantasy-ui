import { pickAxisData, scatterData } from '@app/@shared/helpers/graph.helpers';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { Selector } from '@ngxs/store';
import { ChartData } from 'chart.js';
import { MLB_LINEUP, MLB_LINEUP_MAP } from '../consts/lineup.const';
import { MLB_STATS_MAP } from '../consts/stats.const';
import { statsKeyMap } from '../helpers';
import { BaseballPlayer } from '../models/baseball-player.model';
import { BaseballTeamMap, BaseballTeamTableRow } from '../models/baseball-team.model';
import { FantasyBaseballTeamState } from '../state/fantasy-baseball-team.state';

export class FantasyBaseballTeamsSelector {
  @Selector([FantasyBaseballTeamState.map])
  static selectTeamList(teams: BaseballTeamMap): BaseballTeamTableRow[] {
    return Object.values(teams).map(t => ({
      ...t,
      rotoStatsMap: statsKeyMap(t.rotoStats),
    }));
  }

  @Selector([FantasyBaseballTeamsSelector.selectTeamList])
  static selectStatListFilters(teams: BaseballTeamTableRow[]): FilterOptions[] {
    const stats = teams.map(p => p.rotoStats)[0];

    const arr: FilterOptions[] = [];

    Object.keys(stats).forEach(prop => {
      arr.push({ value: MLB_STATS_MAP[prop].abbrev, label: MLB_STATS_MAP[prop].description });
    });

    return arr;
  }

  @Selector([FantasyBaseballTeamState.map])
  static selectTeamById(teams: BaseballTeamMap): (id: string) => BaseballTeamTableRow {
    return (id: string) => ({
      ...teams[id],
      rotoStatsMap: statsKeyMap(teams[id].rotoStats),
    });
  }

  @Selector([FantasyBaseballTeamsSelector.selectTeamById])
  static selectRosterByTeamId(selectTeamById: (id: string) => BaseballTeamTableRow): (id: string) => BaseballPlayer[] {
    return (id: string) => selectTeamById(id).roster;
  }

  @Selector([FantasyBaseballTeamsSelector.selectRosterByTeamId])
  static selectTeamBatters(selectRosterByTeamId: (id: string) => BaseballPlayer[]): (id: string) => BaseballPlayer[] {
    return (id: string) => selectRosterByTeamId(id).filter(p => !p.isPitcher);
  }

  @Selector([FantasyBaseballTeamsSelector.selectTeamBatters])
  static getTeamStartingBatters(selectTeamBatters: (id: string) => BaseballPlayer[]) {
    return (id: string) =>
      selectTeamBatters(id)
        .filter(p => !p.isInjured && !MLB_LINEUP_MAP[p.lineupSlotId].bench && p.lineupSlotId !== MLB_LINEUP.IL)
        .sort((a, b) => a.lineupSlotId - b.lineupSlotId);
  }

  @Selector([FantasyBaseballTeamsSelector.selectTeamBatters])
  static getTeamBenchBatters(selectTeamBatters: (id: string) => BaseballPlayer[]) {
    return (id: string) => selectTeamBatters(id).filter(p => !p.isInjured && MLB_LINEUP_MAP[p.lineupSlotId].bench);
  }

  @Selector([FantasyBaseballTeamsSelector.selectTeamBatters])
  static selectTeamPitchers(selectRosterByTeamId: (id: string) => BaseballPlayer[]): (id: string) => BaseballPlayer[] {
    return (id: string) => selectRosterByTeamId(id).filter(p => p.isPitcher);
  }

  @Selector([FantasyBaseballTeamsSelector.selectTeamBatters])
  static selectTeamBatterStats(selectRosterByTeamId: (id: string) => BaseballPlayer[]) {
    return (id: string, statPeriod: string) => {
      const roster = selectRosterByTeamId(id);

      return roster.map(p => ({
        name: p.name,
        stats: p.stats[Number(statPeriod)] ?? null,
      }));
    };
  }

  @Selector([FantasyBaseballTeamsSelector.selectTeamList])
  static teamDynamicScatterChartData(teamList: BaseballTeamTableRow[]): (xAxis: string, yAxis: string) => ChartData<'scatter'> {
    return (xAxis: string, yAxis: string) => {
      const xaxis = pickAxisData(teamList, obj => obj?.rotoStatsMap[xAxis.toLowerCase()]);
      const yaxis = pickAxisData(teamList, obj => obj?.rotoStatsMap[yAxis.toLowerCase()]);

      const data = scatterData(xaxis, yaxis);

      const labels = teamList.map(p => p.name);
      return {
        labels,
        datasets: [
          {
            data: data,
            label: `${xAxis} / ${yAxis}`,
            pointRadius: 5,
            borderColor: '#006cd6',
            backgroundColor: '#006cd6',
            pointBackgroundColor: '#006cd6',
            pointBorderColor: '#006cd6',
            yAxisID: 'y',
          },
        ],
      };
    };
  }
}
