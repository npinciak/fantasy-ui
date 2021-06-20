import { precipitationMap, weatherMap } from '../maps';

class CurrentConditions {
    private _dataFields: any;

    constructor(dataFields: any) {
        this._dataFields = dataFields;
    }

    get weather() {
        return weatherMap[this._dataFields.weatherCode];
    }

    get temperature() {
        return this._dataFields.temperature;
    }

    get realFeel() {
        return this._dataFields.temperatureApparent;
    }

    get precipitation() {
        return precipitationMap[this._dataFields.precipitationType];
    }

    get chanceOf() {
        return `Chance of ${precipitationMap[this._dataFields.precipitationType]}, ${this._dataFields.precipitationProbability}%`;
    }

}

export { CurrentConditions };
