import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerTableRankingColumnComponent } from './player-table-ranking-column.component';

describe('PlayerTableRankingColumnComponent', () => {
  let component: PlayerTableRankingColumnComponent;
  let fixture: ComponentFixture<PlayerTableRankingColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerTableRankingColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerTableRankingColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
