import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/@shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class EspnService {

  constructor(private api: ApiService) { }

  private fantasyBase = 'https://fantasy.espn.com/apis/v3';
  private apiBase = 'https://site.api.espn.com/apis';

}
