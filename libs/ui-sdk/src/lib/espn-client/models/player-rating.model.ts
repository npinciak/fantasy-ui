type PlayerRatingsAttributes = 'positionalRanking' | 'totalRanking' | 'totalRating';

export type PlayerRatingsEntity = { [prop in PlayerRatingsAttributes]: number };
export type PlayerRatings = Record<number, PlayerRatingsEntity>;
