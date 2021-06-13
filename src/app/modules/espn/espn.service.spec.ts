import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';

import { EspnService } from './espn.service';

describe('EspnService', () => {
  let service: EspnService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxsModule.forRoot()],
      providers: [EspnService, Store]
    });

    service = TestBed.inject(EspnService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call fetchEspnBaseball', () => {

    const spy = spyOn(service, 'fetchEspnBaseball').and.callThrough();

    service.fetchEspnBaseball(1);

    expect(spy).toHaveBeenCalledTimes(1);
  });




});
