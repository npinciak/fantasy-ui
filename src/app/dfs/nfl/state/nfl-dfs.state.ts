import { Injectable } from '@angular/core';
import { Selector, State, Store } from '@ngxs/store';
import { PlayerService } from '../../service/player.service';
import { NFLClientPlayerAttributesMap, NFLClientSlateAttrTeamMap } from '../models/nfl-client.model';

export class NflDfsStateModel {
  masterPlayers: { [id: string]: any };
  slatePlayers: NFLClientPlayerAttributesMap;
  slateTeams: NFLClientSlateAttrTeamMap;
  gridIronPlayers: { [id: string]: any };
  slate: string;
  site: string;
  loading: boolean;
}

const defaults = {
  masterPlayers: {},
  slatePlayers: {},
  slateTeams: {},
  gridIronPlayers: {},
  slate: null,
  site: null,
  loading: false,
};

@State<NflDfsStateModel>({
  name: 'nflDfs',
  defaults,
})
@Injectable()
export class NflDfsState {
  constructor(private store: Store, private playerService: PlayerService) {}

  @Selector()
  static loading(state: NflDfsStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static slate(state: NflDfsStateModel): string {
    return state.slate;
  }

  @Selector()
  static site(state: NflDfsStateModel): string {
    return state.site;
  }

  @Selector()
  static gridIronPlayers(state: NflDfsStateModel): { [id: string]: any } {
    return state.gridIronPlayers;
  }

  @Selector()
  static masterPlayers(state: NflDfsStateModel): { [id: string]: any } {
    return state.masterPlayers;
  }

  @Selector()
  static slatePlayers(state: NflDfsStateModel): NFLClientPlayerAttributesMap {
    return state.slatePlayers;
  }

  @Selector()
  static slateTeams(state: NflDfsStateModel): NFLClientSlateAttrTeamMap {
    return state.slateTeams;
  }
}
