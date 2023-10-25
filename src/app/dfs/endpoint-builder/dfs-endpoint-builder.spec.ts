import { environment } from 'src/environments/environment';
import { GridIronProjectionType } from '../nfl/models/nfl-gridIron.model';
import { DfsEndpointBuilder } from './dfs-endpoint-builder';

describe('DfsEndpointBuilder', () => {
  let dfsEndpointBuilder: DfsEndpointBuilder;

  const dailyFantasyJsonBase = environment.dailyFantasyJsonBase;
  const dailyFantasyBase = environment.dailyFantasyBase;
  const awsBase = environment.awsBase;
  const MOCK_DATE = new Date('2023-10-31').getTime();
  const MOCK_SPORT = 'nba';
  const MOCK_GAME_ID = '12345';
  const MOCK_PROJECTION_TYPE = GridIronProjectionType.Default;

  // Before each test, create a new instance of DfsEndpointBuilder.
  beforeEach(() => {
    dfsEndpointBuilder = new DfsEndpointBuilder();

    spyOnProperty(window as any, 'espnDateFormatter').and.returnValue({ delim: '/', date: MOCK_DATE });
  });

  describe('#constructor', () => {
    it('should construct an instance with default values', () => {
      expect(dfsEndpointBuilder).toBeTruthy();
    });
  });

  describe('#slateMasterBySport', () => {
    it('should generate slateMasterBySport endpoint', () => {
      const actual = dfsEndpointBuilder.slateMasterBySport(MOCK_SPORT);
      const expected = `${awsBase}/v2.00/${MOCK_DATE}/slates/${MOCK_SPORT}-master.json`;
      expect(actual).toBe(expected);
    });
  });

  describe('#slateGameAttributesBySport', () => {
    it('should generate slateGameAttributesBySport endpoint', () => {
      const actual = dfsEndpointBuilder.slateGameAttributesBySport(MOCK_SPORT);
      const expected = `${dailyFantasyBase}/schedules/${MOCK_SPORT}/game-attributes`;
      expect(actual).toBe(expected);
    });
  });

  describe('#lineupHeadquarters', () => {
    it('should generate lineupHeadquarters endpoint', () => {
      const actual = dfsEndpointBuilder.lineupHeadquarters;
      const expected = `${awsBase}/lineuphq/slate-definitions-v1.json`;
      expect(actual).toBe(expected);
    });
  });

  describe('#mlbPlateIqByGameId', () => {
    it('should generate mlbPlateIqByGameId endpoint', () => {
      const actual = dfsEndpointBuilder.mlbPlateIqByGameId(MOCK_GAME_ID);
      const expected = `${awsBase}/plateiq/${MOCK_DATE}/${MOCK_GAME_ID}.json`;
      expect(actual).toBe(expected);
    });
  });

  describe('#gridIronProjectionByProjectionType', () => {
    it('should generate gridIronProjectionByProjectionType endpoint', () => {
      const actual = dfsEndpointBuilder.gridIronProjectionByProjectionType(MOCK_PROJECTION_TYPE);
      const expected = `${dailyFantasyBase}/grids/${MOCK_PROJECTION_TYPE}.json`;
      expect(actual).toBe(expected);
    });

    it('should generate gridIronProjectionByProjectionType with default projection type', () => {
      const actual = dfsEndpointBuilder.gridIronProjectionByProjectionType();
      const expected = `${dailyFantasyBase}/grids/${MOCK_PROJECTION_TYPE}.json`;
      expect(actual).toBe(expected);
    });
  });
});
