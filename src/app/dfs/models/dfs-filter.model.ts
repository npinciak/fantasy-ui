import { GridIronProjectionType } from "../nfl/models/nfl-gridIron.model";

export class DfsFilterStateModel {
  position: string | null;
  team: string | null;
  name: string | null;
  projectionType: GridIronProjectionType;
}

export const INITIAL_STATE: DfsFilterStateModel = {
  position: null,
  team: null,
  name: null,
  projectionType: GridIronProjectionType.Default,
};
