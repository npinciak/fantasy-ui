interface EspnClientLineupProps {
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

export type EspnClientLineupEntityMap = Record<number, EspnClientLineupProps>;
