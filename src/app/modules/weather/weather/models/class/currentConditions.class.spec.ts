import { PRECIPITATION_MAP, WEATHER_MAP } from '../maps';
import { WeatherCode } from '../weather.enum';

class CurrentConditions {
    private _dataFields: any;

    constructor(dataFields: any) {
        this._dataFields = dataFields;
    }

    get weather() {
        return WEATHER_MAP[this._dataFields.weatherCode];
    }

    get temperature() {
        return this._dataFields.temperature;
    }

    get realFeel() {
        return this._dataFields.temperatureApparent;
    }

    get precipitation() {
        return PRECIPITATION_MAP[this._dataFields.precipitationType];
    }

    get chanceOf() {
        return this._dataFields.precipitationProbability;
    }

    get humidity() {
        return this._dataFields.humidity;
    }

    get chanceOfText() {

        if (PRECIPITATION_MAP[this._dataFields.precipitationType] === 'N/A') {
            return 'No precipitation';
        }

        return `Chance of ${PRECIPITATION_MAP[this._dataFields.precipitationType]}, ${this._dataFields.precipitationProbability}%`;
    }

    get weatherImg() {
        return `https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/${this.lowercaseWeatherCode}.svg`;
    }

    get wind() {
        return {
            direction: this._dataFields.windDirection,
            gust: this._dataFields.windGust,
            speed: this._dataFields.windSpeed
        };
    }

    get dewPoint() {
        return this._dataFields.dewPoint;
    }

    private get lowercaseWeatherCode() {

        switch (this._dataFields.weatherCode) {
            case WeatherCode.MostlyClear:
                return `${WEATHER_MAP[this._dataFields.weatherCode].split(' ').join('_').toLowerCase()}_day`;
            case WeatherCode.Clear:
                return `${WEATHER_MAP[this._dataFields.weatherCode].split(' ').join('_').toLowerCase()}_day`;
            case WeatherCode.PartlyCloudy:
                return `${WEATHER_MAP[this._dataFields.weatherCode].split(' ').join('_').toLowerCase()}_day`;
            default:
                break;
        }


        return WEATHER_MAP[this._dataFields.weatherCode].split(' ').join('_').toLowerCase();
    }

}

export { CurrentConditions };
