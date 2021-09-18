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
    const statusText = response.statusText;
    let message = '';

    switch (code) {
      case 0:
        message = 'Could not contact server';
        break;

      default:
        message = response.error.message;
        break;
    }

    this.snackBar.open(`${code}: ${message}`, 'Close', {
      panelClass: ['mat-toolbar', 'mat-warn', 'text-white'],
    });

    throw response;
  }
}

export enum ErrorStatusCode {
  Unknown = 0,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotAcceptable = 406,
  InternalServerError = 500,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
}
