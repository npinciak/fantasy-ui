import { Mock } from '@app/@shared/models/mock.model';
import { Observable, of } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { SocketRes } from '../models/espn-fastcast-socket.model';
import { EspnClientFastcast } from '../models/espn-fastcast.model';
import { EspnFastcastService } from './espn-fastcast.service';

export class EspnFastcastServiceMock implements Mock<EspnFastcastService> {
  webSocketSubject$: WebSocketSubject<SocketRes> = new WebSocketSubject('ws://example.com');

  fastCastWebsocket(): Observable<void> {
    return of();
  }

  connect(): WebSocketSubject<EspnClientFastcast> {
    return new WebSocketSubject<EspnClientFastcast>('');
  }

  dataUpdates$(): Observable<EspnClientFastcast> {
    return of();
  }

  disconnect(): void {}

  closeConnection(): void {}

  sendMessage(msg: unknown): void {}
}
