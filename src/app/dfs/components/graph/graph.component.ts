import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatLabel } from '@angular/material/form-field';
import { ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent implements OnInit, OnChanges {
  @Input() chartData: any;
  @ViewChild(BaseChartDirective) baseChart: BaseChartDirective;

  public lineChartData: ChartDataset[] = [{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }];
  // public lineChartLabels: MatLabel[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any & { annotation: any } = {
    responsive: false,
  };
  public lineChartColors: any[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'chartData':
            this.chartData = changes[propName].currentValue;
            console.log(this.chartData);
            break;
        }
      }
    }
  }
}
