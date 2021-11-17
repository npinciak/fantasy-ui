import { Injectable } from '@angular/core';
import { UrlBuilder } from '../url-builder';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  constructor() {}

  public getEspnMlbLeague(leagueId: string) {
    return UrlBuilder.espnMlbLeague(leagueId);
  }

  public getEspnNflLeague(leagueId: string) {
    return UrlBuilder.espnNflLeague(leagueId);
  }

  public getDfsMlb() {
    return UrlBuilder.dfsMlbBase;
  }

  public getDfsNfl() {
    return UrlBuilder.dfsNflBase;
  }
}
