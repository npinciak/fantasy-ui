export function includeSports(id: string) {
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
