import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_shared/user.service';
import { GiftService } from '../_shared/gift.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userGifts: any;
  @Input() userDetails: any;

  constructor(private giftService: GiftService, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      response => {
        this.userDetails = response;
      },
      error => {
        console.log(error);
      }
    );

    this.giftService.getUserGifts().subscribe(
      response => {
        this.userGifts = response;
      },
      error => {
        console.log(error);
      }
    );
  }
}
