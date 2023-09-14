import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FootballPlayer } from '@app/espn-fantasy-football/models/football-player.model';
import { BaseballPlayer } from '@app/espn/mlb/models/baseball-player.model';
import { PlayerDialog } from '@app/espn/models/player-dialog-component.model';

@Component({
  selector: 'app-espn-player-dialog',
  templateUrl: './espn-player-dialog.component.html',
})
export class EspnPlayerDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PlayerDialog<BaseballPlayer | FootballPlayer>,
    public dialogRef: MatDialogRef<EspnPlayerDialogComponent>,
    private sanitizer: DomSanitizer
  ) {}

  get playerImg() {
    return '';
  }

  safeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
