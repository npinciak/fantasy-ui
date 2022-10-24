import { Component, Input, OnInit } from '@angular/core';
import { UrlBuilder, UrlFragments, UrlQueryParams } from '@app/@core/store/router/url-builder';
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
  sport = this.routerFacade.sport;

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

export const menu: Menu[] = [{ label: 'Espn', route: UrlBuilder.espnBaseUrl, children: null }];

interface Menu {
  label: string;
  route: string;
  children: Menu[] | null;
}
