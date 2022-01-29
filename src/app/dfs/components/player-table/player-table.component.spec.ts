import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerTableComponent } from './player-table.component';

describe('PlayerTableComponent', () => {
  let component: PlayerTableComponent;
  let fixture: ComponentFixture<PlayerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
