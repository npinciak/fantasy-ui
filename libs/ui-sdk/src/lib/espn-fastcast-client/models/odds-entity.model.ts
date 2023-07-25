import { TeamOddsTeamAttributesEntity } from './team-odds-team-attributes-entity.model';

export interface OddsEntity {
  details: string;
  overUnder: number;
  spread: number;
  homeTeamOdds: TeamOddsEntity;
  awayTeamOdds: TeamOddsEntity;
}

export interface TeamOddsEntity {
  favorite: boolean;
  underdog: boolean;
  moneyLine: number;
  spreadOdds: number;
  team: TeamOddsTeamAttributesEntity;
}
