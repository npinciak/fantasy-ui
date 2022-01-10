import { currentDate } from '@app/@shared/helpers/date';
import { environment } from 'src/environments/environment';

enum Fragments {
  slates = 'slates',
  schedules = 'schedules',
  gameAttr = 'game-attributes',
  lineupHQ = 'lineuphq',
  slateDef = 'slate-definitions-v1',
  grids = 'grids',
  v2 = 'v2.00',
}

export class DfsUrlBuilder {
  private DFS_JSON = null;
  private BASE_URL = null;
  private AWS_BASE_URL = null;

  private _sport: string;

  constructor(sport: string) {
    this._sport = sport;
  }

  get slateAttr() {
    return this.BASE_URL + `/${Fragments.schedules}/${this._sport}/${Fragments.gameAttr}`;
  }

  get lineupHeadquarters() {
    return this.AWS_BASE_URL + `/${this.DFS_JSON}/${Fragments.lineupHQ}/${Fragments.slateDef}.json`;
  }

  get gridIron() {
    return this.BASE_URL + `/${Fragments.grids}/3350867.json`;
  }

  get slateMaster() {
    return this.AWS_BASE_URL + `/${this.DFS_JSON}/${Fragments.v2}/${currentDate('/')}/${Fragments.slates}/${this._sport}-master.json`;
  }

  get slateNonHttps() {
    return `http://${this.DFS_JSON}.${this.AWS_BASE_URL}`;
  }

  get slateHttps() {
    return `https://${this.AWS_BASE_URL}/${this.DFS_JSON}`;
  }
}
