import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-espn-player-dialog',
  templateUrl: './espn-player-dialog.component.html',
  styleUrls: ['./espn-player-dialog.component.scss'],
})
export class EspnPlayerDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { playerId: string }, public dialogRef: MatDialogRef<EspnPlayerDialogComponent>) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
