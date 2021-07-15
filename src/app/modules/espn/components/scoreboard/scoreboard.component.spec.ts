import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterTestingModule } from '@angular/router/testing';
import { ScoreboardComponent } from './scoreboard.component';

describe('ScoreboardComponent', () => {
  let component: ScoreboardComponent;
  let fixture: ComponentFixture<ScoreboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatListModule, MatCardModule],
      declarations: [ScoreboardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreboardComponent);
    component = fixture.componentInstance;
    // component.teams = [mockBaseballTeam, mockBaseballTeam, mockBaseballTeam];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('scoreboard size should have same length as data', () => {
  //   const dataLength = component.teams.length;
  //   const listElementLength = getByTestId('scoreboardTeamList').length;
  //   expect(listElementLength === dataLength).toBeTrue();
  // });

  // it('should display teamName', () => {
  //   const data = component.teams;
  //   const teamNames = document.querySelectorAll(`[data-test-id*='scoreboardTeamName']`);

  //   const newSet = new Set<string>();

  //   teamNames.forEach(item => {
  //     const element = item.innerHTML;
  //     if (!newSet.has(element)) {
  //       newSet.add(element.trim());
  //     }
  //   });

  //   const final = data.some(team => newSet.has(team.teamName));

  //   expect(final).toBeTruthy();
  // });

  // it('should display teamName', () => {
  //   const data = component.teams;
  //   const teamNames = document.querySelectorAll(`[data-test-id*='scoreboardTeamName']`);

  //   const newSet = new Set<string>();

  //   teamNames.forEach(item => {
  //     const element = item.innerHTML;
  //     if (!newSet.has(element)) {
  //       newSet.add(element.trim());
  //     }
  //   });

  //   const final = data.some(team => newSet.has(team.teamName));

  //   expect(final).toBeTruthy();
  // });
});

// scoreboardTeamChange
