import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Alert } from '../_models/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<Alert>();

  constructor() { }

  getAlert(): Observable<Alert> {
    return this.subject.asObservable();
  }

  success(message: string) {
    this.alert(message, 'success-alert');
  }

  error(message: string) {
    this.alert(message, 'error-alert');
  }

  alert(message: string, cssClass: string) {
    this.subject.next();
    this.subject.next(<Alert>{ message: message, cssClass: cssClass});
  }
}
