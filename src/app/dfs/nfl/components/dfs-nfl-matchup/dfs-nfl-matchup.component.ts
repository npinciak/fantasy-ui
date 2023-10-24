import { Component, Input } from '@angular/core';
import { DfsNflThresholds } from '../../consts/stats-threshold.m';

@Component({
  selector: 'app-dfs-nfl-matchup',
  templateUrl: './dfs-nfl-matchup.component.html',
  styleUrls: ['./dfs-nfl-matchup.component.scss'],
})
export class DfsNflMatchupComponent {
  @Input() matchups: any;
  @Input() matchupsExist = false;

  readonly matchupThreshold = DfsNflThresholds.matchupThreshold;
  readonly matchupThresholdInverse = DfsNflThresholds.matchupThresholdInverse;
}
