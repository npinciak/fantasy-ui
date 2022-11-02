export const name = 'espnFastcastConnection';
export class ConnectWebSocket {
  static readonly type = `[${name}] ConnectWebSocket`;
}

export class DisconnectWebSocket {
  static readonly type = `[${name}] DisconnectWebSocket`;
}

export class FetchFastcast {
  static readonly type = `[${name}] FetchFastcast`;
  constructor(public payload: { uri: string }) {}
}

export class HandleWebSocketMessage {
  static readonly type = `[${name}] HandleWebSocketMessage`;
  constructor(public payload: { message: any }) {}
}

export class SendWebSocketMessage {
  static readonly type = `[${name}] SendWebSocketMessage`;
  constructor(public payload: { message: any }) {}
}

export class SetSelectedLeague {
  static readonly type = `[${name}] SetSelectedLeague`;
  constructor(public payload: { leagueSlug: string | null }) {}
}

export class SetSelectedEventType {
  static readonly type = `[${name}] SetSelectedEventType`;
  constructor(public payload: { eventType: string | null }) {}
}

export class SetFastcastPause {
  static readonly type = `[${name}] SetFastcastPause`;
}
