import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from './alert.service';
import { Alert } from './alert.model';
import { trigger, transition, style, animate } from '@angular/animations';
import { NgClass } from '@angular/common'; // 👈 import directives

@Component({
  selector: 'app-alert',
  standalone: true,   // 👈 mark as standalone
  imports: [NgClass], // 👈 register them here
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class AlertComponent implements OnInit, OnDestroy {
  alerts: Alert[] = [];
  private sub!: Subscription;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.sub = this.alertService.alerts$.subscribe(alerts => {
      this.alerts = alerts;
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  remove(alert: Alert) {
    this.alertService.remove(alert.id);
  }
}