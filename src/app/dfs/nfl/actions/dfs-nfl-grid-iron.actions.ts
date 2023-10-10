import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { GridIronPlayer } from '../models/nfl-gridIron.model';

export class DfsNflGridIronActions extends GenericActions<GridIronPlayer, { site: string }>({ stateName: 'dfsNflGridIron' }) {}
