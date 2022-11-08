import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { headshotImgBuilder } from '@app/espn/espn.const';

@Component({
  selector: 'app-espn-player-dialog',
  templateUrl: './espn-player-dialog.component.html',
  styleUrls: ['./espn-player-dialog.component.scss'],
})
export class EspnPlayerDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { player: any }, public dialogRef: MatDialogRef<EspnPlayerDialogComponent>) {
    console.log(data);
  }

  get playerImg() {
    return headshotImgBuilder(this.data.player.id, { league: 'nfl', width: 800, height: 500 });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
