import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { FootballPlayerFreeAgent } from '../models/football-player.model';

export class FantasyFootballFreeAgentActions extends GenericActions<FootballPlayerFreeAgent>({ stateName: 'fantasyFootballFreeAgents' }) {}
