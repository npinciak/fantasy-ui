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

export class HandleWebSocketMessage {
  static readonly type = `[fastcast] HandleWebSocketMessage`;
  constructor(public payload: { message: any }) {}
}

export class SendWebSocketMessage {
  static readonly type = `[fastcast] SendWebSocketMessage`;
  constructor(public payload: { message: any }) {}
}
