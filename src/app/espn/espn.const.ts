import { environment } from 'src/environments/environment';

export const ESPN_TEXT: Record<string, string> = {
  NO_GAMES_TEXT: `No games scheduled for today`,
};

export const BASE_URL = environment.espnBase;
export const API_BASE = environment.espnBaseApi;
export const API_BASE_V2 = API_BASE + '/v2';

export const CDN = environment.espncdn;
export const CDN_COMBINER = CDN + 'combiner/i';
export const CDN_REDESIGN_IMG = CDN + 'redesign/assets/img';

export const COMMON_V3 = environment.espnCommon;

export const FANTASY_BASE_V2 = API_BASE + '/fantasy/v2';
export const FANTASY_BASE_V3 = environment.espnFantasyBaseV3;

export const FASTCAST_SERVICE_URI = environment.espnFastcastServiceUri;
export const FASTCAST_BASE = environment.espnFastcastBase + FASTCAST_SERVICE_URI + '/topic';
export const FASTCAST_WS_HOST = environment.espnWebsocketHost;

export const ONE_FEED_BASE = environment.espnOneFeed;

export const ICON_PATH = `${CDN_REDESIGN_IMG}/sprites/transitional-secondary-navigation-icons-v4.png`;

export const NO_LOGO = `${CDN_COMBINER}?img=/i/teamlogos/default-team-logo-500.png&h=100&scale=crop&w=100&location=origin`;

export function fastcastURIBuilder(eventType: string | null, messageId) {
  return `${FASTCAST_BASE}/${eventType}/message/${messageId}/checkpoint`;
}

export const FASTCAST_DATE_SHORT = 'EEE h:mm a';
