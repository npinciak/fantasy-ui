import { currentDate } from '@app/@shared/helpers/date';
import { environment } from 'src/environments/environment';

export class DailyFantasyEndpointBuilder {
  private static dailyFantasyJsonBase = environment.dailyFantasyJsonBase;
  private static dailyFantasyBase = environment.dailyFantasyBase;

  private static awsBase = environment.awsBase;

  private _sport: string;

  constructor(sport?: string) {
    this._sport = sport;
  }

  get slateAttr() {
    return `${DailyFantasyEndpointBuilder.dailyFantasyBase}/schedules/${this._sport}/game-attributes`;
  }

  get lineupHeadquarters() {
    return `${this.awsJson}/lineuphq/slate-definitions-v1.json`;
  }

  get gridIron() {
    return `${DailyFantasyEndpointBuilder.dailyFantasyBase}/grids/3350867.json`;
  }

  get slateMaster() {
    return `${this.awsJson}/v2.00/${currentDate('/')}/slates/${this._sport}-master.json`;
  }

  get slateNonHttps() {
    return `http://${DailyFantasyEndpointBuilder.dailyFantasyJsonBase}.${DailyFantasyEndpointBuilder.awsBase}`;
  }

  get slateHttps() {
    return `https://${this.awsJson}`;
  }

  private get awsJson() {
    return `${DailyFantasyEndpointBuilder.awsBase}/${DailyFantasyEndpointBuilder.dailyFantasyJsonBase}`;
  }
}
