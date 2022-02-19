export interface Lineup {
  parentId: number;
  abbrev: string;
  bench: boolean;
  eligiblePositions: number[];
  lineupSlotEligible: boolean;
  name: string;
  starter: boolean;
}
