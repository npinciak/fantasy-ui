import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-info-col',
  templateUrl: './player-info-col.component.html'
})

export class PlayerInfoColComponent {
  @Input() player: any;
  constructor() { }


}
