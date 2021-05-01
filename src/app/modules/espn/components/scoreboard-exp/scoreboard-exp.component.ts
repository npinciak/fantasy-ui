import { Component, Input, OnInit } from '@angular/core';
import { BaseballTeam } from '../../models/mlb/class/team.class';

@Component({
  selector: 'app-scoreboard-exp',
  templateUrl: './scoreboard-exp.component.html',
  styleUrls: ['./scoreboard-exp.component.scss']
})
export class ScoreboardExpComponent implements OnInit {
  @Input() teams: BaseballTeam[];
  @Input() stat: string;

  constructor() { }

  ngOnInit(): void { }


  /**
   * Sort stats descending
   *
   * @returns BaseballTeam[] in descending order based on `this.stat` - era & whip in ascending
   */
  get sorted() {
    switch (this.stat) {
      case 'era':
      case 'whip':
        return this.teams.sort((a, b) => a.stats[this.stat] - b.stats[this.stat]);
      default:
        return this.teams.sort((a, b) => b.stats[this.stat] - a.stats[this.stat]);
    }
  }
}
