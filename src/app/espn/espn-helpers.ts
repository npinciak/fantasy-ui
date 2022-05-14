export function includeSports(id: string): boolean {
  return new Set(['1', '20', '40', '70', '600']).has(id);
}

export function transformDownDistancePositionText(downDistanceText: string | null, possessionText: string | null): string | null {
  if (downDistanceText && possessionText) {
    return `${downDistanceText}, ${possessionText}`;
  }
  return null;
}

export function transformUidToId(uid: string): string | null {
  if (!uid) {
    return null;
  }
  return uid.split('~')[1].replace('l:', '');
}

export function transformIdToUid(uid: string, sport: string, league: string, team: string): string | null {
  if (!uid) {
    return null;
  }
  return `s:${sport}~l:${league}~t:${team}`;
}

export enum LeagueIdMap {
  MLB = 10,
  NFL = 28,
  NBA = 46,
  NHL = 90,
}
