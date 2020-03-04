import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FriendService } from 'src/app/_shared/friend.service';
import { FriendRequest } from 'src/app/_models/friend-request';

@Component({
  selector: 'app-friend-management',
  templateUrl: './friend-management.component.html',
  styleUrls: ['./friend-management.component.css']
})
export class FriendManagementComponent implements OnInit {
  sentFriendRequests: FriendRequest[] = [];
  receivedFriendRequests: FriendRequest[] = [];

  constructor(private friendService: FriendService) { }

  ngOnInit() {
    this.getSentFriendRequests();
    this.getReceivedFriendRequests();
  }

  getSentFriendRequests() {
    this.friendService.getSentFriendRequests().subscribe(
      (result: FriendRequest[]) => {
        this.sentFriendRequests = result;
      },
      error => {
        alert('Something went wrong getting sent friend requests');
        console.log(error);
      }
    );
  }

  getReceivedFriendRequests() {
    this.friendService.getFriendRequests().subscribe(
      (result: FriendRequest[]) => {
        this.receivedFriendRequests = result;
      },
      error => {
        alert('Something went wrong getting received friend requests');
        console.log(error);
      }
    );
  }

  onFriendRequestSent(friendRequestSent: FriendRequest) {
    this.sentFriendRequests.push(friendRequestSent);
  }
}
