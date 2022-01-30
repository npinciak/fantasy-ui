import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(public dialog: MatDialog) {}

  public async openDialog(options?: unknown): Promise<boolean> {
    const dialogRef = this.dialog.open(DialogComponent, {
      minWidth: 500,
      maxWidth: 650,
      data: {
        title: options.title,
        body: options.body,
      },
    });

    return await dialogRef.afterClosed().toPromise();
  }
}
