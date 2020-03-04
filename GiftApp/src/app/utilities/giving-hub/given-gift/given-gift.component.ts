import { Component, OnInit, Input } from '@angular/core';
import { RequestedGift } from 'src/app/_models/requested-gift';
import { GivenGiftsService } from 'src/app/_shared/given-gifts.service';
import { AlertService } from 'src/app/_shared/alert.service';

@Component({
  selector: 'app-given-gift',
  templateUrl: './given-gift.component.html',
  styleUrls: ['../giving-hub.component.css']
})
export class GivenGiftComponent implements OnInit {
  requestedGifts: RequestedGift[] = [];
  @Input() requestedGift: RequestedGift;

  constructor(private givenGiftsService: GivenGiftsService, private alertService: AlertService) { }

  ngOnInit() {
    this.getRequestedGifts();
  }

  getRequestedGifts() {
    this.givenGiftsService.getRequestedGifts().subscribe(
      (data: RequestedGift[]) => {
        this.requestedGifts = data;
      },
      error => {
        this.alertService.error('Error retrieving requested gifts');
      }
    );
  }

}
