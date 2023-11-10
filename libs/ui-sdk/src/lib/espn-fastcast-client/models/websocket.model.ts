import { ErrorStatusCode } from '../../helpers/http-errors.model';
import { OPERATION_CODE } from './websocket.const';

export type OperationCode = typeof OPERATION_CODE[keyof typeof OPERATION_CODE];

export type WebSocketResponseProps = {
  /**
   * Heartbeat interval
   */
  hbi: number;
  /**
   * Operation code
   */
  op: OperationCode;
  /**
   * Response code
   */
  rc: ErrorStatusCode;
  /**
   * Session ID
   */
  sid: string;
  /**
   * Payload
   */
  pl: string;
  tc: string;
  /**
   * Timestamp
   */
  ts: number;
  /**
   * Use CDN
   */
  useCDN: boolean;
  /**
   * Edge URL
   */
  edgeUrl: string;
  '~c': number;
  /**
   * Message ID
   */
  mid?: string;
  oat: unknown;
  /**
   * Type
   */
  tp: unknown;
  /**
   * Message
   */
  msg: string;
};

export interface WebSocketConnectionInfo {
  ip: string;
  token: string;
  port: number;
  securePort: number;
}

export type SocketRes = Partial<WebSocketResponseProps>;
export type SocketResSuccess = Pick<WebSocketResponseProps, 'mid' | 'op' | 'pl' | 'tc' | 'useCDN'>;
export type SocketMsg = Pick<WebSocketResponseProps, 'sid' | 'tc'> & { op: OperationCode };
export type OpCodePRes = Pick<WebSocketResponseProps, 'ts' | '~c' | 'pl'>;
