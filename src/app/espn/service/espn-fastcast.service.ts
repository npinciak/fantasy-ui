import { Injectable } from '@angular/core';
import { ApiService } from '@app/@shared/services/api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { FASTCAST_WS_HOST } from '../espn.const';
import { EspnWebSocket, SocketRes } from '../models/espn-fastcast-socket.model';

@Injectable({
  providedIn: 'root',
})
export class EspnFastcastService {
  static readonly WS_HOST = FASTCAST_WS_HOST;

  public webSocketSubject$: WebSocketSubject<SocketRes>;

  constructor(private api: ApiService) {}

  fastCastWebsocket(): Observable<EspnWebSocket> {
    return this.api.get<EspnWebSocket>(EspnFastcastService.WS_HOST).pipe(map(res => res));
  }

  connect(uri: string): WebSocketSubject<SocketRes> {
    if (!this.webSocketSubject$ || this.webSocketSubject$.closed) {
      this.webSocketSubject$ = webSocket(uri);
    }
    return this.webSocketSubject$;
  }

  sendMessage(msg: unknown): void {
    return this.webSocketSubject$.next(msg);
  }

  disconnect(): void {
    return this.webSocketSubject$.complete();
  }
}
