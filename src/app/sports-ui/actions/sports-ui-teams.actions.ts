import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { Database } from '@sports-ui/ui-sdk/supabase';

export class SportsUiTeams extends GenericActions<Database['public']['Tables']['Teams']['Row']>({ stateName: 'sportsUiTeams' }) {}
