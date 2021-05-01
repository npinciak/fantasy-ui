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

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader} from '@angular/cdk/testing';
import { MatCardHarness} from '@angular/material/card/testing/card-harness';
import { TeamInfoColComponent } from './team-info-col/team-info-col.component';
import { RankingColComponent } from './ranking-col/ranking-col.component';
import { mockBaseballTeam } from '../../models/mlb/mocks/mlb-team.mock';


describe('StandingsComponent', () => {
  let loader: HarnessLoader;
  let component: StandingsComponent;
  let fixture: ComponentFixture<StandingsComponent>;

  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MaterialModule, BrowserAnimationsModule],
      declarations: [StandingsComponent, RosterComponent, TeamComponent, TeamInfoColComponent, RankingColComponent],
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
    component.teams = [mockBaseballTeam];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
