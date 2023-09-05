import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject } from 'rxjs';

import { Platform } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';
import { BeforeInstallPromptEvent } from '@sports-ui/ui-sdk/pwa';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServiceWorkerService {
  showOnlineStatus$ = new BehaviorSubject<boolean>(true);
  isOnline$ = new BehaviorSubject<boolean>(true);
  isInStandaloneMode$ = new BehaviorSubject<boolean>(false);

  modalPwaPlatform: string;
  modalPwaEvent: BeforeInstallPromptEvent;

  // window.addEventListener('online', this.updateOnlineStatus.bind(this));
  // window.addEventListener('offline', this.updateOnlineStatus.bind(this));

  constructor(private sw: SwUpdate, private platform: Platform) {}

  listenToOnlineStatus() {
    window.addEventListener('online', this.updateOnlineStatus.bind(this));
    window.addEventListener('offline', this.updateOnlineStatus.bind(this));
  }

  updateOnlineStatus(): void {
    this.isOnline$.next(window.navigator.onLine);
    console.log(`isOnline=[${window.navigator.onLine}]`);
  }

  async checkForUpdates() {
    this.loadModalPwa();

    if (!environment.production) return;

    const hasUpdate = await this.sw.checkForUpdate();

    console.log('hasUpdateAgain!', hasUpdate);

    const activateUpdate = await this.sw.activateUpdate();

    if (activateUpdate) {
      console.log('activateUpdate!', activateUpdate);

      document.location.reload();
    }

    // this.sw.versionUpdates.subscribe(event => {
    //   console.log('current version is', event.)
    //       console.log('available version is', event.type);
    //   this.sw.activateUpdate().then(() => document.location.reload());
    // });

    // this.sw.activated.subscribe(event => {
    //   console.log('old version was', event.previous);
    //   console.log('new version is', event.current);
    // });
  }

  installPwa(): void {
    this.modalPwaEvent.prompt();
  }

  loadModalPwa() {
    // if (this.platform.) {
    window.addEventListener('beforeinstallprompt', (event: BeforeInstallPromptEvent) => {
      event.preventDefault();

      this.modalPwaEvent = event;
    });

    //   console.log(this.modalPwaEvent);
    // }

    if (this.isIosAndSafari) {
      const isInStandaloneMode = 'standalone' in window.navigator && (<any>window.navigator)['standalone'];
      if (!isInStandaloneMode) this.modalPwaPlatform = 'IOS';
    }
  }

  get isAndroid(): boolean {
    return this.platform.ANDROID;
  }

  get isIosAndSafari(): boolean {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);

    // return this.platform.IOS && this.platform.SAFARI;
  }

  get isServiceWorkerEnabled() {
    return this.sw.isEnabled;
  }

  isStandaloneMode() {
    return this.isInStandaloneMode$.next('standalone' in window.navigator && (<any>window.navigator)['standalone']);
  }

  cache() {}

  //   this.updateOnlineStatus();

  //   private updateOnlineStatus(): void {
  //     this.isOnline$.next(window.navigator.onLine);

  //     setTimeout(async () => {
  //       this.showOnlineStatus$.next(false);
  //     }, 2000);

  //     console.info(`isOnline=[${window.navigator.onLine}]`);
  //   }

  //   <ng-container *ngIf="showOnlineStatus$ | async">
  //   <div class="p-2 text-center text-xs font-bold text-white" [class.bg-red-700]="!(isOnline$ | async)" [class.bg-green-500]="isOnline$ | async">
  //     {{ (isOnline$ | async) ? 'Online' : 'Offline' }}
  //   </div>
  // </ng-container>
}
