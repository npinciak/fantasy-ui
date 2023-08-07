import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { LeagueTransaction } from '@sports-ui/ui-sdk';

export class FantasyBaseballTransactions extends GenericActions<LeagueTransaction>({
  stateName: 'fantasyBaseballTransactions',
}) {}
