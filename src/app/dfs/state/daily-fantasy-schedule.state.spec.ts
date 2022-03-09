import { TestBed, waitForAsync } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { MOCK_SCHEDULE_1, MOCK_SCHEDULE_2, MOCK_SCHEDULE_LIST } from '../models/schedule.model.mock';
import { DailyFantasyScheduleState, PatchSchedule } from './daily-fantasy-schedule.state';

describe('[dailyFantasySchedule] Store', () => {
  let store: Store;

  const schedule = MOCK_SCHEDULE_LIST;

  const state = {
    map: {
      [MOCK_SCHEDULE_1.id]: MOCK_SCHEDULE_1,
      [MOCK_SCHEDULE_2.id]: MOCK_SCHEDULE_2,
    },
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgxsModule.forRoot([DailyFantasyScheduleState])],
      }).compileComponents();

      store = TestBed.inject(Store);
    })
  );

  describe('@Action patchSchedule', () => {
    it('should create an action and patch schedule', async () => {
      await store.dispatch(new PatchSchedule({ schedule })).toPromise();
      const expected = state.map;
      const selector = store.selectSnapshot(DailyFantasyScheduleState.getMap);
      expect(selector).toEqual(expected);
    });
  });

  // describe('@Selector site', () => {
  //   it('should select site', () => {
  //     const expected = MOCK_STATE.site;
  //     const selector = DailyFantasySlateState.site(MOCK_STATE);
  //     expect(selector).toEqual(expected);
  //   });
  // });
});
