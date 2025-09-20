import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Alert } from './alert.model';


@Injectable({ providedIn: 'root' })
export class AlertService {
private _alerts$ = new BehaviorSubject<Alert[]>([]);
readonly alerts$ = this._alerts$.asObservable();


private idCounter = 0;


private nowId() {
return `${Date.now()}-${this.idCounter++}`;
}


private push(alert: Alert) {
const current = this._alerts$.value;
this._alerts$.next([...current, alert]);
if (alert.autoClose !== false) {
const timeout = alert.timeout ?? 5000;
setTimeout(() => this.remove(alert.id), timeout);
}
}


success(message: string, options?: Partial<Alert>) {
this.push({ id: this.nowId(), type: 'success', message, autoClose: true, ...options });
}


error(message: string, options?: Partial<Alert>) {
this.push({ id: this.nowId(), type: 'error', message, autoClose: true, ...options });
}


info(message: string, options?: Partial<Alert>) {
this.push({ id: this.nowId(), type: 'info', message, autoClose: true, ...options });
}


warning(message: string, options?: Partial<Alert>) {
this.push({ id: this.nowId(), type: 'warning', message, autoClose: true, ...options });
}


clear() {
this._alerts$.next([]);
}


remove(id: string) {
const current = this._alerts$.value.filter(a => a.id !== id);
this._alerts$.next(current);
}
}