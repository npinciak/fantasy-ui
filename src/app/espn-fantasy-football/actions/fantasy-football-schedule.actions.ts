import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { ScheduleByMatchupPeriodId } from '../models/fantasy-football-league.model';

export class FantasyFootballSchedule extends GenericActions<ScheduleByMatchupPeriodId>({ stateName: 'fantasyFootballSchedule' }) {}
