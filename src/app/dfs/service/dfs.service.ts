import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { currentDate } from '@app/@shared/helpers/date';
import { ApiService } from '@app/@shared/services/api.service';
import { forkJoin } from 'rxjs';
import { DfsSite, DfsSport } from '../dfs.const';
import { DfsSlatePlayer } from '../mlb/models/dfsPlayer.interface';
import { SlateAttributes } from '../mlb/models/slate.interface';
import { DfsSlate, SlateMaster } from '../mlb/models/slateMaster.interface';
import { SlatePlayerAttr } from '../mlb/models/slatePlayer.interface';
import { SiteSlateConfig, SlateConfig } from '../mlb/models/slateSettings.interface';

@Injectable({
  providedIn: 'root',
})
export class DfsService {
  private BASE_URL = 'https://rotogrinders.com/schedules';

  constructor(private apiService: ApiService) {}

  fetchRoto = (sport: string, site: string, slate: DfsSlate) => {
    const $players = this.getPlayersBySlate(slate.slate_path);
    const $games = this.getGameAttrBySlateId(sport, site, slate.importId);
    return forkJoin([$players, $games]);
  };

  getPlayersBySlate = slatePath => this.apiService.get<DfsSlatePlayer[]>(slatePath, { params: this.httpParams });

  getGameAttrBySlateId = (sport: string, site: string, slateId: string) =>
    this.apiService.get<SlateAttributes>(`${this.BASE_URL}/${sport}/game-attributes`, {
      params: this.gameAttributeParams.append('slate_id', slateId).append('site', site ?? 'draftkings'),
    });

  /**
   * TODO: Remove
   *
   * @deprecated
   *
   */
  getSlatesByDate = (site: string, sport: string) =>
    this.apiService.get<SlateMaster>(
      `https://s3.amazonaws.com/json.rotogrinders.com/v2.00/${currentDate('/')}/slates/${sport}-master.json`
    );

  /**
   * TODO: Remove
   *
   * @deprecated
   *
   */
  getSlatesSettings = () =>
    this.apiService.get<SiteSlateConfig>(`https://s3.amazonaws.com/json.rotogrinders.com/lineuphq/slate-definitions-v1.json`, {
      params: this.httpParams,
    });

  private get httpParams() {
    let params = new HttpParams();
    params = params.append('timestamp', `${+new Date()}`);
    return params;
  }

  private get gameAttributeParams() {
    let params = new HttpParams();
    params = params.append('date', currentDate('-'));
    params = params.append('timestamp', (+new Date()).toString());
    return params;
  }
}

