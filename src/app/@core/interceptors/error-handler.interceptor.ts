import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SnackBarService } from '@app/@shared/services/snackbar.service';
import { statusCodeToMessage } from '@sports-ui/ui-sdk';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RouterFacade } from '../store/router/router.facade';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private snackBarService: SnackBarService, readonly routerFacade: RouterFacade) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => this.errorHandler(error)));
  }

  private errorHandler(response: HttpErrorResponse): Observable<HttpEvent<any>> {
    const { status, error } = response;

    this.snackBarService.showErrorSnackBar(`${status || 0}: ${statusCodeToMessage[status] as string}`);

    throw response;
  }
}
