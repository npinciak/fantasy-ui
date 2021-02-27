import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { EspnState, EspnStateModel } from './espn.state';
import { EspnAction } from './espn.actions';

describe('Espn store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([EspnState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    const expected: EspnStateModel = {
      items: ['item-1']
    };
    store.dispatch(new EspnAction('item-1'));
    const actual = store.selectSnapshot(EspnState.getState);
    expect(actual).toEqual(expected);
  });

});
