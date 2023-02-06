import { espnDateFormatter } from '@app/@shared/helpers/date';
import { environment } from 'src/environments/environment';
import { DailyFantasyEndpointBuilder } from './daily-fantasy-endpoint-builder';

describe('fastcastEventSummary', () => {
  const endpointBuilder = new DailyFantasyEndpointBuilder();

  const dailyFantasyJsonBase = environment.dailyFantasyJsonBase;
  const dailyFantasyBase = environment.dailyFantasyBase;
  const awsBase = environment.awsBase;

  beforeEach(() => {
    endpointBuilder.sport = '';
    endpointBuilder.gameId = '';
  });

  it('should set and get sport', () => {
    endpointBuilder.sport = 'nfl';
    expect(endpointBuilder.sport).toEqual('nfl');
  });

  it('should set and get gameId', () => {
    endpointBuilder.gameId = '123456';
    expect(endpointBuilder.gameId).toEqual('123456');
  });

  it('should get slateAttr endpoint', () => {
    endpointBuilder.sport = 'nfl';
    expect(endpointBuilder.slateAttr).toEqual(`${dailyFantasyBase}/schedules/nfl/game-attributes`);
  });

  it('should get lineuphq endpoint', () => {
    expect(endpointBuilder.lineupHeadquarters).toEqual(`https://${awsBase}/${dailyFantasyJsonBase}/lineuphq/slate-definitions-v1.json`);
  });

  it('should get slate endpoint as http', () => {
    expect(endpointBuilder.slateNonHttps).toEqual(`http://${dailyFantasyJsonBase}.${awsBase}`);
  });

  it('should get slate endpoint as https', () => {
    expect(endpointBuilder.slateHttps).toEqual(`https://${awsBase}/${dailyFantasyJsonBase}`);
  });

  it('should get plateIq endpoint', () => {
    const date = espnDateFormatter({ delim: '-', date: 1675452811335 });
    endpointBuilder.gameId = '678';

    expect(endpointBuilder.plateIq).toEqual(
      `https://${awsBase}/${dailyFantasyJsonBase}/plateiq/${date}/678.json?timestamp=${new Date().getTime()}`
    );
  });

  it('should get gridIron endpoint', () => {
    expect(endpointBuilder.gridIron).toEqual(`${dailyFantasyBase}/grids/3350867.json`);
  });

  it('should get slateMaster endpoint ', () => {
    const date = espnDateFormatter({ delim: '/', date: 1675452811335 });
    endpointBuilder.sport = 'nfl';
    expect(endpointBuilder.slateMaster).toEqual(`https://${awsBase}/${dailyFantasyJsonBase}/v2.00/${date}/slates/nfl-master.json`);
  });
});
