export class ToggleOnFastcastEvent {
  static readonly type = `[espnFastcastEventToggle] ToggleOnFastcastEvent`;
  constructor(public payload: { ids: string[] }) {}
}

export class SelectFastcastEvent {
  static readonly type = `[espnFastcastEventToggle] SelectFastcastEvent`;
  constructor(public payload: { ids: string[] }) {}
}

export class DeselectFastcastEvent {
  static readonly type = `[espnFastcastEventToggle] DeselectFastcastEvent`;
  constructor(public payload: { ids: string[] }) {}
}

export class ToggleOffFastcastEvent {
  static readonly type = `[espnFastcastEventToggle] ToggleOffFastcastEvent`;
  constructor(public payload: { ids: string[] }) {}
}
