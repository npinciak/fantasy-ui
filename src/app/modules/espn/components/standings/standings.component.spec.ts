import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material.module';
import { Sports } from '../../espn.service';
import { MlbFacade } from '../../store/mlb/mlb.facade';
// import { mockmlbFacade } from '../../store/mocks/espn.facade.mock';
import { RosterComponent } from '../roster/roster.component';
import { TeamComponent } from '../../pages/team/team.component';
import { StandingsComponent } from './standings.component';

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatCardHarness } from '@angular/material/card/testing/card-harness';
import { TeamInfoColComponent } from './team-info-col/team-info-col.component';
import { RankingColComponent } from './ranking-col/ranking-col.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { BaseballTeam } from '../../models/mlb/class/team.class';
import * as mockleague from '@espn/models/mlb/mocks/league.mock.json';
import { teamMap } from '@app/@shared/helpers/mapping';
import { MOCK_DATA } from '@app/@shared/helpers/testConfigs';
import { NgxsModule } from '@ngxs/store';

describe('StandingsComponent', () => {
  let loader: HarnessLoader;
  let component: StandingsComponent;
  let fixture: ComponentFixture<StandingsComponent>;

  const router = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot(),
        RouterTestingModule,
        MatCardModule,
        MatButtonToggleModule,
        MatTableModule,
        BrowserAnimationsModule,
      ],
      declarations: [
        StandingsComponent,
        RosterComponent,
        TeamComponent,
        TeamInfoColComponent,
        RankingColComponent,
      ],
      providers: [
        { provide: Router, useValue: router },
        // { provide: mlbFacade, useValue: mockmlbFacade },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                sport: 'mlb',
                leagueId: 1209434861,
              },
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandingsComponent);
    component = fixture.componentInstance;
    component.teams = Object.values(MOCK_DATA.BASEBALL_TEAM_MAP);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
