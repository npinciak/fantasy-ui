import { TestBed, waitForAsync } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { MlbState, MlbStateModel } from './mlb.state';
import { MlbAction } from './mlb.actions';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Mlb store', () => {
  let store: Store;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxsModule.forRoot([MlbState])]
    }).compileComponents();
    store = TestBed.inject(Store);
  }));

  // it('should create an action and add an item', () => {
  //   const expected: MlbStateModel = {
  //     schedule: {},
  //     teams: {},
  //     games: {},
  //     stadiums: {},
  //     scoringPeriodId: null,
  //     isLoading: true,
  //   };
  //   // store.dispatch(new MlbAction('item-1'));
  //   const actual = store.selectSnapshot(MlbState.getState);
  //   expect(actual).toEqual(expected);
  // });

});
