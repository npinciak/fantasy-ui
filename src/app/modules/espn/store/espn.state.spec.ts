import { TestBed, async, waitForAsync } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { EspnState, EspnStateModel } from './espn.state';
import { EspnAction } from './espn.actions';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Espn store', () => {
  let store: Store;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxsModule.forRoot([EspnState])]
    }).compileComponents();
    store = TestBed.inject(Store);
  }));

  it('should create an action and add an item', () => {
    const expected: EspnStateModel = {
      items: ['item-1'],
      teams: []
    };
    store.dispatch(new EspnAction('item-1'));
    const actual = store.selectSnapshot(EspnState.getState);
    expect(actual).toEqual(expected);
  });

});
