import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MOCK_DATA_CLASS } from '@app/@shared/helpers/testConfigs';
import { NgxsModule } from '@ngxs/store';
import { MaterialModule } from 'src/app/material.module';
// import { BaseballPlayer } from '../../models/mlb/class/player.class';
// import { mockMLBPlayer } from '../../models/mlb/mocks/mlb-player.mock';
// import { mockBaseballPlayer } from '../../models/mlb/mocks/mlb-team.mock';
import { PlayerInfoColComponent } from './player-info-col/player-info-col.component';

import { RosterComponent } from './roster.component';

describe('RosterComponent', () => {
  let component: RosterComponent;
  let fixture: ComponentFixture<RosterComponent>;
  let compiled;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot(), HttpClientTestingModule, RouterTestingModule, MaterialModule, BrowserAnimationsModule],
      declarations: [RosterComponent, PlayerInfoColComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterComponent);
    component = fixture.componentInstance;
    component.fantasyPlayers = [MOCK_DATA_CLASS.BASEBALL_PLAYER_HEALTHY];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
