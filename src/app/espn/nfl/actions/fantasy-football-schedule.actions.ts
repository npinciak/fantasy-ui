import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { EspnClient } from 'sports-ui-sdk';

export class FantasyFootballSchedule extends GenericActions<EspnClient.ScheduleEntity>({ stateName: 'fantasyFootballSchedule' }) {}
