/**
 * @deprecated Use sdk StatusCode instead
 */
export enum StatusCode {
  Ok = 200,
  NoContent = 204,
  BadRequest = 400,
}

/**
 * @deprecated Use sdk ErrorStatusCode instead
 */
export enum ErrorStatusCode {
  Unknown = 0,
  BadRequest = 400,
  Unauthorized,
  Forbidden = 403,
  NotFound,
  NotAcceptable = 406,
  InternalServerError = 500,
  BadGateway = 502,
  ServiceUnavailable,
  GatewayTimeout,
}

/**
 * @deprecated Use sdk statusCodeToEspnMessage instead
 */
export const statusCodeToEspnMessage: { [key in ErrorStatusCode]: string } = {
  [ErrorStatusCode.Unknown]: 'Invalid LeagueId',
  [ErrorStatusCode.BadRequest]: 'Bad Request',
  [ErrorStatusCode.Unauthorized]: 'Unauthorized, not a public league',
  [ErrorStatusCode.Forbidden]: 'Forbidden',
  [ErrorStatusCode.NotFound]: 'League does not exist',
  [ErrorStatusCode.NotAcceptable]: 'Not Acceptable',
  [ErrorStatusCode.InternalServerError]: 'Internal Server Error',
  [ErrorStatusCode.BadGateway]: 'Bad Gateway',
  [ErrorStatusCode.ServiceUnavailable]: 'Service Unavailable',
  [ErrorStatusCode.GatewayTimeout]: 'Gateway Timeout',
} as const;

/**
 * @deprecated Use sdk statusCodeToMessage instead
 */
export const statusCodeToMessage: { [key in ErrorStatusCode]: string } = {
  [ErrorStatusCode.Unknown]: 'Could not contact server',
  [ErrorStatusCode.BadRequest]: 'Bad Request',
  [ErrorStatusCode.Unauthorized]: 'Unauthorized',
  [ErrorStatusCode.Forbidden]: 'Forbidden',
  [ErrorStatusCode.NotFound]: 'Resource Not Found',
  [ErrorStatusCode.NotAcceptable]: 'Not Acceptable',
  [ErrorStatusCode.InternalServerError]: 'Internal Server Error',
  [ErrorStatusCode.BadGateway]: 'Bad Gateway',
  [ErrorStatusCode.ServiceUnavailable]: 'Service Unavailable',
  [ErrorStatusCode.GatewayTimeout]: 'Gateway Timeout',
} as const;
