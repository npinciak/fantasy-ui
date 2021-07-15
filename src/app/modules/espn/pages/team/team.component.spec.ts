import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';
import { NgxsModule } from '@ngxs/store';
import { MaterialModule } from 'src/app/material.module';
// import { mockMLBTeam } from '../../models/mlb/mocks/mlb-team.mock';
// import { MlbFacade } from '../../store/mlb/mlb.facade';
// import { mockmlbFacade } from '../../store/mocks/espn.facade.mock';
import { PlayerInfoColComponent } from '../../components/roster/player-info-col/player-info-col.component';
import { RosterComponent } from '../../components/roster/roster.component';

import { TeamComponent } from './team.component';

describe('TeamComponent', () => {
  let component: TeamComponent;
  let fixture: ComponentFixture<TeamComponent>;
  let compiled;

  const getByTestId = (testId: string) => compiled.querySelector(`[data-test-id="${testId}"]`);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        MatCardModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        NgxsSelectSnapshotModule,
        NgxsModule.forRoot()
      ],
      declarations: [TeamComponent, RosterComponent, PlayerInfoColComponent],
      providers: [
        // { provide: mlbFacade, useValue: mockmlbFacade },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              params: {
                teamId: 10
              }
            }
          }
        }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it(`should have as teamName ${mockTeam.location} ${mockTeam.nickname}`, () => {
  //   expect(component.teamName).toEqual(`${mockTeam.location} ${mockTeam.nickname}`);
  // });

  // it('should render teamName', () => {
  //   expect(getByTestId('teamName').textContent).toContain(`${mockTeam.location} ${mockTeam.nickname}`);
  // });

});
