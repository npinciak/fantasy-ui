export class ConnectWebSocket {
  static readonly type = `[espnFastcast] ConnectWebSocket`;
}

export class DisconnectWebSocket {
  static readonly type = `[espnFastcast] DisconnectWebSocket`;
}

export class FetchFastcast {
  static readonly type = `[espnFastcast] FetchFastcast`;
  constructor(public payload: { uri: string }) {}
}

export class HandleWebSocketMessage {
  static readonly type = `[espnFastcast] HandleWebSocketMessage`;
  constructor(public payload: { message: any }) {}
}

export class SendWebSocketMessage {
  static readonly type = `[espnFastcast] SendWebSocketMessage`;
  constructor(public payload: { message: any }) {}
}

export class SetSelectedEventType {
  static readonly type = `[espnFastcast] SetSelectedEventType`;
  constructor(public payload: { eventType: string | null }) {}
}

export class SetFastcastPause {
  static readonly type = `[espnFastcast] SetFastcastPause`;
}
