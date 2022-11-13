import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';
import { DailyFantasyNflPlayerSelectors } from '../selectors/daily-fantasy-nfl-players.selectors';

@Injectable({
  providedIn: 'root',
})
export class DailyFantasyNflPlayerFacade extends GenericFacade(DailyFantasyNflPlayerSelectors) {
  playerList$ = select(DailyFantasyNflPlayerSelectors.getPlayerTableData);
  teamList$ = select(DailyFantasyNflPlayerSelectors.getPlayerTeams);
  positionList$ = select(DailyFantasyNflPlayerSelectors.getPlayerPositions);

  playerScatterData$ = select(DailyFantasyNflPlayerSelectors.getPlayerScatterData);
  playerScatterAxisOptions$ = select(DailyFantasyNflPlayerSelectors.getPlayerScatterAxisOptions);

  playerTeamsFilterOptions$ = select(DailyFantasyNflPlayerSelectors.getPlayerTeamsFilterOptions);
  playerPositionFilterOptions$ = select(DailyFantasyNflPlayerSelectors.getPlayerPositionFilterOptions);
}
