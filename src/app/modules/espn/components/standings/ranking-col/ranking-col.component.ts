import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ranking-col',
  templateUrl: './ranking-col.component.html',
})
export class RankingColComponent implements OnInit {
  @Input() team: any;
  constructor() { }

  ngOnInit(): void {
  }

}
