import { DateHelper } from '@app/@shared/helpers/date-helper';
import { environment } from 'src/environments/environment';
import { GridIronProjectionType } from '../nfl/models/nfl-gridIron.model';

export class DfsEndpointBuilder {
  private readonly dailyFantasyJsonBase: string;
  private readonly dailyFantasyBase: string;
  private readonly awsBase: string;
  private readonly dateHelper: DateHelper;

  constructor() {
    this.dailyFantasyJsonBase = environment.dailyFantasyJsonBase;
    this.dailyFantasyBase = environment.dailyFantasyBase;
    this.awsBase = environment.awsBase;
    this.dateHelper = new DateHelper();
  }

  slateMasterBySport(sport: string) {
    const date = this.dateHelper.formatWithDelimiter({ date: new Date().getTime(), delimiter: '/' });
    return `${this.baseAws}/v2.00/${date}/slates/${sport}-master.json`;
  }

  slateGameAttributesBySport(sport: string) {
    return `${this.dailyFantasyBase}/schedules/${sport}/game-attributes`;
  }

  get lineupHeadquarters() {
    return `${this.baseAws}/lineuphq/slate-definitions-v1.json`;
  }

  mlbPlateIqByGameId(gameId: string) {
    const date = this.dateHelper.formatWithDelimiter({ date: new Date().getTime(), delimiter: '-' });
    const url = `${this.baseAws}/plateiq/${date}/${gameId}.json`;
    return url;
  }

  gridIronProjectionByProjectionType(projectionType = GridIronProjectionType.Default) {
    return `${this.dailyFantasyBase}/grids/${projectionType}.json`;
  }

  private get baseAws() {
    return `https://${this.awsBase}/${this.dailyFantasyJsonBase}`;
  }
}
