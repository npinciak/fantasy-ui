import { POSITION_LIMITS_BY_SITE, ROSTER_SIZE_BY_SITE, SALARY_CAP_BY_SITE } from './ruleset.const';

export class DfsRulset {
  constructor(private site: string, private league: string) {}

  get rosterSize(): number {
    return ROSTER_SIZE_BY_SITE[this.site][this.league];
  }

  get salaryCap(): number {
    return SALARY_CAP_BY_SITE[this.site][this.league];
  }

  get positionLimits(): Record<string, { min: number; max: number }> {
    return POSITION_LIMITS_BY_SITE[this.site][this.league];
  }
}
