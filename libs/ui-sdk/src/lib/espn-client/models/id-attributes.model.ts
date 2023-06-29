export interface IdAttributes<T> {
  defaultPositionId: T;
  externalId: T;
  fromLineupSlotId: T;
  fromTeamId: T;
  id: T;
  lineupSlotId: T;
  matchupPeriodId: T;
  memberId: T;
  messageTypeId: T;
  parentId: T;
  playerId: T;
  proTeamId: T;
  scoringPeriodId: T;
  seasonId: T;
  statSplitTypeId: T;
  targetId: T;
  teamId: T;
  toLineupSlotId: T;
  topicId: T;
  toTeamId: T;
  uid: T;
}

export type IdAttributesString = IdAttributes<string>;
export type IdAttributesNumber = IdAttributes<number>;
