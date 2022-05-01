import { FastcastEventMap } from '../models/fastcast-event.model';

export class PatchFastcastEvents {
  static readonly type = `[espnFastcastEvent] PatchFastcastEvents`;
  constructor(public payload: { map: FastcastEventMap }) {}
}
