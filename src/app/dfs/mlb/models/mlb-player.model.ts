import { SlatePlayerAttr } from '@app/dfs/models/daily-fantasy-client.model';
import { Player } from '@app/dfs/models/player.model';

interface MlbDfsPlayerProperties {
  opponent: string | null;
  ranking: string | null;
  inLineup: boolean | null;
  salary: null; // TODO: { dk: number; fd: number; }
  ownershup: null; // TODO: { dk: number; fd: number; }
  isPitcher: boolean;
  isBatter: boolean;
  stats: {
    oneWeek: null; // TODO: {};
    twoWeeks: null; // TODO: {};
    fourWeeks: null; // TODO: {};
  };
}

export type MlbDfsPlayer = MlbDfsPlayerProperties & Player & Pick<SlatePlayerAttr, 'plateiq'>;
