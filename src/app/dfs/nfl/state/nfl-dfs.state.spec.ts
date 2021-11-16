import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { NflDfsState } from './nfl-dfs.state';

describe('NflDfs actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([NflDfsState])],
    }).compileComponents();
    store = TestBed.get(Store);
  }));
});
