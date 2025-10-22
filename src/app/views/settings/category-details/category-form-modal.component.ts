import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatIcon
  ],
  template: `
    <div class="row">
        <div class="col-md-8">
            <h2 mat-dialog-title>Add Category</h2>
        </div>
        
        <div class="col-md-4">
            <button mat-icon-button (click)="onCancel()" aria-label="Close" class="float-end">
                <mat-icon>close</mat-icon>
            </button>
        </div>
    </div>
    
    
    <mat-dialog-content>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Category name</mat-label>
          <input matInput formControlName="name" placeholder="Enter Category name" />          
          <mat-error *ngIf="form.controls['name'].invalid && form.controls['name'].touched">
            Category Name is required.
          </mat-error>
        </mat-form-field>

        <div style="margin: 20px 0;">
          <mat-label>Status</mat-label>
          <mat-slide-toggle formControlName="status" class="mt-3">
            {{ form.get('status') ? 'Actice' : 'In-Actice' }}
          </mat-slide-toggle>
        </div>

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
export class FormModalComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      status: [true]
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