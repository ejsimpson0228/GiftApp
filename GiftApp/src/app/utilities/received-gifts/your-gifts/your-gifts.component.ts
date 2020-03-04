import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faGift } from '@fortawesome/free-solid-svg-icons';
import { Gift } from 'src/app/_models/gift';
import { RequestGiftModalComponent } from '../request-gift-modal/request-gift-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { trigger, transition, query, style, stagger, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-your-gifts',
  templateUrl: './your-gifts.component.html',
  styleUrls: ['../received-gifts.component.css'],
  animations: [
    trigger('yourGiftsEntry', [
      transition('* => *', [
        query(':enter', style({opacity: 0}), {optional: true}),
        query(':enter', stagger(200, [
          animate(200, keyframes([
            style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
            style({opacity: 1, transform: 'translateX(15px)', offset: 0.3}),
            style({opacity: 1, transform: 'translateX(0)', offset: 1})
          ]))
        ]), {optional: true})
      ])
    ])
  ]
})
export class YourGiftsComponent implements OnInit {
  faGift = faGift;
  @Input() receivedGifts: Gift[];
  @Output() giftClaimed = new EventEmitter<{}>();

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open(gift: Gift) {
    const modalRef = this.modalService.open(RequestGiftModalComponent);
    modalRef.componentInstance.gift = gift;
    modalRef.result.then(() => { this.giftClaimed.emit(); } );
  }

}
