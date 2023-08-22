import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  private showSnackBar(snackType: string, message: string): MatSnackBarRef<TextOnlySnackBar> {
    return this.snackBar.open(message, '', {
      panelClass: snackType,
      duration: 5000,
    });
  }

  showErrorSnackBar(message: string): MatSnackBarRef<TextOnlySnackBar> {
    return this.showSnackBar('error', message);
  }

  showWarnSnackBar(message: string): MatSnackBarRef<TextOnlySnackBar> {
    return this.showSnackBar('warning', message);
  }

  showSuccessSnackBar(message: string): MatSnackBarRef<TextOnlySnackBar> {
    return this.showSnackBar('success', message);
  }

  showInfoSnackBar(message: string): MatSnackBarRef<TextOnlySnackBar> {
    return this.showSnackBar('info', message);
  }
}
