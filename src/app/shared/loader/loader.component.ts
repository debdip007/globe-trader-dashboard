import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div
      class="loader-overlay"
      *ngIf="isLoading"
      @fadeAnimation>
      <mat-progress-spinner
        color="primary"
        mode="indeterminate"
        diameter="60">
      </mat-progress-spinner>
    </div>
  `,
  styles: [`
    .loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px); /* glassy blur */
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 9999;
}

mat-progress-spinner {
  --mdc-circular-progress-active-indicator-color: #007bff; /* custom color */
}
  `],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('250ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LoaderComponent {
  @Input() isLoading = false;
}