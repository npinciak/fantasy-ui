import { GridIronProjectionType } from '../models/nfl-gridIron.model';

export const GRIDIRON_PROJECTION_FILTER_OPTIONS = [
  { value: GridIronProjectionType.BlitzDefault, label: 'Blitz Default' },
  { value: GridIronProjectionType.BlitzDefenseAgnostic, label: 'Blitz Defense Agnostic' },
  { value: GridIronProjectionType.BlitzDefenseDeflated, label: 'Blitz Defense Deflated' },
  { value: GridIronProjectionType.Default, label: 'Default' },
];

