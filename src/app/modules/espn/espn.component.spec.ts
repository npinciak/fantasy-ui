import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsModule } from '@ngxs/store';
import { MaterialModule } from 'src/app/material.module';

import { EspnComponent } from './espn.component';
import { EspnService } from './espn.service';

describe('EspnComponent', () => {
  let component: EspnComponent;
  let fixture: ComponentFixture<EspnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot(), NgxsDispatchPluginModule, RouterTestingModule, HttpClientTestingModule, MaterialModule],
      providers: [EspnService],
      declarations: [EspnComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EspnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
