import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: `app-data-vis`,
  templateUrl: './data-vis.component.html',
  styleUrls: ['./data-vis.component.scss'],
})
export class DataVisComponent implements OnInit {
  @Input() chartData: ChartData;
  @Input() chartLabels: string[];

  constructor() {}

  ngOnInit(): void {}

  // scatter
  //  Chart.overrides[type].plugins.tooltip

  public scatterChartOptions = {
    responsive: true,
    events: ['click', 'mousemove'],
    plugins: {
      tooltip: {
        callbacks: {
          label: ctx => {
            const labelMap = this.chartLabels.reduce((obj, val, i) => {
              obj[i] = val;
              return obj;
            }, {} as { [i: number]: string });

            // console.log(labelMap[ctx.dataIndex]);
            let label = `${labelMap[ctx.dataIndex]}: ${ctx.parsed.x} , ' + ctx.parsed.y`; //ctx.dataset.labels[ctx.dataIndex];
            // label += ' (' + ctx.parsed.x + ', ' + ctx.parsed.y + ')';
            return label;
          },
        },
      },
    },
  };
  public scatterChartLabels: string[];

  public scatterChartData: ChartData<'scatter'>;
  public scatterChartType: ChartType = 'scatter';

  public ChartColor = [
    {
      pointBackgroundColor: '#0499C2',
      pointBorderColor: '#ffffff',
      pointRadius: 3,
    },
  ];
  chartClicked($event) {}

  chartHover({ event, active }: { event: MouseEvent; active: { index: number; dataSetIndex: number }[] }) {
    // const labelMap = this.chartData.labels.reduce((obj, val, i) => {
    //   obj[i] = val;
    //   return obj;
    // }, {} as { [i: number]: string });
    // console.log({ label: labelMap[active[0].dataSetIndex] });
  }

  /**
   * Update tooltip with current hover values
   */
  //  public chartHover({ event, active }: { event: MouseEvent; active: GraphMetaData[] }): void {
  //   if (!active.length) {
  //     return;
  //   }
  //   const i = active[0]._index;
  //   this.chart.chart.options.annotation.annotations[1] = this.currentViewLine;
  //   this.chart.chart.update();

  //   this.currentX = this.forecastData[i][this.xAxisFilter];
  //   this.currentY = this.forecastData[i][this.yAxisFilter];
  //   this.forecastService.changeTableData(this.table[i].data);
  // }

  /**
   * Draw forecast chart
   */
  drawChart(): void {
    //   this.dailyFantasySlateAttrFacade.selectTeamList$.subscribe(res => {
    //     const xaxis = res.map(d => d.vegas['o/u']);
    //     const yaxis = res.map(d => d.vegas.total);
    //     this.scatterChartLabels = res.map(d => d.team.name);
    //     const data = xaxis.map((x, i) => {
    //       return {
    //         x: Number(x),
    //         y: Number(yaxis[i]),
    //       };
    //     });
    //     this.scatterChartData = {
    //       labels: this.scatterChartLabels,
    //       datasets: [
    //         {
    //           data,
    //           label: 'Series A',
    //           pointRadius: 10,
    //         },
    //       ],
    //     };
    //   });
  }
}
