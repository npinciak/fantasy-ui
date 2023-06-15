export interface SalariesEntity {
  position: string;
  salary: number;
  player_id: string;
}

export interface SalaryDiff {
  diff?: number;
  position: string;
  rank?: number;
  rank_diff?: number;
  salary: string;
}
