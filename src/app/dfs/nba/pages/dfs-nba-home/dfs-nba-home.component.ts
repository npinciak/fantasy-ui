import { Component, OnInit } from '@angular/core';
import { DfsMatchupFacade } from '@app/dfs/facade/dfs-matchup.facade';
import { DfsPlayersFacade } from '@app/dfs/facade/dfs-players.facade';
import { DailyFantasySlateAttrFacade } from '@app/dfs/facade/dfs-slate-attr.facade';
import { DfsSlatesFacade } from '@app/dfs/facade/dfs-slates.facade';
import { DfsNbaSlatePlayerFacade } from '../../facade/dfs-nba-slate-players.state';

@Component({
  selector: 'app-dfs-nba-home',
  templateUrl: './dfs-nba-home.component.html',
  styleUrls: ['./dfs-nba-home.component.scss'],
})
export class DfsNbaHomeComponent implements OnInit {
  playerList$ = this.nbaPlayerFacade.getList$;

  constructor(
    readonly nbaPlayerFacade: DfsNbaSlatePlayerFacade,
    readonly dailyFantasyPlayersFacade: DfsPlayersFacade,
    readonly dailyFantasySlateFacade: DfsSlatesFacade,
    readonly dailyFantasySlateAttrFacade: DailyFantasySlateAttrFacade,
    readonly dailyFantasyMatchupFacade: DfsMatchupFacade
  ) {}

  ngOnInit(): void {}
}
