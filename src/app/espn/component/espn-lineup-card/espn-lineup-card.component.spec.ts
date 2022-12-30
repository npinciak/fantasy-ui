import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspnLineupCardComponent } from './espn-lineup-card.component';

describe('EspnLineupCardComponent', () => {
  let component: EspnLineupCardComponent;
  let fixture: ComponentFixture<EspnLineupCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspnLineupCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EspnLineupCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
