import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { headshotImgBuilder } from '@app/espn/espn.const';
import { BaseballPlayer } from '@app/espn/mlb/models/baseball-player.model';
import { PlayerDialog } from '@app/espn/models/player-dialog-component.model';
import { FootballPlayer } from '@app/espn/nfl/models/football-player.model';

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
    const id = this.data.player.id;
    return // headshotImgBuilder({ teamId: id, league: this.data.sport, width: 800, height: 500 });
  }

  safeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
