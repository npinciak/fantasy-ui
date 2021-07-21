import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MOCK_DATA_CLASS } from '@app/@shared/helpers/testConfigs';
import { NgxsModule } from '@ngxs/store';

import { ScoreboardEventComponent } from './scoreboard-event.component';

describe('ScoreboardEventComponent', () => {
  let component: ScoreboardEventComponent;
  let fixture: ComponentFixture<ScoreboardEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot()],
      declarations: [ScoreboardEventComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreboardEventComponent);
    component = fixture.componentInstance;
    component.event = MOCK_DATA_CLASS.BASEBALL_GAME;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
