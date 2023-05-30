export const BASEBALL_TOOLTIPS: Record<string, string> = {
  CONTACT: 'Batted ball trajectory stats. Batted ball quality stats. Examples: GB%, Hard%, Speed-Angle combination stats.',
  CONTEXT: 'Elements outside the realm of evaluation in a single pitch. Examples: Batting Order, Weather, Park, Umpire',
  PITCH_TYPE:
    // eslint-disable-next-line max-len
    'An evaluation across categories to measure and rate performance on or vs. a pitch type. Example: GB% vs. FT. Whiff% vs. SL. Contact % vs. CUKC.',
  PRODUCTION: 'Statistics that describe the outcomes displayed by a player. Examples: wOBA, BB%, Indicators.',
  PLATE_DISC: 'Skills displayed by batters and pitchers controlling the PA. Examples: Contact%, SwStrk%, OSwing%, Batter Ahead%',
  RECENT_SKILL:
    'A Review and rating of more recent behavior across categories. Example: EV Differential, Pitcher Velocity Change, 60 Day K%',
} as const;
