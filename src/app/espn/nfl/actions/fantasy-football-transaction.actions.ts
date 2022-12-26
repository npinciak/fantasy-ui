import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { EspnClient } from 'sports-ui-sdk/lib/models/espn-client.model';

export class FantasyFootballTransaction extends GenericActions<EspnClient.LeagueTransaction>({ stateName: 'fantasyFootballTransaction' }) {}
