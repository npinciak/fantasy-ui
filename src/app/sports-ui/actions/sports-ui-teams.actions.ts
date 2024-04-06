import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { SupaClientTableRelationRow } from '@sports-ui/ui-sdk';

export class SportsUiTeams extends GenericActions<SupaClientTableRelationRow<'team'>>({ stateName: 'sportsUiTeams' }) {}
