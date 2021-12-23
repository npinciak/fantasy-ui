import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { currentDate } from '@app/@shared/helpers/date';
import { ApiService } from '@app/@shared/services/api.service';
import { SlateMaster } from '../models/slateMaster.interface';
import { SiteSlateConfig } from '../models/slateSettings.interface';

@Injectable({
  providedIn: 'root',
})
export class SlateService {
  private BASE_URL = 'https://s3.amazonaws.com/json.rotogrinders.com';
  private VERSION = 'v2.00';

  constructor(private apiService: ApiService) {}

  slatesByDate = (sport: string) =>
    this.apiService.get<SlateMaster>(`${this.BASE_URL}/${this.VERSION}/${currentDate('/')}/slates/${sport}-master.json`);

  slateConfigurations = () =>
    this.apiService.get<SiteSlateConfig>(`${this.BASE_URL}/lineuphq/slate-definitions-v1.json`, {
      params: this.httpParams,
    });

  private get httpParams() {
    let params = new HttpParams();
    params = params.append('timestamp', `${+new Date()}`);
    return params;
  }
}
