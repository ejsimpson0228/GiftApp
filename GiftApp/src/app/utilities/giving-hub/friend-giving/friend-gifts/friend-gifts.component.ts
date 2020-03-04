import { Component, OnInit, Input } from '@angular/core';
import { Gift } from 'src/app/_models/gift';
import { Friend } from 'src/app/_models/friend';
import { GivenGiftsService } from 'src/app/_shared/given-gifts.service';
import { trigger, transition, animate, style } from '@angular/animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/_shared/alert.service';

@Component({
  selector: 'app-friend-gifts',
  templateUrl: './friend-gifts.component.html',
  styleUrls: ['../friend-giving.component.css'],
  animations: [
    trigger('giftEntry', [
      transition('* => void', [
        style({
          opacity: 1
        }),
        animate(1000, style({
          opacity: 0
        }))
      ]),
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate(1000, style({
          opacity: 1
        }))
      ])
    ])
  ]
})
export class FriendGiftsComponent implements OnInit {
  @Input() friend: Friend;
  @Input() friendGifts: Gift[] = [];
  addQuantityMode: false;
  giftToEditIndex = -1;
  editGiftForm = new FormGroup({
      GiftId: new FormControl(''),
      NewGiftName: new FormControl('', Validators.required),
      NewQuantity: new FormControl('', Validators.required),
      NewIsNew: new FormControl('')
  });

  constructor(private givenGiftsService: GivenGiftsService, private alertService: AlertService) { }

  ngOnInit() {
  }

  deleteGift(gift: Gift) {
    return this.givenGiftsService.deleteGift(gift.id).subscribe(
      success => {
        const index = this.friendGifts.indexOf(gift);
        if (index !== -1) {
          this.friendGifts.splice(index, 1);
        }
        this.alertService.success('Gift deleted successfully');
      },
      error => {
        this.alertService.error('Something went wrong when deleting gift');
      }
    );
  }

  onEdit(index: number) {
    this.giftToEditIndex = index;
    this.editGiftForm.controls['NewGiftName'].patchValue(this.friendGifts[index].name);
    this.editGiftForm.controls['NewQuantity'].patchValue(this.friendGifts[index].quantity);
  }

  onSubmit(index: number) {
    this.editGiftForm.controls['GiftId'].patchValue(this.friendGifts[index].id);
    this.editGiftForm.controls['NewIsNew'].patchValue(true); // may add more features to this later, right now this is kind of pointless
    this.givenGiftsService.editGift(this.editGiftForm.value).subscribe(
      (result: Gift) => {
        this.friendGifts[index] = result;
        this.alertService.success('Gift edited successfully');
      },
      error => {
        this.alertService.error('Error editing gift');
      }
    );
    this.giftToEditIndex = -1;
  }

}
