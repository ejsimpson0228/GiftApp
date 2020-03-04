import { Component, OnInit } from '@angular/core';
import { GivenGiftsService } from 'src/app/_shared/given-gifts.service';
import { FriendService } from 'src/app/_shared/friend.service';
import { RequestedGift } from 'src/app/_models/requested-gift';
import { Friend } from 'src/app/_models/friend';

@Component({
  selector: 'app-giving-hub',
  templateUrl: './giving-hub.component.html',
  styleUrls: ['./giving-hub.component.css']
})
export class GivingHubComponent implements OnInit {

  constructor(private givenGiftsService: GivenGiftsService, private friendsService: FriendService) { }
  viewFriendGiving = false;
  friendToView: Friend;

  ngOnInit() {
  }

  friendGivingView(friendToView: Friend) {
    this.friendToView = friendToView;
    this.viewFriendGiving = true;
  }

  backToHubView() {
    this.friendToView = null;
    this.viewFriendGiving = false;
  }

}
