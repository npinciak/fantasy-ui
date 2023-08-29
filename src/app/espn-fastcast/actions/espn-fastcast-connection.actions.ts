export class FastCastConnection {
  static stateName = 'espnFastcastConnection';

  static ConnectWebSocket = class {
    public static readonly type = `[${FastCastConnection.stateName}] ConnectWebSocket`;
  };

  static DisconnectWebSocket = class {
    static readonly type = `[${FastCastConnection.stateName}] DisconnectWebSocket`;
  };

  static FetchFastcast = class {
    static readonly type = `[${FastCastConnection.stateName}] FetchFastcast`;
    constructor(public payload: { uri: string }) {}
  };

  static FetchStaticFastcast = class {
    static readonly type = `[${FastCastConnection.stateName}] FetchStaticFastcast`;
    constructor(public payload: { sport: string | null; league: string | null; weeks: number | null; seasontype: number | null }) {}
  };

  static HandleWebSocketMessage = class {
    static readonly type = `[${FastCastConnection.stateName}] HandleWebSocketMessage`;
    constructor(public payload: any) {}
  };

  static SendWebSocketMessage = class {
    static readonly type = `[${FastCastConnection.stateName}] SendWebSocketMessage`;
    constructor(public payload: any) {}
  };

  static SetSelectedLeague = class {
    static readonly type = `[${FastCastConnection.stateName}] SetSelectedLeague`;
    constructor(public payload: { leagueSlug: string | null }) {}
  };

  static SetSelectedDate = class {
    static readonly type = `[${FastCastConnection.stateName}] SetSelectedDate`;
    constructor(public payload: { date: string | null }) {}
  };

  static SetSelectedEventType = class {
    static readonly type = `[${FastCastConnection.stateName}] SetSelectedEventType`;
    constructor(public payload: { eventType: string | null }) {}
  };

  static SetFastcastPause = class {
    static readonly type = `[${FastCastConnection.stateName}] SetFastcastPause`;
  };

  static SetDisconnect = class {
    static readonly type = `[${FastCastConnection.stateName}] SetDisconnect`;
  };
}
