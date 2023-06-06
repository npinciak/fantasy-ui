import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { EspnClient } from '@sports-ui/ui-sdk/espn';

export class FantasyFootballTransaction extends GenericActions<EspnClient.LeagueTransaction>({ stateName: 'fantasyFootballTransaction' }) {}
