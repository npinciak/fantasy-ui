export type GridIronPlayer = {
  playerId: number;
  player: string | null;
  salary: number | null;
  opp?: string | null;
  pos?: string | null;
  team?: string | null;
  scheduleId?: number | null;
  paatt: number | null;
  comp: number | null;
  payds: number | null;
  patd: number | null;
  int: number | null;
  ruatt: number | null;
  ruyds: number | null;
  rutd: number | null;
  tar: number | null;
  rec: number | null;
  reyds: number | null;
  retd: number | null;
  fpts: number | null;
  sdFpts: number | null;
  fptsPerDollar: number | null;
  floor: number | null;
  sdFloor: number | null;
  ceil: number | null;
  sdCeil: number | null;
  smash?: number | null;
  value?: number | null;
  pown: number | null;
  partnerId: number | null;
  ownership: Record<number | string, number | null>;
  rgid: number | null;
  slate: string | null;
  injury: string | null;
};

export type GridIronPlayerMap = Record<number, GridIronPlayer>;

export enum GridIronProjectionType {
  BlitzDefault = 2009661,
  BlitzDefenseAgnostic = 3202616,
  BlitzDefenseDeflated = 3202618,
  Default = 3350867,
}
