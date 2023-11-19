import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { ProTeamEntity } from '@sports-ui/ui-sdk/espn-client';

export class FantasyBaseballProTeamSchedule extends GenericActions<ProTeamEntity>({
  stateName: 'fantasyBaseballProTeamSchedule',
}) {}
