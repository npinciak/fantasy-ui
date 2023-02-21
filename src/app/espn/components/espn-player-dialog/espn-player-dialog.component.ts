import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { headshotImgBuilder } from '@app/espn/espn.const';
import { PlayerNewsFeedEntity } from 'sports-ui-sdk/lib/espn/models/espn-client.model';

@Component({
  selector: 'app-espn-player-dialog',
  templateUrl: './espn-player-dialog.component.html',
})
export class EspnPlayerDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { player: any; sport: string; news: PlayerNewsFeedEntity[] },
    public dialogRef: MatDialogRef<EspnPlayerDialogComponent>
  ) {}

  get playerImg() {
    return headshotImgBuilder(this.data.player.id, { league: this.data.sport, width: 800, height: 500 });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
