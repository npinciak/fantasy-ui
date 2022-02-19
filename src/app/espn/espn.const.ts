import { environment } from 'src/environments/environment';

export const ESPN_TEXT = {
  NO_GAMES_TEXT: `No games scheduled for today`,
};

export const COMMON_V3 = environment.espnCommon;

export const FANTASY_BASEBALL_LEAGUE_ID = environment.espnFantasyBaseballLeague;
export const FANTASY_FOOTBALL_LEAGUE_ID = environment.espnFantasyBaseballLeague;

export const FANTASY_BASE_V2 = environment.espnFantasyBaseV2;
export const FANTASY_BASE_V3 = environment.espnFantasyBaseV3;

export const FASTCAST_BASE = environment.espnFastcastBase;
export const FASTCAST_WS_HOST = environment.espnWebsocketHost;

export const ONE_FEED_BASE = environment.espnOneFeed;

export const NO_LOGO =
  'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/default-team-logo-500.png&h=100&scale=crop&w=100&location=origin';

export function logoImgBuilder(league: 'mlb' | 'nfl', abbrev: string) {
  return `https://a.espncdn.com/combiner/i?img=/i/teamlogos/${league}/500/${abbrev.toLowerCase()}.png&h=100&w=100`;
}

export function fieldImgBuilder(id: number) {
  return `https://a.espncdn.com/redesign/assets/img/mlb/fields/${id}.png`;
}

export function playerImgBuilder(id: number | string, league: 'mlb' | 'nfl'): string {
  return `https://a.espncdn.com/combiner/i?img=/i/headshots/${league}/players/full/${id}.png&w=96&h=70&cb=1`;
}
