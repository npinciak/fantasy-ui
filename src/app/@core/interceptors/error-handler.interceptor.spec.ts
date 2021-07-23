import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ErrorHandlerInterceptor } from './error-handler.interceptor';

describe('ErrorHandlerInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useExisting: ErrorHandlerInterceptor,
          multi: true,
        },
        ErrorHandlerInterceptor,
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const interceptor: ErrorHandlerInterceptor = TestBed.inject(ErrorHandlerInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should catch error and call error handler', () => {
    spyOn(ErrorHandlerInterceptor.prototype as any, 'errorHandler').and.callThrough();

    http.get('').subscribe(
      () => fail('should error'),
      () => {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        expect(ErrorHandlerInterceptor.prototype['errorHandler']).toHaveBeenCalled();
      }
    );

    httpMock.expectOne({}).flush(null, {
      status: 404,
      statusText: 'error',
    });
  });

  it('should return status code of 0', () => {
    spyOn(ErrorHandlerInterceptor.prototype as any, 'errorHandler').and.callThrough();

    http.get('test.com').subscribe(
      () => fail('should error'),
      () => {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        expect(ErrorHandlerInterceptor.prototype['errorHandler']).toHaveBeenCalled();
      }
    );

    const req = httpMock.expectOne({});
    req.error(null, {});
    // req.flush(null, { status: null, statusText: null });
  });
});
