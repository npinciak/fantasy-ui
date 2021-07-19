import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreboardEventComponent } from './scoreboard-event.component';

describe('ScoreboardEventComponent', () => {
  let component: ScoreboardEventComponent;
  let fixture: ComponentFixture<ScoreboardEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreboardEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreboardEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
