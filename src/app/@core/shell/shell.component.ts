import { Component, Input, OnInit } from '@angular/core';
import { UrlBuilder, UrlFragments, UrlQueryParams } from '@app/@shared/url-builder';
import { EspnFastcastFacade } from '@app/espn-fastcast/facade/espn-fastcast.facade';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { RouterFacade } from '../store/router/router.facade';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  @Input() pageTitle = 'SportsUi';

  readonly URL_FRAGMENT = UrlFragments;
  readonly URL_QUERY_PARAMS = UrlQueryParams;
  readonly UrlBuilder = UrlBuilder;

  leagueId = this.routerFacade.leagueId;
  teamId = this.routerFacade.teamId;

  constructor(private fastcastFacade: EspnFastcastFacade, readonly routerFacade: RouterFacade, private store: Store) {}

  ngOnInit(): void {
    this.fastcastFacade.connect();
  }

  get menu() {
    return [
      { label: 'Espn', route: UrlBuilder.espnBaseUrl, children: null },
      {
        label: 'DFS',
        route: '',
        children: [
          { label: 'MLB', route: UrlBuilder.dfsBase, children: null },
          { label: 'NFL', route: UrlBuilder.dfsBase, children: null },
        ],
      },
    ];
  }

  navigate() {
    this.store.dispatch(
      new Navigate(['daily-fantasy'], {
        sport: 'mlb',
        site: 'draftkings',
      })
    );
  }
}

export const menu: Menu[] = [
  { label: 'Espn', route: UrlBuilder.espnBaseUrl, children: null },
  // {
  //   label: 'DFS',
  //   route: '',
  //   children: [
  //     { label: 'MLB', route: UrlBuilder.dfsBase, children: null },
  //     { label: 'NFL', route: UrlBuilder.dfsBase, children: null },
  //   ],
  // },
];

interface Menu {
  label: string;
  route: string;
  children: Menu[] | null;
}

// <mat-menu #menu="matMenu">
//     <button mat-menu-item [routerLink]="UrlBuilder.espnBaseUrl">ESPN</button>
//     <button mat-menu-item [matMenuTriggerFor]="dfs">DFS</button>
//   </mat-menu>

//   <mat-menu #espn="matMenu">
//     <button mat-menu-item [routerLink]="UrlBuilder.espnMlbBase" disabled>NFL</button>
//     <button disabled mat-menu-item [routerLink]="UrlBuilder.espnMlbBase" disabled>MLB</button>
//   </mat-menu>

//   <mat-menu #dfs="matMenu">
//     <button mat-menu-item [matMenuTriggerFor]="dfsNflSite">NFL</button>
//     <button mat-menu-item [matMenuTriggerFor]="dfsNbaSite">NBA</button>
//     <button mat-menu-item [matMenuTriggerFor]="dfsMlbSite">MLB</button>
//   </mat-menu>

//   <mat-menu #dfsNflSite="matMenu">
//     <button mat-menu-item [routerLink]="UrlBuilder.dfsBase" [queryParams]="{ sport: 'nfl', site: 'draftkings' }">DK</button>
//     <button mat-menu-item [routerLink]="UrlBuilder.dfsBase" [queryParams]="{ sport: 'nfl', site: 'fanduel' }">FD</button>
//   </mat-menu>

//   <mat-menu #dfsMlbSite="matMenu">
//     <button mat-menu-item [routerLink]="UrlBuilder.dfsBase" [queryParams]="{ sport: 'mlb', site: 'draftkings' }">DK</button>
//     <button mat-menu-item [routerLink]="UrlBuilder.dfsBase" [queryParams]="{ sport: 'mlb', site: 'fanduel' }">FD</button>
//   </mat-menu>

//   <mat-menu #dfsNbaSite="matMenu">
//     <button mat-menu-item [routerLink]="UrlBuilder.dfsBase" [queryParams]="{ sport: 'nba', site: 'draftkings' }">DK</button>
//     <button mat-menu-item [routerLink]="UrlBuilder.dfsBase" [queryParams]="{ sport: 'nba', site: 'fanduel' }">FD</button>
//   </mat-menu>
