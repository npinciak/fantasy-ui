import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { SlateTeam } from '@app/dfs/models/slate-team.model';

export class DfsMlbSlateTeamDetailsActions extends GenericActions<SlateTeam>({ stateName: 'dfsMlbSlateTeamDetails' }) {}
