import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Gift } from 'src/app/_models/gift';
import { GiftService } from 'src/app/_shared/gift.service';
import { RequestedGift } from 'src/app/_models/requested-gift';
import { trigger, transition, style, animate, query, stagger, keyframes } from '@angular/animations';
import { AlertService } from 'src/app/_shared/alert.service';

@Component({
  selector: 'app-your-requests',
  templateUrl: './your-requests.component.html',
  styleUrls: ['../received-gifts.component.css'],
  animations: [
    trigger('claimedGiftsEntry', [
      transition('* => *', [
        query('li', style({opacity: 0}), {optional: true}),
        query('li', stagger(200, [
          animate(200, keyframes([
            style({opacity: 0, transform: 'translateY(100%)', offset: 0}),
            style({opacity: 1, transform: 'translateY(-15px)', offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1})
          ]))
        ]), {optional: true})
      ])
    ])
  ]
})
export class YourRequestsComponent implements OnInit {
  @Input() requestedGifts: RequestedGift[];
  @Output() giftCanceled = new EventEmitter<{}>();

  constructor(private giftService: GiftService, private alertService: AlertService) { }

  ngOnInit() {
  }

  cancelGiftRequest(cancelRequest: { id: number, date: Date }) {
      this.giftService.cancelRequestedGift(cancelRequest).subscribe(
        data => {
          this.alertService.success('Request canceled');
          this.giftCanceled.emit();
        },
        error => {
          this.alertService.error('Error canceling gift');
        }
      );
  }

}
