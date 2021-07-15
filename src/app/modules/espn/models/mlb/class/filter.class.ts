import { mlbLineupMap } from '../maps';

class Filter {
  private _playerStatus: string[] = [];
  private _filterInjured = false;
  private _offset = 0;
  private _limit = 50;

  constructor() {}

  get playerStatus() {
    return this._playerStatus;
  }

  set playerStatus(values: string[]) {
    for (const status of values) {
      this._playerStatus.push(status);
    }
  }

  get filterInjured() {
    return this._filterInjured;
  }

  set filterInjured(value: boolean) {
    this._filterInjured = value;
  }

  get slotIds() {
    const lineupSlots = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 19];
    const slotMap = new Map();

    for (const id of lineupSlots) {
      slotMap.set(id, mlbLineupMap[id].abbrev);
    }

    return slotMap;
  }

  get limit() {
    return this._limit;
  }

  set limit(limit: number) {
    this._limit = limit;
  }

  get offset() {
    return this._offset;
  }

  set offset(offset: number) {
    this._offset = offset;
  }

  get jsonFilter() {
    return JSON.stringify(this._buildFilter);
  }

  private get _buildFilter() {
    return {
      players: {
        filterStatus: {
          value: this._playerStatus,
        },
        // filterStatMinimum: { additionalValue: 1, value: 81 },
        filterInjured: {
          value: this._filterInjured,
        },
        limit: this._limit,
        offset: this._offset,
        filterSlotIds: {
          value: [],
        },
      },
    };
  }
}

export { Filter };
