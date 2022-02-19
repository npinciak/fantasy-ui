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
