import { Component, OnInit } from '@angular/core';
import { ServiceWorkerService } from '@app/@shared/services/service-worker.service';

@Component({
  selector: 'app-system-status',
  templateUrl: './system-status.component.html',
})
export class SystemStatusComponent implements OnInit {
  isOnline$ = this.swService.isOnline$;
  isIosAndSafari = this.swService.isIosAndSafari;
  isServiceWorkerEnabled = this.swService.isServiceWorkerEnabled;
  isStandaloneMode$ = this.swService.isInStandaloneMode$;
  isUpdateAvailable$ = this.swService.isUpdateAvailable$;

  constructor(private swService: ServiceWorkerService) {}

  ngOnInit(): void {
    this.swService.checkForUpdates();
    this.swService.isStandaloneMode();
  }

  clickInstallPwa() {
    this.swService.installPwa();
  }

  clickUpdate() {
    this.swService.updatePwa();
  }
}
