import { TestBed } from '@angular/core/testing';
import { EspnFastcastServiceMock } from '@app/espn/espn-fastcast.service.mock';

import { EspnFastcastState } from '@app/espn/state/espn-fastcast.state';
import { Store, NgxsModule } from '@ngxs/store';
import { ShellService } from '../shell.service';
import { ShellState, ShellStateModel } from './shell.state';

describe('ShellState State', () => {
  let store: Store;
  let shellService: ShellService;

  const MOCK_STATE: ShellStateModel = {
    showFastcastScoreboard: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ShellState])],
      providers: [{ provide: ShellService }],
    }).compileComponents();
  });

  beforeEach(() => {
    shellService = TestBed.inject(ShellService);
    store = TestBed.inject(Store);
    store.reset({ map: MOCK_STATE });
  });
});
