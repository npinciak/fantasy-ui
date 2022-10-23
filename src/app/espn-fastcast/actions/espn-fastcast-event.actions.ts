import { FastcastEvent } from '../models/fastcast-event.model';

export class SetFastcastEvents {
  static readonly type = `[espnFastcastEvent] SetFastcastEvents`;
  constructor(public payload: FastcastEvent[]) {}
}

export class ClearAndAddFastcastEvents {
  static readonly type = `[espnFastcastEvent] ClearAndAddFastcastEvents`;
  constructor(public payload: FastcastEvent[]) {}
}
