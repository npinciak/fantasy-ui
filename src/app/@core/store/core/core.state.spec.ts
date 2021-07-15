import { TestBed, async, waitForAsync } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { CoreState, CoreStateModel } from './core.state';
import { CoreAction } from './core.actions';

describe('Core store', () => {
  let store: Store;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgxsModule.forRoot([CoreState])],
      }).compileComponents();
      store = TestBed.inject(Store);
    })
  );

  it('should create an action and add an item', () => {
    const expected: CoreStateModel = {
      items: ['item-1'],
    };
    store.dispatch(new CoreAction('item-1'));
    const actual = store.selectSnapshot(CoreState.getState);
    expect(actual).toEqual(expected);
  });
});
