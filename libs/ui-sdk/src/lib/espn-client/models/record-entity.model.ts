type RecordEntityAttributes = 'gamesBack' | 'losses' | 'percentage' | 'pointsAgainst' | 'pointsFor' | 'streakLength' | 'ties' | 'wins';
export type RecordEntity = { [prop in RecordEntityAttributes]: number } & { streakType: string };
