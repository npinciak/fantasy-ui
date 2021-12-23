import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PositiveEntityOrNegativeEntity } from '@app/dfs/mlb/models/slatePlayer.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string | null; body: PositiveEntityOrNegativeEntity[] }
  ) {}

  ngOnInit(): void {}

  public close(): void {
    this.dialogRef.close(true);
  }
}
