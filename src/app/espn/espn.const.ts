import { environment } from 'src/environments/environment';
import { EspnWebSocket } from './models/espn-fastcast-socket.model';

export const ESPN_TEXT = {
  NO_GAMES_TEXT: `No games scheduled for today`,
};

export const FANTASY_BASEBALL_LEAGUE_ID = environment.espnFantasyBaseballLeague;
export const FANTASY_FOOTBALL_LEAGUE_ID = environment.espnFantasyBaseballLeague;

export const FANTASY_BASE_V2 = environment.espnFantasyBaseV2;
export const FANTASY_BASE_V3 = environment.espnFantasyBaseV3;

export const FASTCAST_BASE = environment.espnFastcastBase;
export const FASTCAST_WS_HOST = environment.espnWebsocketHost;

export const FIELD_IMAGE_BASE = (id: number) => `https://a.espncdn.com/redesign/assets/img/mlb/fields/${id}.png`;

export const NO_LOGO =
  'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/default-team-logo-500.png&h=100&scale=crop&w=100&location=origin';

export const WEBSOCKET_BASE = (config: EspnWebSocket) =>
  `wss://${config.ip}:${config.securePort}/FastcastService/pubsub/profiles/12000?TrafficManager-Token=${config.token}`;
