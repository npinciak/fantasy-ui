import { PrecipitationCode } from '../weather.enum';

/**
 * Precipitation codes defined by Tomorrow.io
 *
 * @description https://docs.tomorrow.io/reference/data-layers-overview
 */
const precipitationMap = {
    [PrecipitationCode.NA]: 'N/A',
    [PrecipitationCode.Rain]: 'Rain',
    [PrecipitationCode.Snow]: 'Snow',
    [PrecipitationCode.FreezingRain]: 'Freezing Rain',
    [PrecipitationCode.IcePellets]: 'Ice Pellets',
};

export { precipitationMap };
