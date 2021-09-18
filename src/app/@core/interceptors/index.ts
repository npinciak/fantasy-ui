import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlerInterceptor } from './error-handler.interceptor';
import { HttpsInterceptor } from './https.interceptor';

const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorHandlerInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpsInterceptor,
    multi: true,
  },
];

export { httpInterceptorProviders };
