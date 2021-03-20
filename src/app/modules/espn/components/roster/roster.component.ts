import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EspnService, Sports } from '../../espn.service';
import { FantasyPlayer, PlayerNews } from '../../models/fantasy-player.class';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss']
})
export class RosterComponent implements OnChanges {
  @Input() fantasyPlayers: FantasyPlayer[];
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  dataSource = new MatTableDataSource<FantasyPlayer>();
  playerNews: PlayerNews;

  readonly rosterColumns = [
    'lineupSlot',
    'name',
    'totalRatingSeason',
    'positionalRankingSeason',
    'ownershipChange',
    'percentOwned'
  ];

  constructor(private espnService: EspnService) { }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'fantasyPlayers':
            this.fantasyPlayers = changes[propName].currentValue;
            this.dataSource.data = this.fantasyPlayers;
            this.dataSource.sort = this.sort;
            // console.log(this.fantasyPlayers)
            break;
          default:
            break;
        }
      }
    }
  }

  playerInfo = (id: number) => this.espnService.getPlayer(7, id, Sports.mlb).subscribe(res => {
    if (res.resultsCount === 0) {
      return;
    }
    return this.playerNews = res;

  });

}
