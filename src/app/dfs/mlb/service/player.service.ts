import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@app/@shared/services/api.service';
import { DfsSlatePlayer } from '../models/dfsPlayer.interface';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private apiService: ApiService) {}

  playersBySlate = (slatePath: string) => this.apiService.get<DfsSlatePlayer[]>(slatePath, { params: this.httpParams });

  private get httpParams() {
    let params = new HttpParams();
    params = params.append('timestamp', `${+new Date()}`);
    return params;
  }
}
