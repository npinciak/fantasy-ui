import { Component } from '@angular/core';
import { EspnLineupCardComponent } from '@app/espn/components/espn-lineup-card/espn-lineup-card.component';
import { BaseballStat } from '@sports-ui/ui-sdk/espn';
import { exists } from '@sports-ui/ui-sdk/helpers';
import { BaseballPlayer, BaseballPlayerLiveStatsRow } from '../../models/baseball-player.model';

@Component({
  selector: 'app-baseball-lineup-card',
  templateUrl: './baseball-lineup-card.component.html',
})
export class BaseballLineupCardComponent extends EspnLineupCardComponent<BaseballPlayer> {
  readonly BaseballStat = BaseballStat;

  performanceSummary(player: BaseballPlayerLiveStatsRow): string {
    const stats = player.stats;

    if (!exists(stats)) return 'No Game';

    if (player.isPitcher) {
      const inningsPitchedText = stats[BaseballStat.IP] > 0 ? `${Math.round(stats[BaseballStat.IP])} IP, ` : '';
      const hitsAgainstText = stats[BaseballStat.HA] > 0 ? `${stats[BaseballStat.HA]} H, ` : '';
      const walksAgainstText = stats[BaseballStat.BBI] > 0 ? `${stats[BaseballStat.BBI]} BB, ` : '';
      const earnedRunsText = stats[BaseballStat.ER] > 0 ? `${stats[BaseballStat.ER]} ER, ` : '';
      const strikeoutsText = stats[BaseballStat.K] > 0 ? `${stats[BaseballStat.K]} K, ` : '';

      return `${inningsPitchedText}${hitsAgainstText}${earnedRunsText}${walksAgainstText}${strikeoutsText}`.slice(0, -2);
    }

    const hitsAtBatsTextAlt = `${!exists(stats[BaseballStat.H]) ? '' : `${stats[BaseballStat.H]}/`}${
      !exists(stats[BaseballStat.AB]) ? '' : stats[BaseballStat.AB]
    }, `;

    const runsText = stats[BaseballStat.R] > 0 ? `${stats[BaseballStat.R]} R, ` : '';
    const hitsText = stats[BaseballStat.H] > 0 ? `${stats[BaseballStat.H]} H, ` : '';
    const homerunText = stats[BaseballStat.HR] > 0 ? `${stats[BaseballStat.HR]} HR, ` : '';
    const rbiText = stats[BaseballStat.RBI] > 0 ? `${stats[BaseballStat.RBI]} RBI, ` : '';
    const stolenBasesText = stats[BaseballStat.SB] > 0 ? `${stats[BaseballStat.SB]} SB, ` : '';

    return `${hitsAtBatsTextAlt}${hitsText}${runsText}${homerunText}${rbiText}${stolenBasesText}`.slice(0, -2);
  }
}
