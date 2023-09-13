import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { FootballTeam } from '../models/football-team.model';

export class FantasyFootballTeam extends GenericActions<FootballTeam>({ stateName: 'fantasyFootballTeam' }) {}
