import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => this.errorHandler(error)));
  }

  private errorHandler(response: HttpErrorResponse): Observable<HttpEvent<any>> {
    const code = response.status || 0;
    const message = statusCodeToMessage[code];

    this.snackBar.open(`${code}: ${message}`, 'x', {
      panelClass: ['mat-toolbar', 'mat-warn'],
    });

    throw response;
  }
}

export enum StatusCode {
  Ok = 200,
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
