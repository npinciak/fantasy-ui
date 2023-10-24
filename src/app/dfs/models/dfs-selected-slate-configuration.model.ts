import { GridIronProjectionType } from '../nfl/models/nfl-gridIron.model';

export class DfsSelectedSlateConfigurationStateModel {
  slateId: string | null;
  site: string | null;
  path: string | null;
  sport: string | null;
  projectionType: GridIronProjectionType;
}

export const INITIAL_STATE: DfsSelectedSlateConfigurationStateModel = {
  slateId: null,
  site: null,
  path: null,
  sport: null,
  projectionType: GridIronProjectionType.Default,
};
