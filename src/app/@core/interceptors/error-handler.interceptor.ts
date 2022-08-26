import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { exists } from '@app/@shared/helpers/utils';
import { FANTASY_BASE_V3, FASTCAST_BASE } from '@app/espn/espn.const';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RouterFacade } from '../store/router/router.facade';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar, readonly routerFacade: RouterFacade) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => this.errorHandler(error)));
  }

  private errorHandler(response: HttpErrorResponse): Observable<HttpEvent<any>> {
    const isEspnFantasy = exists(response.url) ? response.url.includes(FANTASY_BASE_V3) : false;
    const isEspnFastcast = exists(response.url) ? response.url.includes(FASTCAST_BASE) : false;

    if (isEspnFastcast) {
      // this.store.dispatch(DisconnectWebSocket);
    }

    const code = response.status || 0;

    const message = isEspnFantasy ? statusCodeToEspnMessage[code] : statusCodeToMessage[code];

    if (isEspnFantasy && code === ErrorStatusCode.NotFound) {
      this.routerFacade.navigateToEspnHome();
    }

    this.snackBar.open(`${code}: ${message}`, 'x', {
      panelClass: ['mat-toolbar', 'mat-warn'],
      duration: 3000,
    });

    throw response;
  }
}

export enum StatusCode {
  Ok = 200,
  NoContent = 204,
  BadRequest = 400,
}

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

const statusCodeToEspnMessage: { [key in ErrorStatusCode]: string } = {
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
};

const statusCodeToMessage: { [key in ErrorStatusCode]: string } = {
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
};
