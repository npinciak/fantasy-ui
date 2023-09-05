import { Component, Input, OnInit } from '@angular/core';
import { ServiceWorkerService } from '../../@shared/services/service-worker.service';
import { AuthenticationService } from '../authentication/services/authentication.service';
import { RouterFacade } from '../store/router/router.facade';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
})
export class ShellComponent implements OnInit {
  @Input() pageTitle = 'SportsUi';

  isOnline$ = this.serviceWorkerService.isOnline$;

  readonly systemStatusNavList = [{ id: '6', routerLink: '/system-status', label: 'System Status' }];

  constructor(
    readonly authService: AuthenticationService,
    readonly routerFacade: RouterFacade,
    private serviceWorkerService: ServiceWorkerService
  ) {}

  onProfileClick(): void {
    this.routerFacade.navigateToMyProfile();
  }

  onTitleClick(): void {
    this.routerFacade.navigateEspn();
  }

  ngOnInit(): void {
    this.serviceWorkerService.checkForUpdates();

    window.addEventListener('online', this.serviceWorkerService.updateOnlineStatus.bind(this));
    window.addEventListener('offline', this.serviceWorkerService.updateOnlineStatus.bind(this));
  }
}
