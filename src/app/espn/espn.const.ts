import { exists } from '@app/@shared/helpers/utils';
import { environment } from 'src/environments/environment';

export const ESPN_TEXT: Record<string, string> = {
  NO_GAMES_TEXT: `No games scheduled for today`,
};

export const CDN: string = environment.espncdn;
export const CDN_COMBINER: string = CDN + 'combiner/i';
export const CDN_REDESIGN_IMG: string = CDN + 'redesign/assets/img';

export const COMMON_V3: string = environment.espnCommon;

export const FANTASY_BASE_V2: string = environment.espnFantasyBaseV2;
export const FANTASY_BASE_V3: string = environment.espnFantasyBaseV3;

export const FASTCAST_SERVICE_URI: string = environment.espnFastcastServiceUri;
export const FASTCAST_BASE: string = environment.espnFastcastBase + FASTCAST_SERVICE_URI + '/topic';
export const FASTCAST_WS_HOST: string = environment.espnWebsocketHost;

export const ONE_FEED_BASE: string = environment.espnOneFeed;

export const ICON_PATH = `${CDN_REDESIGN_IMG}/sprites/transitional-secondary-navigation-icons-v4.png`;

export const NO_LOGO: string = `${CDN_COMBINER}?img=/i/teamlogos/default-team-logo-500.png&h=100&scale=crop&w=100&location=origin`;

export function fastcastURIBuilder(eventType: string | null, messageId: string): string {
  return `${FASTCAST_BASE}/${eventType}/message/${messageId}/checkpoint`;
}

export function logoImgBuilder(abbrev: string, league: string): string {
  return `${CDN_COMBINER}?img=/i/teamlogos/${league}/500/${abbrev.toLowerCase()}.png&h=100&w=100`;
}

export function fieldImgBuilder(id: number): string {
  return `${CDN_REDESIGN_IMG}/mlb/fields/${id}.png`;
}

export function headshotImgBuilder(id: number | string, opts: { league: string; width?: number; height?: number }): string {
  const w = exists(opts.width) ? opts.width : 96;
  const h = exists(opts.height) ? opts.height : 70;

  const mediumW = exists(opts.width) ? opts.width : 426;
  const mediumH = exists(opts.height) ? opts.height : 320;

  return `${CDN_COMBINER}?img=/i/headshots/${opts.league}/players/full/${id}.png&w=${w}&h=${h}&cb=1`;
}

export function sportIconImgBuilder(sport: string): string {
  return `${CDN_COMBINER}?img=/redesign/assets/img/icons/ESPN-icon-${sport}.png&h=100&w=100`;
}

export const FASTCAST_DATE_SHORT = 'EEE h:mm a';
