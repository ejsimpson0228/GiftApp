import { Component, OnInit } from '@angular/core';
import { GiftService } from 'src/app/_shared/gift.service';
import { Gift } from 'src/app/_models/gift';
import { RequestedGift } from 'src/app/_models/requested-gift';
import { AlertService } from 'src/app/_shared/alert.service';


@Component({
  selector: 'app-received-gifts',
  templateUrl: './received-gifts.component.html',
  styleUrls: ['./received-gifts.component.css']
})
export class ReceivedGiftsComponent implements OnInit {
  receivedGifts: Gift[] = [];
  requestedGifts: RequestedGift[] = [];
  errors: [];

  constructor(private giftService: GiftService, private alertService: AlertService) { }

  ngOnInit() {
    this.initiateGiftsAndRequests();
  }

  initiateGiftsAndRequests() {
    this.giftService.getUserGifts().subscribe(
      (result: Gift[]) => {
        this.receivedGifts = result;
      },
      error => {
        this.alertService.error('Error getting gifts');
      }
    );

    this.giftService.getUserRequestedGifts().subscribe(
      (result: RequestedGift[]) => {
        this.requestedGifts = result;
      },
      error => {
        this.alertService.error('Error getting your requests');
      }
    );
  }

}
