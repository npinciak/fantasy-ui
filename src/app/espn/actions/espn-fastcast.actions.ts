import { EventsEntity as EventsImport } from '../models/espn-fastcast.model';
import { FastcastEvent } from '../models/fastcast-event.model';

export class ConnectWebSocket {
  static readonly type = `[fastcast] ConnectWebSocket`;
}

export class DisconnectWebSocket {
  static readonly type = `[fastcast] DisconnectWebSocket`;
}

export class FetchFastcast {
  static readonly type = `[fastcast] FetchFastcast`;
  constructor(public payload: { uri: string }) {}
}

export class PatchEvents {
  static readonly type = `[fastcast] PatchEvents`;
  constructor(public payload: { map: { [id: string]: FastcastEvent } }) {}
}
