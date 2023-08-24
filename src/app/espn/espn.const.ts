import { exists } from '@app/@shared/utilities/utilities.m';
import { environment } from 'src/environments/environment';
import { ImageBuilderInput } from './const/image-builder';

export const ESPN_TEXT: Record<string, string> = {
  NO_GAMES_TEXT: `No games scheduled for today`,
};

export const BASE_URL = environment.espnBase;
export const API_BASE = environment.espnBaseApi;
export const API_BASE_V2 = API_BASE + '/v2';

export const CDN: string = environment.espncdn;
export const CDN_COMBINER: string = CDN + 'combiner/i';
export const CDN_REDESIGN_IMG: string = CDN + 'redesign/assets/img';

export const COMMON_V3: string = environment.espnCommon;

export const FANTASY_BASE_V2: string = API_BASE + '/fantasy/v2';
export const FANTASY_BASE_V3: string = environment.espnFantasyBaseV3;

export const FASTCAST_SERVICE_URI: string = environment.espnFastcastServiceUri;
export const FASTCAST_BASE: string = environment.espnFastcastBase + FASTCAST_SERVICE_URI + '/topic';
export const FASTCAST_WS_HOST: string = environment.espnWebsocketHost;

export const ONE_FEED_BASE: string = environment.espnOneFeed;

export const ICON_PATH = `${CDN_REDESIGN_IMG}/sprites/transitional-secondary-navigation-icons-v4.png`;

export const NO_LOGO = `${CDN_COMBINER}?img=/i/teamlogos/default-team-logo-500.png&h=100&scale=crop&w=100&location=origin`;

export function fastcastURIBuilder(eventType: string | null, messageId: string): string {
  return `${FASTCAST_BASE}/${eventType}/message/${messageId}/checkpoint`;
}

/**
 * @deprecated use ImageBuilder.logoImgBuilder
 */
export function logoImgBuilder({ id, league, width, height }: ImageBuilderInput): string {
  const w = exists(width) ? width : 100;
  const h = exists(height) ? height : 100;

  return `${CDN_COMBINER}?img=/i/teamlogos/${league}/500/${id}.png&w=${w}&h=${h}&cb=1`;
}

/**
 * @deprecated use ImageBuilder.headshotImgBuilder
 */
export function headshotImgBuilder({ id, league, width, height }: ImageBuilderInput): string {
  const w = exists(width) ? width : 55;
  const h = exists(height) ? height : 40;

  const mediumW = exists(width) ? width : 426;
  const mediumH = exists(height) ? height : 320;

  return `${CDN_COMBINER}?img=/i/headshots/${league}/players/full/${id}.png&w=${w}&h=${h}&cb=1`;
}

/**
 * @deprecated use ImageBuilder.sportIconImgBuilder
 */
export function sportIconImgBuilder(sport: string): string {
  return `${CDN_COMBINER}?img=/redesign/assets/img/icons/ESPN-icon-${sport}.png&h=100&w=100`;
}

export const FASTCAST_DATE_SHORT = 'EEE h:mm a';
