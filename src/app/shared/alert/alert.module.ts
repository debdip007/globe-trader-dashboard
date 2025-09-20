import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
declarations: [AlertComponent],
imports: [CommonModule, BrowserAnimationsModule],
exports: [AlertComponent]
})
export class AlertModule {}