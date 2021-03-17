import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material.module';
import { mockMLBTeam } from '../../models/mlb-team.mock';

import { RosterComponent } from './roster.component';

describe('RosterComponent', () => {
  let component: RosterComponent;
  let fixture: ComponentFixture<RosterComponent>;
  let compiled;

  const getByTestId = (testId: string) => compiled.querySelector(`[data-test-id="${testId}"]`);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MaterialModule, BrowserAnimationsModule],
      declarations: [RosterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
