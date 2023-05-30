export type BaseEntity = {
  id: number;
  label: string;
  englishLabel: string;
  name: string;
  englishName: string;
  start: string;
  sport: string;
  tags?: string[] | null;
  outcomes?: Outcome[];
};

export type Outcome = Pick<BaseEntity, 'id'> & {
  label: string;
  participant?: string;
  odds: number;
};
