import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { MlbDfsState } from './mlb-dfs.state';

describe('MlbDfs actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([MlbDfsState])],
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    // store.dispatch(new MlbDfsAction('item-1'));
    // store.select(state => state.mlbDfs.items).subscribe((items: string[]) => {
    //   expect(items).toEqual(jasmine.objectContaining([ 'item-1' ]));
    // });
  });
});
