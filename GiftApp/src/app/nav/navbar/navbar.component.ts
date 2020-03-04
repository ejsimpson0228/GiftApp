import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_shared/user.service';
import { trigger, transition, query, animate, keyframes, style } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('navbarEntry', [
      transition('* => *', [
        query('.navbar', style({ opacity: 0}), {optional: true}),
        query('.navbar', animate(500, keyframes([
          style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(15px)', offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)', offset: 1.0})
        ])))
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit, OnChanges {
  @Input() userDetails: any;
  username: '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.userDetails != null) {
      this.username = this.userDetails.userName;
    }
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

}
