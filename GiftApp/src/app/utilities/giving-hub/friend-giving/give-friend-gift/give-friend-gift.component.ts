import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Friend } from 'src/app/_models/friend';
import { GiftService } from 'src/app/_shared/gift.service';
import { Gift } from 'src/app/_models/gift';
import { format } from 'util';
import { AlertService } from 'src/app/_shared/alert.service';

@Component({
  selector: 'app-give-friend-gift',
  templateUrl: './give-friend-gift.component.html',
  styleUrls: ['../friend-giving.component.css']
})
export class GiveFriendGiftComponent implements OnInit {
  @Input() friend: Friend;
  giveGiftForm = new FormGroup({
    GiftName: new FormControl('', Validators.required),
    Quantity: new FormControl('', Validators.required),
    ReceiverUserName: new FormControl('')
  });
  @Output() giftGiven = new EventEmitter<Gift>();

  constructor(private giftService: GiftService, private alertService: AlertService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.giveGiftForm.controls['ReceiverUserName'].setValue(this.friend.userName);
    console.log('Here is your gift form:');
    console.log(this.giveGiftForm);
    this.giftService.giveGift(this.giveGiftForm.value).subscribe(
      (result: Gift) => {
        this.alertService.success('Gift given successfully!');
        this.giveGiftForm.reset();
        this.giftGiven.emit(result);
      },
      error => {
        this.alertService.error('Error occurred when giving gift');
      }
    );
  }

}
