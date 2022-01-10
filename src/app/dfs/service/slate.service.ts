import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '@app/@shared/services/api.service';
import { DailyFantasyEndpointBuilder } from '../daily-fantasy-url-builder';
import { SlateMaster } from '../models/daily-fantasy-client.model';

@Injectable({
  providedIn: 'root',
})
export class SlateService {
  constructor(private apiService: ApiService) {}

  slatesByDate(sport: string): Observable<SlateMaster> {
    const endpoint = new DailyFantasyEndpointBuilder(sport);
    return this.apiService.get<SlateMaster>(endpoint.slateMaster);
  }
}
