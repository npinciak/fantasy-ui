import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { SlateTeamNfl } from '@app/dfs/models/slate-team.model';

export class DfsNflSlateTeamDetailsActions extends GenericActions<SlateTeamNfl>({ stateName: 'dfsNflSlateTeamDetails' }) {}
