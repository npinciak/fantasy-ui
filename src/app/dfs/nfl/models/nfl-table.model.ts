export type TableFilter = { filterType: FilterType; value: string };

export enum FilterType {
  team,
  pos,
  name,
  statGroup,
  salary,
}
