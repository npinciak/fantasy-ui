import { WebSocketConnectionInfo } from './websocket.model';

export class WebSocketBuilder {
  private static _protocol = 'wss://';

  private _path = '';
  private _websocket: WebSocketConnectionInfo;

  constructor(websocket: WebSocketConnectionInfo, path: string) {
    this._websocket = websocket;
    this._path = path;
  }

  get websocketUri() {
    return `${this._protocolIpPort}${this._path}?${this._params}`;
  }

  private get _params() {
    return `TrafficManager-Token=${this._websocket.token}`;
  }

  private get _protocolIpPort() {
    return `${WebSocketBuilder._protocol}${this._websocket.ip}:${this._websocket.securePort}`;
  }
}
