import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { DfsNflChartSelector } from '../selectors/dfs-nfl-chart.selector';

@Injectable({ providedIn: 'root' })
export class DfsNflChartFacade {
  playerBarChartData$ = select(DfsNflChartSelector.getPlayerBarChartDataByStatAndPosition);
  playerScatterData$ = select(DfsNflChartSelector.getPlayerScatterData);

  playerScatterChartDataByStat$ = select(DfsNflChartSelector.getPlayerScatterChartDataByStat);
}
