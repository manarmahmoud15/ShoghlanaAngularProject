import { Component } from '@angular/core';

@Component({
  selector: 'app-success-dialog',
  template: `
    <h1 mat-dialog-title>Success</h1>
    <div mat-dialog-content>
      <p>Saved successfully!</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>
  `,
})
export class SuccessDialogComponent {}
