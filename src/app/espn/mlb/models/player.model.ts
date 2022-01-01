export interface Player {
  id: string;
  name: string;
  isInjured: boolean;
  injuryStatus: string;
  playerRatings: any;
  playerOwnership: {
    change: number;
    percentOwned: number;
  };
}
