import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, style, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.css'],
  animations: [
    trigger('subNavbarEntry', [
      transition('* => *', [
        query('.nav-box', style({ opacity: 0}), {optional: true}),
        query('.nav-box', animate(500, keyframes([
          style({opacity: 0, transform: 'translateX(100%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(-15px)', offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)', offset: 1.0})
        ])))
      ])
    ])
  ]
})
export class DashboardNavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
