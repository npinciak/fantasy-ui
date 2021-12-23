export interface EspnWebSocket {
  ip: string;
  token: string;
  port: number;
  securePort: number;
}

export interface SocketRes {
  hbi: number;
  op: OPCode;
  rc: number;
  sid: string;
  pl: string;
  mid?: string;
}

export interface SocketResSuccess {
  mid: number;
  op: OPCode;
  pl: string;
  tc: string;
  useCDN: boolean;
}

export interface SocketMsg {
  op: OPCode.S;
  sid: string;
  tc: string;
}

export enum OPCode {
  B = 'B',
  C = 'C',
  H = 'H',
  S = 'S',
  R = 'R',
  P = 'P',
  I = 'I',
  Error = 'ERROR',
}

export interface OpCodePRes {
  ts: number;
  '~c': number;
  pl: string;
}

export class WebSocketBuilder {
  private static _protocol = 'wss://';
  private static _path = 'FastcastService/pubsub/profiles/12000';

  private _websocket: EspnWebSocket;
  constructor(websocket: EspnWebSocket) {
    this._websocket = websocket;
  }

  get websocketUri() {
    return `${this._protocolIpPort}${WebSocketBuilder._path}?${this._params}`;
  }

  private get _params() {
    return `TrafficManager-Token=${this._websocket.token}`;
  }

  private get _protocolIpPort() {
    return `${WebSocketBuilder._protocol}${this._websocket.ip}:${this._websocket.securePort}/`;
  }
}
