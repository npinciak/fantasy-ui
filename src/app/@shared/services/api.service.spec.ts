import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send GET', () => {
    const spy = spyOn(service, 'get').and.callThrough();

    service.get('https://jsonplaceholder.typicode.com/posts').subscribe();

    expect(spy).toHaveBeenCalled();

    const req = httpTestingController.expectOne(
      'https://jsonplaceholder.typicode.com/posts'
    );

    expect(req.request.method).toBe('GET');

    req.flush({ id: 1, title: 'foo', body: 'bar', userId: 1 });
  });

  it('should send POST', () => {
    const spy = spyOn(service, 'post').and.callThrough();

    const mockBody = JSON.stringify({ title: 'foo', body: 'bar', userId: 1 });

    service
      .post('https://jsonplaceholder.typicode.com/posts', mockBody)
      .subscribe();

    expect(spy).toHaveBeenCalled();

    const req = httpTestingController.expectOne(
      'https://jsonplaceholder.typicode.com/posts'
    );

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockBody);

    req.flush({ id: 1, title: 'foo', body: 'bar', userId: 1 });
  });

  it('should send PUT', () => {
    const spy = spyOn(service, 'put').and.callThrough();
    const mockBody = JSON.stringify({ title: 'foo', body: 'bar', userId: 1 });

    service
      .put('https://jsonplaceholder.typicode.com/posts/1', mockBody)
      .subscribe();

    expect(spy).toHaveBeenCalled();

    const req = httpTestingController.expectOne(
      'https://jsonplaceholder.typicode.com/posts/1'
    );

    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockBody);

    req.flush({ id: 1, title: 'foo', body: 'bar', userId: 1 });
  });
});
