import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material.module';
import { Sports } from '../../espn.service';
import { EspnFacade } from '../../store/espn.facade';
import { mockESPNFacade } from '../../store/mocks/espn.facade.mock';
import { RosterComponent } from '../roster/roster.component';
import { TeamComponent } from '../team/team.component';

import { StandingsComponent } from './standings.component';

describe('StandingsComponent', () => {
  let component: StandingsComponent;
  let fixture: ComponentFixture<StandingsComponent>;
  let compiled;

  const getByTestId = (testId: string) => compiled.querySelector(`[data-test-id="${testId}"]`);

  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MaterialModule, BrowserAnimationsModule],
      declarations: [StandingsComponent, RosterComponent, TeamComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: EspnFacade, useValue: mockESPNFacade },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              params: {
                sport: 'mlb',
                leagueId: 1209434861
              }
            }
          }
        }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandingsComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
