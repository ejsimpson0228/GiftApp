import { Component, OnInit } from '@angular/core';
import { AlertService } from '../_shared/alert.service';
import { Alert } from '../_models/alert';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  showAlert = false;
  alertClass: string;
  alert: Alert;
  alertDisplayTime = 5000;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getAlert().subscribe(
      (alert: Alert) => {
        if (!alert) {
          this.alert = null;
          this.showAlert = false;
          return;
        }
        this.alert = alert;
        this.showAlert = true;
        setTimeout(() => {
          this.alert = null;
          this.showAlert = false;
        }, this.alertDisplayTime);
      }
    );
  }

}
