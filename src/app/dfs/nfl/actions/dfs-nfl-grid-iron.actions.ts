import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { GridIronPlayer } from '../models/nfl-gridIron.model';

export class DfsNflGridIron extends GenericActions<GridIronPlayer, { site: string }>({ stateName: 'dfsNflGridIron' }) {}
