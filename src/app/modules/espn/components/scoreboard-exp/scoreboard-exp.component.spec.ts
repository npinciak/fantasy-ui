import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreboardExpComponent } from './scoreboard-exp.component';

describe('ScoreboardExpComponent', () => {
  let component: ScoreboardExpComponent;
  let fixture: ComponentFixture<ScoreboardExpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreboardExpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreboardExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
