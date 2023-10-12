import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nfl-matchup-row',
  templateUrl: './nfl-matchup-row.component.html',
  styleUrls: ['./nfl-matchup-row.component.scss'],
})
export class NflMatchupRowComponent {
  @Input() matchup: any;

  @Input() statRank: number;
  @Input() statValue: number;

  @Input() label: string;
  @Input() description: string;

  @Input() threshold: (val: number) => string;
}
