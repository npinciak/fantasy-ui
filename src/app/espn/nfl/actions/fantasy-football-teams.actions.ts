import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { FootballTeam } from '../models/football-team.model';

export class FantasyFootballTeams extends GenericActions<FootballTeam>({ stateName: 'fantasyFootballTeams' }) {}
