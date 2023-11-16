interface EspnLineupProps {
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

export type EspnLineupEntityMap = Record<number, EspnLineupProps>;
