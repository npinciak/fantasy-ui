import { Component, OnDestroy, OnInit } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { filter } from 'rxjs/operators';
import { CustomRouterStateSerializer } from './@core/router/router-state.serializer';
import { SetRouterState } from './@core/router/router.state';
import { untilDestroyed } from './@shared/until-destroyed';

type NavigationComplete = NavigationEnd | NavigationCancel;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private store: Store, private router: Router, private customRouteStateSerializer: CustomRouterStateSerializer) {}

  ngOnInit() {
    this.router.events.pipe(untilDestroyed(this), filter(this.navigationComplete.bind(this))).subscribe(e => this.onNavigationComplete(e));
  }

  ngOnDestroy(): void {}

  private onNavigationComplete(event: any): void {
    this.setRouterState();
  }

  private navigationComplete(event: Event): event is NavigationComplete {
    return event instanceof NavigationEnd || event instanceof NavigationCancel;
  }

  private setRouterState(state?: RouterStateSnapshot): void {
    const routerStateParams = this.customRouteStateSerializer.serialize(state ?? this.router.routerState.snapshot).state;

    this.store.dispatch([new SetRouterState({ routerStateParams })]);
  }
}
