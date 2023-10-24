import { toggleByField } from './base-free-agents-filter.operators';
interface TestStateModel {
  players: {
    [id: string]: boolean;
  };
}

describe('toggleByField', () => {
  it('should toggle the specified IDs in the specified field', () => {
    const state: TestStateModel = {
      players: {
        '1': false,
        '2': true,
        '3': false,
      },
    };

    const toggleSelected = toggleByField<TestStateModel, 'players'>('players', ['1', '3']);

    const newState = toggleSelected(state);

    expect(newState.players['1']).toBe(true);
    expect(newState.players['2']).toBe(true);
    expect(newState.players['3']).toBe(true);
  });

  it('should not modify the state if no IDs are specified', () => {
    const state: TestStateModel = {
      players: {
        '1': false,
        '2': true,
        '3': false,
      },
    };

    const toggleSelected = toggleByField<TestStateModel, 'players'>('players', []);

    const newState = toggleSelected(state);

    expect(newState).toEqual(state);
  });
});
