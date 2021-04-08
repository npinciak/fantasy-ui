import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

export class BaseGraph {
    constructor(
        private _data: ChartDataSets[],
        private _labels: Label[],
        private _chartType: ChartType = 'line',
        private _chartLegend: boolean = false,
        // private _chartOptions: ChartOptions
    ) { }

    set chartData(data: ChartDataSets[]) {
        this._data = data;
    }

    get chartData() {
        return this._data;
    }

    set chartLabels(labels: Label[]) {
        this._labels = labels;
    }

    get chartLabels() {
        return this._labels;
    }

    set chartType(type: ChartType) {
        this._chartType = type;
    }

    get chartType() {
        return this._chartType;
    }

    set chartLegend(includeLegend: boolean) {
        this._chartLegend = includeLegend;
    }

    get chartLegend() {
        return this._chartLegend;
    }

    get chartOptions(): ChartOptions {
        return ;

    }


}

