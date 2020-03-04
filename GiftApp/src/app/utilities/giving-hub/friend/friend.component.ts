import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Friend } from 'src/app/_models/friend';
import { FriendService } from 'src/app/_shared/friend.service';
import { AlertService } from 'src/app/_shared/alert.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['../giving-hub.component.css']
})
export class FriendComponent implements OnInit {
  friends: Friend[] = [];
  @Output() friendSelected = new EventEmitter<Friend>();

  constructor(private alertService: AlertService,
            private friendsService: FriendService) { }

  ngOnInit() {
    this.getFriends();
  }

  getFriends() {
    this.friendsService.getFriends().subscribe(
      data => {
        Object.keys(data).forEach(key => {
          const newFriend = { userName: data[key].userName, email: data[key].email };
          this.friends.push(Object.assign({}, newFriend));
        });
      },
      error => {
        this.alertService.error('Error getting friends');
      }
    );
  }

  openFriend(friend: Friend) {
    this.friendSelected.emit(friend);
  }

}
