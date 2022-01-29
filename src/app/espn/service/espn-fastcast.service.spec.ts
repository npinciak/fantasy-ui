import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FASTCAST_WS_HOST } from '../espn.const';
import { EspnFastcastService } from './espn-fastcast.service';

describe('EspnFastcastService', () => {
  let service: EspnFastcastService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });

    service = TestBed.inject(EspnFastcastService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call fastCastWebsocket', async () => {
    const spy = spyOn(service, 'fastCastWebsocket').and.callThrough();
    service.fastCastWebsocket().subscribe();

    expect(spy).toHaveBeenCalled();
    const request = httpTestingController.expectOne(FASTCAST_WS_HOST);

    expect(request.request.method).toBe('GET');
    request.flush({});
  });

  it('should connect to websocket', () => {
    // TODO
  });

  it('should send message to websocket', () => {
    // TODO
  });

  it('should disconnect from websocket', () => {
    // TODO
  });
});
