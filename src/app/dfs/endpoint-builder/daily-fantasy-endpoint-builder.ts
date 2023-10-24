import { espnDateFormatter } from '@app/@shared/helpers/date';
import { environment } from 'src/environments/environment';
import { GridIronProjectionType } from '../nfl/models/nfl-gridIron.model';

/**
 * @deprecated use DfsEndpointBuilder instead
 */
export class DailyFantasyEndpointBuilder {
  private static dailyFantasyJsonBase = environment.dailyFantasyJsonBase;
  private static dailyFantasyBase = environment.dailyFantasyBase;
  private static awsBase = environment.awsBase;

  private _sport: string;
  private _gameId: string;

  constructor() {}

  get sport() {
    return this._sport;
  }

  set sport(val: string) {
    this._sport = val;
  }

  get gameId() {
    return this._gameId;
  }

  set gameId(val: string) {
    this._gameId = val;
  }

  get slateAttr() {
    return `${DailyFantasyEndpointBuilder.dailyFantasyBase}/schedules/${this._sport}/game-attributes`;
  }

  get lineupHeadquarters() {
    return `${this.awsJson}/lineuphq/slate-definitions-v1.json`;
  }

  get plateIq() {
    const date = espnDateFormatter({ delim: '-', date: new Date().getTime() });
    const url = `${this.awsJson}/plateiq/${date}/${this._gameId}.json`;
    return url;
  }

  get gridIron() {
    return `${DailyFantasyEndpointBuilder.dailyFantasyBase}/grids/3350867.json`;
  }

  get slateMaster() {
    const date = espnDateFormatter({ delim: '/', date: new Date().getTime() });
    return `${this.awsJson}/v2.00/${date}/slates/${this._sport}-master.json`;
  }

  get slateNonHttps() {
    return `http://${DailyFantasyEndpointBuilder.dailyFantasyJsonBase}.${DailyFantasyEndpointBuilder.awsBase}`;
  }

  get slateHttps() {
    return this.awsJson;
  }

  private get awsJson() {
    return `https://${DailyFantasyEndpointBuilder.awsBase}/${DailyFantasyEndpointBuilder.dailyFantasyJsonBase}`;
  }
}

export function DfsEndpointBuilder(): DfsEndpointBuilderClassModel {
  return class DfsEndpointBuilderClass {
    private static dailyFantasyJsonBase = environment.dailyFantasyJsonBase;
    private static dailyFantasyBase = environment.dailyFantasyBase;
    private static awsBase = environment.awsBase;

    static slateMasterBySport(sport: string) {
      const date = espnDateFormatter({ delim: '/', date: new Date().getTime() });
      return `${DfsEndpointBuilderClass.baseAws}/v2.00/${date}/slates/${sport}-master.json`;
    }

    static slateGameAttributesBySport(sport: string) {
      return `${DfsEndpointBuilderClass.dailyFantasyBase}/schedules/${sport}/game-attributes`;
    }

    static get lineupHeadquarters() {
      return `${DfsEndpointBuilderClass.baseAws}/lineuphq/slate-definitions-v1.json`;
    }

    static mlbPlateIqByGameId(gameId: string) {
      const date = espnDateFormatter({ delim: '-', date: new Date().getTime() });
      const url = `${DfsEndpointBuilderClass.baseAws}/plateiq/${date}/${gameId}.json`;
      return url;
    }

    static gridIronProjectionByProjectionType(projectionType = GridIronProjectionType.Default) {
      return `${DfsEndpointBuilderClass.dailyFantasyBase}/grids/${projectionType}.json`;
    }

    private static get baseAws() {
      return `https://${DfsEndpointBuilderClass.awsBase}/${DfsEndpointBuilderClass.dailyFantasyJsonBase}`;
    }
  };
}

interface DfsEndpointBuilderClassModel {
  new (...args: unknown[]): unknown;
  slateMasterBySport(sport: string): string;
  slateGameAttributesBySport(sport: string): string;
  lineupHeadquarters: string;
  mlbPlateIqByGameId(gameId: string): string;
  gridIronProjectionByProjectionType(projectionType: GridIronProjectionType): string;
}
