import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RosterComponent } from '../roster/roster.component';
import { TeamComponent } from '../../pages/team/team.component';
import { StandingsComponent } from './standings.component';

import { HarnessLoader } from '@angular/cdk/testing';
import { TeamInfoColComponent } from './team-info-col/team-info-col.component';
import { RankingColComponent } from './ranking-col/ranking-col.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MOCK_DATA_MAPS } from '@app/@shared/helpers/testConfigs';
import { NgxsModule } from '@ngxs/store';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';

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
        NgxsSelectSnapshotModule.forRoot(),
        NgxsModule.forRoot(),
        RouterTestingModule,
        MatCardModule,
        MatButtonToggleModule,
        MatTableModule,
        BrowserAnimationsModule,
      ],
      declarations: [StandingsComponent, RosterComponent, TeamComponent, TeamInfoColComponent, RankingColComponent],
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
    component.teams = Object.values(MOCK_DATA_MAPS.BASEBALL_TEAM_MAP);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
