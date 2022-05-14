import { FastcastEvent } from '../models/fastcast-event.model';

export class PatchFastcastEvents {
  static readonly type = `[espnFastcastEvent] PatchFastcastEvents`;
  constructor(public payload: FastcastEvent[]) {}
}
