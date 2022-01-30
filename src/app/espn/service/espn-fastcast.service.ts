import { Injectable } from '@angular/core';
import { ApiService } from '@app/@shared/services/api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { FASTCAST_WS_HOST } from '../espn.const';
import { EspnWebSocket, OperationCode, SocketRes, WebSocketBuilder } from '../models/espn-fastcast-socket.model';

@Injectable({
  providedIn: 'root',
})
export class EspnFastcastService {
  static readonly WS_HOST = FASTCAST_WS_HOST;

  public webSocketSubject$: WebSocketSubject<SocketRes>;

  constructor(private api: ApiService) {}

  fastCastWebsocket(): Observable<void> {
    return this.api.get<EspnWebSocket>(EspnFastcastService.WS_HOST).pipe(
      map(res => {
        const socket = new WebSocketBuilder(res);
        this.connect(socket.websocketUri);
      })
    );
  }

  connect(uri: string): void {
    if (!this.webSocketSubject$ || this.webSocketSubject$.closed) {
      this.webSocketSubject$ = webSocket(uri);
      this.sendMessage({ op: OperationCode.C });
    }
  }

  sendMessage(msg: unknown): void {
    return this.webSocketSubject$.next(msg);
  }

  disconnect(): void {
    console.log('disconnect()');
    return this.webSocketSubject$.complete();
  }
}
