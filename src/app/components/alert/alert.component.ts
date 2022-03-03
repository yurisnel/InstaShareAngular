import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { Alert, AlertType } from 'src/app/components/alert/alert.model';
import { AlertService } from 'src/app/components/alert/alert.service';

@Component(
  {
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['./alert.component.scss']
  })
export class AlertComponent implements OnInit, OnDestroy {
  @Input() id = 'default-alert';
  @Input() fade = true;
  
  alerts: Alert[] = [];
  alertSubscription?: Subscription;
  routeSubscription?: Subscription;

  constructor(private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    // subscribe to new alert notifications
    this.alertSubscription = this.alertService.onAlert(this.id)
      .subscribe(alert => {
        // clear alerts when an empty alert is received
        if (!alert.message) {
          // filter out alerts without 'keepAfterRouteChange' flag
          this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

          // remove 'keepAfterRouteChange' flag on the rest
          this.alerts.forEach(x => delete x.keepAfterRouteChange);
          return;
        }

        // add alert to array
        this.alerts.push(alert);

        this.setClass(alert);

        // auto close alert if required
        if (alert.autoClose) {
          setTimeout(() => this.removeAlert(alert), 3000);
        }
      });

    // clear alerts on location change
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.alertService.clear(this.id);
      }
    });
  }

  ngOnDestroy() {
    // unsubscribe to avoid memory leaks
    if (this.alertSubscription) {
      this.alertSubscription.unsubscribe();
    }
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }

  }

  removeAlert(alert: Alert) {
    // check if already removed to prevent error on auto close
    if (!this.alerts.includes(alert)) return;

    if (this.fade) {

      // fade out alert

      let temp = this.alerts.find(x => x === alert);
      if (temp){
        temp.classesList = temp.classesList.filter(x => x !== 'show');
      }

      // remove alert after faded out
      setTimeout(() => {
        this.alerts = this.alerts.filter(x => x !== alert);
      }, 250);
    } else {
      // remove alert
      this.alerts = this.alerts.filter(x => x !== alert);
    }
  }

  iconHref(alert: Alert) {
    const alertIcon = {
      [AlertType.Info]: '#info-fill',
      [AlertType.Success]: '#check-circle-fill',
      [AlertType.Error]: '#exclamation-triangle-fill',
      [AlertType.Warning]: '#exclamation-triangle-fill'
    }
    if (alert.type != undefined)
      return alertIcon[alert.type];

    return '';
  }

  setClass(alert: Alert) {
    if (!alert) return;

    const alertTypeClass = {
      [AlertType.Success]: 'alert-success',
      [AlertType.Error]: 'alert-danger',
      [AlertType.Info]: 'alert-info',
      [AlertType.Warning]: 'alert-warning'
    }
    if (alert.type != undefined)
      alert.classesList.push(alertTypeClass[alert.type]);

    if (alert.fade) {
      alert.classesList.push('fade');
      setTimeout(() => alert.classesList.push('show'), 10);
    }   
  }
}