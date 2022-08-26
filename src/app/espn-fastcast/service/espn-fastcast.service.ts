import { Injectable } from '@angular/core';
import { ApiService } from '@app/@shared/services/api.service';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { EspnWebSocket, SocketRes } from '../../espn-fastcast/models/espn-fastcast-socket.model';
import { FASTCAST_WS_HOST } from '../../espn/espn.const';

@Injectable({
  providedIn: 'root',
})
export class EspnFastcastService {
  static readonly WS_HOST = FASTCAST_WS_HOST;

  public webSocket$: WebSocketSubject<SocketRes> | null;

  constructor(private api: ApiService) {}

  fastCastWebsocket(): Observable<EspnWebSocket> {
    return this.api.get<EspnWebSocket>(EspnFastcastService.WS_HOST);
  }

  connect(uri: string): WebSocketSubject<SocketRes> {
    if (!this.webSocket$ || this.webSocket$.closed) {
      this.webSocket$ = webSocket(uri);
    }
    return this.webSocket$;
  }

  sendMessage(msg: any): void {
    if (!this.webSocket$) {
      return;
    }
    this.webSocket$.next(msg);
  }

  disconnect(): void {
    if (this.webSocket$ != null) {
      this.webSocket$.complete();
      this.webSocket$ = null;
    }
    console.log('disconnect ===> ', this.webSocket$);
  }
}
