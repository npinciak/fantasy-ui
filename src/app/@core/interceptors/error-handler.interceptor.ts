import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    const { status, error } = response;

    this.snackBar.open(`${status || 0}: ${error.message as string}`, 'Close', {
      panelClass: ['mat-toolbar', 'mat-warn'],
      duration: 3000,
    });

    throw response;
  }
}
