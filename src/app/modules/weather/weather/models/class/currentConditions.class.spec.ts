import { MOCK_DATA } from '@app/@shared/helpers/testConfigs';
import { WEATHER_MAP } from '../maps';
import { PrecipitationCode, WeatherCode } from '../weather.enum';
import { CurrentConditions } from './currentConditions.class';

describe('[Class] CurrentConditions', () => {
    const actual = MOCK_DATA.CURRENT_CONDITIONS_CLASS;
    const expected = MOCK_DATA.WEATHER_CURRENT_CONDITIONS.data.timelines[0].intervals[0].values;

    describe('weather', () => {
        it('should return mapped weather value', () => {
            expect(actual.weather).toBe('Mostly Cloudy', 'typeof string');
        });
    });

    describe('temperature', () => {
        it('should return temperature', () => {
            expect(actual.temperature).toBe(expected.temperature);
        });
    });

    describe('realFeel', () => {
        it('should return temperature', () => {
            expect(actual.realFeel).toBe(expected.temperatureApparent);
        });
    });

    describe('precipitation', () => {
        it('should return mapped precipitation value', () => {
            expect(actual.precipitation).toBe('Rain', 'typeof string');
        });
    });

    describe('chanceOf', () => {
        it('should return precipitation probability', () => {
            expect(actual.chanceOf).toBe(expected.precipitationProbability);
        });
    });

    describe('humidity', () => {
        it('should return humidity', () => {
            expect(actual.humidity).toBe(expected.humidity);
        });
    });

    describe('chanceOfText', () => {

        const actualNoPrecipitationType = new CurrentConditions({
            dewPoint: 65.86,
            precipitationIntensity: 0,
            precipitationType: PrecipitationCode.NA,
            precipitationProbability: 0,
            temperatureApparent: 71.33,
            temperature: 71.33,
            humidity: 81.22,
            windSpeed: 4.92,
            windGust: 5.95,
            windDirection: 245,
            weatherCode: 1102
        });

        it('should return \'No precipitation\'', () => {
            expect(actualNoPrecipitationType.chanceOfText).toBe('No precipitation');
        });

        it('should return chance of text', () => {
            expect(actual.chanceOfText).toBe('Chance of Rain, 0%');
        });
    });


    describe('wind', () => {
        it('should return wind direction', () => {
            expect(actual.wind.direction).toBe(expected.windDirection);
        });

        it('should return wind gust', () => {
            expect(actual.wind.gust).toBe(expected.windGust);
        });

        it('should return wind speed', () => {
            expect(actual.wind.speed).toBe(expected.windSpeed);
        });
    });

    describe('dewPoint', () => {
        it('should return dewPoint', () => {
            expect(actual.dewPoint).toBe(expected.dewPoint);
        });
    });

    describe('weatherImg', () => {
        const weatherCodes = [WeatherCode.MostlyClear, WeatherCode.PartlyCloudy, WeatherCode.Clear];

        it('should return weather image', () => {
            // eslint-disable-next-line max-len
            expect(actual.weatherImg).toBe('https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/mostly_cloudy.svg');
        });

        for (const code of weatherCodes) {
            it(`should append \'_day\' to ${WEATHER_MAP[code].split(' ').join('_').toLowerCase()}`, () => {

                const actualClass = new CurrentConditions({
                    dewPoint: 65.86,
                    precipitationIntensity: 0,
                    precipitationType: 1,
                    precipitationProbability: 0,
                    temperatureApparent: 71.33,
                    temperature: 71.33,
                    humidity: 81.22,
                    windSpeed: 4.92,
                    windGust: 5.95,
                    windDirection: 245,
                    weatherCode: code
                });

                const img = `${WEATHER_MAP[code].split(' ').join('_').toLowerCase()}_day.svg`;

                // eslint-disable-next-line max-len
                expect(actualClass.weatherImg).toBe(`https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/${img}`);

            });
        };
    });
});
