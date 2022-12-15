import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { exists } from '@app/@shared/helpers/utils';
import { ErrorStatusCode, statusCodeToEspnMessage, statusCodeToMessage } from '@app/@shared/models/http-errors.model';
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
