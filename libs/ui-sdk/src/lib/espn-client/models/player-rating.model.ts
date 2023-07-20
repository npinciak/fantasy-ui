export enum PlayerRatingTimePeriod {
  Season,
  Pr7,
  Pr15,
  Pr30,
}

type PlayerRatingsAttributes = 'positionalRanking' | 'totalRanking' | 'totalRating';

export type PlayerRatingsEntity = { [prop in PlayerRatingsAttributes]: number };
export type PlayerRatings = Record<PlayerRatingTimePeriod, PlayerRatingsEntity>;
