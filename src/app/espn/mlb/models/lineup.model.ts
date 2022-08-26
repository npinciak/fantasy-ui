interface Lineup {
  parentId: number;
  id: number;
  abbrev: string;
  bench: boolean;
  eligiblePositions: number[];
  lineupSlotEligible: boolean;
  name: string;
  starter: boolean;
  displayOrder: number;
  active: boolean;
}

export type LineupMap = Record<number, Lineup>;
