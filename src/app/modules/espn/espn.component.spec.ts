import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsModule } from '@ngxs/store';
import { MaterialModule } from 'src/app/material.module';
import { environment } from 'src/environments/environment';
import { RosterComponent } from './components/roster/roster.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { StandingsComponent } from './components/standings/standings.component';
import { TeamComponent } from './components/team/team.component';

import { EspnComponent } from './espn.component';
import { EspnService } from './espn.service';
import { MlbFacade } from './store/mlb/mlb.facade';
// import { mockmlbFacade } from './store/mocks/espn.facade.mock';

enum Sports {
  mlb = 'flb',
  nfl = 'ffl',
}

describe('EspnComponent', () => {
  let component: EspnComponent;
  let fixture: ComponentFixture<EspnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot(),
        NgxsDispatchPluginModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MaterialModule],
      providers: [
        EspnService,
        // { provide: mlbFacade, useValue: mockmlbFacade },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              params: {
                sport: Sports.mlb,
                leagueId: `${environment.leagueId}`
              }
            }
          }
        }
      ],
      declarations: [EspnComponent, RosterComponent, TeamComponent, StandingsComponent, ScoreboardComponent]
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
