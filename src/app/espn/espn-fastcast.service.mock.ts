import { Observable, of, Subject } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { EspnClientFastcast } from './models/espn-fastcast.model';
import { FASTCAST_MOCK } from './models/espn-fastcast.model.mock';
import { EspnFastcastService } from './espn-fastcast.service';
import { SocketRes } from './models/espn-fastcast-socket.model';

export type Mock<T> = { [key in keyof T]: T[key] };

export class EspnFastcastServiceMock implements Mock<EspnFastcastService> {
  webSocketSubject$: WebSocketSubject<SocketRes> = new WebSocketSubject('ws://example.com');

  fastCastWebsocket(): Observable<void> {
    return of();
  }

  connect(): WebSocketSubject<EspnClientFastcast> {
    return new WebSocketSubject<EspnClientFastcast>('');
  }

  dataUpdates$(): Observable<EspnClientFastcast> {
    return of(FASTCAST_MOCK);
  }

  disconnect(): void {}

  closeConnection(): void {}

  sendMessage(msg: any): void {}
}
