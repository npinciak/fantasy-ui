import { EspnClientCompetitor, EspnClientEvent } from '../interface';
export interface BaseballGameProperties {
  id: string | null;
  date: string | null;
  teams: EspnClientCompetitor[];
}

export type BaseballGame = BaseballGameProperties & Partial<EspnClientEvent>;
