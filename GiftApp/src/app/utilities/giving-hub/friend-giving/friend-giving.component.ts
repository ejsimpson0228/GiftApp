import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Friend } from 'src/app/_models/friend';
import { GivenGiftsService } from 'src/app/_shared/given-gifts.service';
import { Gift } from 'src/app/_models/gift';
import { AlertService } from 'src/app/_shared/alert.service';

@Component({
  selector: 'app-friend-giving',
  templateUrl: './friend-giving.component.html',
  styleUrls: ['./friend-giving.component.css']
})
export class FriendGivingComponent implements OnInit {
  @Input() friend: Friend;
  @Output() goBack = new EventEmitter();
  giftsGivenToUser: Gift[] = [];

  constructor(private givenGiftsService: GivenGiftsService, private alertService: AlertService) { }

  ngOnInit() {
    this.getGiftsGivenToUser();
  }

  return() {
    this.goBack.emit();
  }

  onNewGiftGiven(gift: Gift) {
    this.giftsGivenToUser.push(gift);
  }

  getGiftsGivenToUser() {
    this.givenGiftsService.getGiftsGivenToUser(this.friend.userName).subscribe(
      (data: Gift[]) => {
        this.giftsGivenToUser = data;
      },
      error => {
        this.alertService.error('Error retrieving gifts given');
      }
    );
  }

}
