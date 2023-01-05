import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { SlateTeamNfl } from '../models/nfl-slate-attr.model';

export class DfsNflSlateTeamDetails extends GenericActions<SlateTeamNfl>({ stateName: 'dfsNflSlateTeamDetails' }) {}
