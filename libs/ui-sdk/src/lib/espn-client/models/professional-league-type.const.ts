import { ProLeagueType } from './professional-league-type.model';

export const PRO_LEAGUE_ABBREV_BY_PRO_LEAGUE_TYPE: { [key in ProLeagueType]: string } = {
  [ProLeagueType.MLB]: 'MLB',
  [ProLeagueType.NCAAF]: 'NCAAF',
  [ProLeagueType.NFL]: 'NFL',
  [ProLeagueType.NBA]: 'NBA',
  [ProLeagueType.NHL]: 'NHL',
};

export const PRO_LEAGUE_TYPE_BY_PRO_LEAGUE_ABBREV: Record<string, ProLeagueType> = {
  MLB: ProLeagueType.MLB,
  NCAAF: ProLeagueType.NCAAF,
  NFL: ProLeagueType.NFL,
  NBA: ProLeagueType.NBA,
  NHL: ProLeagueType.NHL,
};
