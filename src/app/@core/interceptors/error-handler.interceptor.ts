import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => this.errorHandler(error)));
  }

  private errorHandler(response: HttpErrorResponse): Observable<HttpEvent<any>> {
    if (response.error instanceof ErrorEvent) {
    } else {

      const msg = response.message || 'NO_MSG';
      const code = response.status || 0;
      const statusText = response.statusText || 'NO_STATUS';

      this.snackBar.open(`${code}: ${statusText}`, 'x', { panelClass: ['mat-toolbar', 'mat-warn'] });

      return of(response as any);
    }
  }
}
