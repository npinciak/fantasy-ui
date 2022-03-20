import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { pickAxisData, scatterData } from '@app/@shared/helpers/graph.helpers';
import { MOCK_DFS_TEAM_1, MOCK_DFS_TEAM_2, MOCK_DFS_TEAM_VEGAS_LIST } from '@app/dfs/models/team.model.mock';
import { MaterialModule } from '@app/material.module';
import { sandboxOf } from 'angular-playground';
import { of } from 'rxjs';
import { DataVisComponent } from './data-vis.component';

@Component({
  selector: `app-data-vis-sandbox`,
  templateUrl: './data-vis.component.sandbox.html',
  styleUrls: [],
})
class DataVisSandboxComponent {
  readonly MOCK_DATA = MOCK_DFS_TEAM_VEGAS_LIST;

  xaxis = pickAxisData(this.MOCK_DATA, obj => obj.vegas.line);
  yaxis = pickAxisData(this.MOCK_DATA, obj => obj.vegas.total);
  data = scatterData(this.xaxis, this.yaxis);

  chartData$ = of({
    labels: [MOCK_DFS_TEAM_1.name, MOCK_DFS_TEAM_2.name],
    datasets: [
      {
        data: this.data,
        label: 'Series A',
        pointRadius: 5,
      },
    ],
  });

  constructor() {}
}

export default sandboxOf(DataVisSandboxComponent, {
  declarations: [DataVisComponent],
  imports: [MaterialModule, BrowserAnimationsModule],
}).add('DataVisSandboxComponent', {
  template: `<app-data-vis-sandbox></app-data-vis-sandbox>`,
});
