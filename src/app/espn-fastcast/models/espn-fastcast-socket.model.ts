import { ErrorStatusCode } from '@app/@core/interceptors/error-handler.interceptor';
import { exists } from '@app/@shared/helpers/utils';
import { FASTCAST_SERVICE_URI } from '@app/espn/espn.const';

interface WebSocketResponseProps {
  hbi: number;
  op: OperationCode; // operationcode
  rc: ErrorStatusCode; //response code
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

export type SocketRes = Partial<WebSocketResponseProps>;
export type SocketResSuccess = Pick<WebSocketResponseProps, 'mid' | 'op' | 'pl' | 'tc' | 'useCDN'>;
export type SocketMsg = Pick<WebSocketResponseProps, 'sid' | 'tc'> & { op: OperationCode.S };
export type OpCodePRes = Pick<WebSocketResponseProps, 'ts' | '~c' | 'pl'>;

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
  LiveGame = 'gp',
  Event = 'event',
}

/**
 *
 * Transform fastcast event slug to live game
 * @param payload  ```typescript
 *
 * {
 *    sport: string;
 *    league: string;
 *    gameId: string
 * }
 *
 * ```
 * @returns ```typescript
 * Ex: gp-baseball-mlb-401355468
 * ```
 *
 */
export function transformEventToLiveFastcastEventType(payload: { sport: string; league: string; gameId: string }) {
  return `${FastcastEventType.LiveGame}-${payload.sport}-${payload.sport}-${payload.gameId}`;
}

/**
 *
 * Transform fastcast sport
 * @param payload  ```typescript
 *
 * {
 *    sport: string;
 *    league: string;
 * }
 *
 * ```
 * @returns ```typescript
 * Ex: event-baseball-mlb
 * ```
 *
 */
export function transformSportToFastcastEventType(payload: { sport: string; league: string }): string;
export function transformSportToFastcastEventType(payload: { sport: string }): string;
export function transformSportToFastcastEventType(payload: { sport: string; league?: string }): string {
  if (!exists(payload.league)) {
    `${FastcastEventType.Event}-${payload.sport}`;
  }
  return `${FastcastEventType.Event}-${payload.sport}-${payload.league}`;
}

export class WebSocketBuilder {
  private static _protocol = 'wss://';
  private static _path = FASTCAST_SERVICE_URI;

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
    return `${WebSocketBuilder._protocol}${this._websocket.ip}:${this._websocket.securePort}`;
  }
}
