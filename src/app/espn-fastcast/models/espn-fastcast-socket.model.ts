import { StatusCode } from '@app/@core/interceptors/error-handler.interceptor';

interface WebSocketResponseProperties {
  hbi: number;
  op: OperationCode; // operationcode
  rc: StatusCode; //response code
  sid: string; //sessionID
  pl: string; // payload?
  tc: string;
  ts: number;
  useCDN: boolean;
  edgeUrl: string;
  '~c': number;
  mid?: string; //message ID ?
  oat: unknown;
  tp: unknown;
  msg: string;
}

export interface EspnWebSocket {
  ip: string;
  token: string;
  port: number;
  securePort: number;
}

export type SocketRes = Partial<WebSocketResponseProperties>;
export type SocketResSuccess = Pick<WebSocketResponseProperties, 'mid' | 'op' | 'pl' | 'tc' | 'useCDN'>;
export type SocketMsg = Pick<WebSocketResponseProperties, 'sid' | 'tc'> & { op: OperationCode.S };
export type OpCodePRes = Pick<WebSocketResponseProperties, 'ts' | '~c' | 'pl'>;

export enum OperationCode {
  B = 'B',
  C = 'C',
  H = 'H',
  S = 'S', // send?
  R = 'R', // replace?
  P = 'P',
  I = 'I',
  Replace = 'Replace',
  Error = 'ERROR',
}

export enum FastcastEventType {
  TopEvents = 'event-topevents',
  Soccer = 'event-topsoccer',
  Mlb = 'event-baseball-mlb',
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
