import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';
import { NgxsModule } from '@ngxs/store';
import { MaterialModule } from 'src/app/material.module';
import { mockMLBTeam } from '../../models/mlb-team.mock';
import { EspnFacade } from '../../store/espn.facade';
import { mockESPNFacade } from '../../store/mocks/espn.facade.mock';
import { RosterComponent } from '../roster/roster.component';

import { TeamComponent } from './team.component';

describe('TeamComponent', () => {
  let component: TeamComponent;
  let fixture: ComponentFixture<TeamComponent>;
  let compiled;
  const mockTeam = mockMLBTeam;

  const getByTestId = (testId: string) => compiled.querySelector(`[data-test-id="${testId}"]`);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, RouterTestingModule, MaterialModule, NgxsSelectSnapshotModule, NgxsModule.forRoot()],
      declarations: [TeamComponent, RosterComponent],
      providers: [
        { provide: EspnFacade, useValue: mockESPNFacade },
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
