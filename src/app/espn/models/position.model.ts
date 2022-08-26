interface BasePositionProperties {
  abbrev: string;
  name: string;
}

export type Position = BasePositionProperties;
export type PositionMap = Record<number, Position>;
