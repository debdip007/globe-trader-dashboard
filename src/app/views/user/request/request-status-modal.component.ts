import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'request-status-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatIcon,
    MatRadioModule
  ],
  template: `
    <div class="row">
        <div class="col-md-8">
            <h2 mat-dialog-title>Confirm Request</h2>
        </div>
        
        <div class="col-md-4">
            <button mat-icon-button (click)="onCancel()" aria-label="Close" class="float-end">
                <mat-icon>close</mat-icon>
            </button>
        </div>
    </div>
    
    
    <mat-dialog-content>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <h5 class="block mb-2 font-medium">Status</h5>

        <mat-radio-group formControlName="accept" class="flex flex-col gap-2">
            <mat-radio-button value="1">Approve</mat-radio-button>
            <mat-radio-button value="2">Reject</mat-radio-button>
            <!-- <mat-radio-button value="3">Cancel</mat-radio-button> -->
        </mat-radio-group>

        <input type="hidden" formControlName="id" />
        <!-- <mat-error *ngIf="form.controls['status'].invalid && form.controls['status'].touched">
            Please select a status.
        </mat-error> -->

        <div mat-dialog-actions>
            <button mat-button type="button" (click)="onCancel()">Cancel</button>
            <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid">
            Submit
            </button>
        </div>
        </form>
    </mat-dialog-content>
  `,
  styles: [`
    .w-full { width: 100%; }
    mat-dialog-content { display: block; min-width: 350px; }
  `]
})
export class RequestStatusModalComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RequestStatusModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      id: [this.data?.id || ''],
      accept: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value); // return data to parent
    }
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}