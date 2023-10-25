import { environment } from 'src/environments/environment';
import { GridIronProjectionType } from '../nfl/models/nfl-gridIron.model';
import { DfsEndpointBuilder } from './dfs-endpoint-builder';

describe('DfsEndpointBuilder', () => {
  let dfsEndpointBuilder: DfsEndpointBuilder;

  const dailyFantasyJsonBase = environment.dailyFantasyJsonBase;
  const dailyFantasyBase = environment.dailyFantasyBase;
  const awsBase = environment.awsBase;

  const basePath = `https://${awsBase}/${dailyFantasyJsonBase}`;
  const MOCK_SPORT = 'nba';
  const MOCK_GAME_ID = '12345';
  const MOCK_DATE = new Date('2023/05/01');
  const MOCK_PROJECTION_TYPE = GridIronProjectionType.Default;

  beforeEach(() => {
    dfsEndpointBuilder = new DfsEndpointBuilder();
  });

  beforeAll(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(MOCK_DATE);
  });

  afterAll(() => {
    jasmine.clock().uninstall();
  });

  describe('#constructor', () => {
    it('should construct an instance with default values', () => {
      expect(dfsEndpointBuilder).toBeTruthy();
    });
  });

  describe('#slateMasterBySport', () => {
    it('should generate slateMasterBySport endpoint', () => {
      const expectedDate = '2023/05/01';
      const actual = dfsEndpointBuilder.slateMasterBySport(MOCK_SPORT);
      const expected = `${basePath}/v2.00/${expectedDate}/slates/${MOCK_SPORT}-master.json`;
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
      const expected = `${basePath}/lineuphq/slate-definitions-v1.json`;
      expect(actual).toBe(expected);
    });
  });

  describe('#mlbPlateIqByGameId', () => {
    it('should generate mlbPlateIqByGameId endpoint', () => {
      const expectedDate = '2023-05-01';
      const actual = dfsEndpointBuilder.mlbPlateIqByGameId(MOCK_GAME_ID);
      const expected = `${basePath}/plateiq/${expectedDate}/${MOCK_GAME_ID}.json`;
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
