import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { EspnClient } from '@sports-ui/ui-sdk/espn';

export class FantasyFootballSchedule extends GenericActions<EspnClient.ScheduleEntity>({ stateName: 'fantasyFootballSchedule' }) {}
