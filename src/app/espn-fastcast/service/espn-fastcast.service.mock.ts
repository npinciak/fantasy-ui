import { Mock } from '@app/@shared/models/mock.model';
import { Observable, of } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { EspnWebSocket, SocketRes } from '../models/espn-fastcast-socket.model';
import { EspnClientFastcast } from '../models/espn-fastcast.model';
import { EspnFastcastService } from './espn-fastcast.service';

export class EspnFastcastServiceMock implements Mock<EspnFastcastService> {
  webSocket$: WebSocketSubject<SocketRes>;

  fastCastWebsocket(): Observable<EspnWebSocket> {
    return of({
      ip: 'p2b6d3e30-7fa9-4f77-8624-5ace7141a04a-35-175-217-124.my.test.websocket.com',
      token: 'MTY0NTgzNTAxNjg3Mw==:Z0IkyvJlpFGdtpKO2s9VFLkOs+E=',
      port: 9571,
      securePort: 9573,
    });
  }

  connect(url: string) {
    if (!this.webSocket$ || this.webSocket$.closed) {
      this.webSocket$ = webSocket(url);
    }
    return this.webSocket$;
  }

  dataUpdates$(): Observable<EspnClientFastcast> {
    return of();
  }

  disconnect(): void {}

  closeConnection(): void {}

  sendMessage(msg: unknown): void {}
}
