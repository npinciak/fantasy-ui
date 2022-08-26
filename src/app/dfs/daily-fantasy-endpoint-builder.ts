import { currentDate } from '@app/@shared/helpers/date';
import { environment } from 'src/environments/environment';

export class DailyFantasyEndpointBuilder {
  private static dailyFantasyJsonBase = environment.dailyFantasyJsonBase;
  private static dailyFantasyBase = environment.dailyFantasyBase;

  private static awsBase = environment.awsBase;

  private _sport: string | undefined;
  private _gameId: string | undefined;

  constructor(sport?: string, gameId?: string) {
    this._sport = sport;
    this._gameId = gameId;
  }

  get slateAttr() {
    return `${DailyFantasyEndpointBuilder.dailyFantasyBase}/schedules/${this._sport}/game-attributes`;
  }

  get lineupHeadquarters() {
    return `${this.awsJson}/lineuphq/slate-definitions-v1.json`;
  }

  get plateIq() {
    return `${this.awsJson}/plateiq/${currentDate('-')}/${this._gameId}.json?timestamp=${new Date().getTime()}`;
  }

  get gridIron() {
    return `${DailyFantasyEndpointBuilder.dailyFantasyBase}/grids/3350867.json`; // TODO: *.json dynamic?
  }

  get slateMaster() {
    return `${this.awsJson}/v2.00/${currentDate('/')}/slates/${this._sport}-master.json`;
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
