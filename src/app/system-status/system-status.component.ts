import { Component, OnInit } from '@angular/core';
import { ServiceWorkerService } from '@app/@shared/services/service-worker.services';

@Component({
  selector: 'app-system-status',
  templateUrl: './system-status.component.html',
})
export class SystemStatusComponent implements OnInit {
  isOnline$ = this.swService.isOnline$;

  isServiceWorkerEnabled = this.swService.isServiceWorkerEnabled;

  constructor(private swService: ServiceWorkerService) {}

  ngOnInit(): void {}
}
