import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';

import { FreeAgentsComponent } from './free-agents.component';

describe('FreeAgentsComponent', () => {
  let component: FreeAgentsComponent;
  let fixture: ComponentFixture<FreeAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot()],
      declarations: [FreeAgentsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
