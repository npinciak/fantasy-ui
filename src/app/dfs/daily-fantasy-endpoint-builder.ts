import { espnDateFormatter } from '@app/@shared/helpers/date';
import { environment } from 'src/environments/environment';

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
    let url = `${this.awsJson}/plateiq/${date}/${this._gameId}.json`;
    url += `?timestamp=${new Date().getTime()}`;
    return url;
  }

  get gridIron() {
    return `${DailyFantasyEndpointBuilder.dailyFantasyBase}/grids/3350867.json`; // TODO: *.json dynamic?
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
