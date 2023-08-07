import { IdAttributesNumber, IdAttributesString } from './id-attributes.model';
import { TRANSACTION } from './transaction.const';

export type LeagueTransaction = Pick<IdAttributesString, 'id' | 'memberId'> &
  Pick<IdAttributesNumber, 'id' | 'teamId'> & {
    bidAmount: number;
    executionType: 'PROCESS' | 'CANCEL';
    isActingAsTeamOwner: boolean;
    isLeagueManager: boolean;
    isPending: boolean;
    items?: LeagueTransactionEntity[] | null;
    proposedDate: number;
    rating: number;
    scoringPeriodId: number;
    status: 'EXECUTED' | 'CANCELED';
    type: TransactionType;
    relatedTransactionId?: string | null;
    processDate?: number | null;
  };

export type LeagueTransactionEntity = Pick<
  IdAttributesNumber,
  'playerId' | 'fromLineupSlotId' | 'fromTeamId' | 'toLineupSlotId' | 'toTeamId'
> & {
  isKeeper: boolean;
  overallPickNumber: number;
  type: TransactionType;
};
export type TransactionType = typeof TRANSACTION[keyof typeof TRANSACTION];
