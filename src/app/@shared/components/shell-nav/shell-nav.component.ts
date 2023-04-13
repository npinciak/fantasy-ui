import { Component, Input, OnInit } from '@angular/core';
import { RouterFacade } from '@app/@core/store/router/router.facade';

@Component({
  selector: 'app-shell-nav',
  templateUrl: './shell-nav.component.html',
})
export class ShellNavComponent implements OnInit {
  @Input() appTitle: string;
  constructor(readonly routerFacade: RouterFacade) {}

  ngOnInit(): void {}

  collapseShow = 'hidden';

  toggleCollapseShow(classes) {
    this.collapseShow = classes;
  }

  get dfsMenu() {
    return [
      { routerLink: ['/daily-fantasy/mlb'], queryParams: { site: 'draftkings' }, label: 'DK MLB' },
      { routerLink: ['/daily-fantasy/nfl'], queryParams: { site: 'draftkings' }, label: 'DK NFL' },
      { routerLink: ['/daily-fantasy/nba'], queryParams: { site: 'draftkings' }, label: 'DK NBA' },
    ];
  }

  // onNavigateToMyProfile() {
  //   this.routerFacade.navigateToMyProfile();
  // }

  // onNavigateToEspnHome() {
  //   this.routerFacade.navigateToEspnHome();
  // }

  // onNavigateToEspnLeagueHome() {
  //   // this.routerFacade.navigateToLeagueHome(this.routerFacade.sport, this.routerFacade.leagueId,2022);
  // }

  // onNavigateToEspnFreeAgents() {
  //   this.routerFacade.navigateToFantasyFreeAgents();
  // }

  // navigateDraftkingsNfl() {
  //   this.routerFacade.navigateToDraftkingsBySport('nfl');
  // }

  // navigateDraftkingsMlb() {
  //   this.routerFacade.navigateToDraftkingsBySport('mlb');
  // }

  // navigateDraftkingsNba() {
  //   this.routerFacade.navigateToDraftkingsBySport('nba');
  // }
}
