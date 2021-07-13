import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueScoreboardComponent } from './league-scoreboard.component';

describe('LeagueScoreboardComponent', () => {
  let component: LeagueScoreboardComponent;
  let fixture: ComponentFixture<LeagueScoreboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeagueScoreboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueScoreboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
