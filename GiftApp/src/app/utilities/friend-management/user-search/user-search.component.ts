import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FriendService } from 'src/app/_shared/friend.service';
import { FriendRequest } from 'src/app/_models/friend-request';
import { AlertService } from 'src/app/_shared/alert.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css', '../friend-management.component.css']
})
export class UserSearchComponent implements OnInit {
  searchFriendForm = new FormGroup({
    UsernameTo: new FormControl('', Validators.required)
  });
  @Output() friendRequestSent = new EventEmitter<FriendRequest>();

  constructor(private friendService: FriendService, private alertService: AlertService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.friendService.sendFriendRequest(this.searchFriendForm.value.UsernameTo).subscribe(
      (result: FriendRequest) => {
        this.alertService.success('Friend request to ' + result.usernameTo + ' sent successfully!');
        this.friendRequestSent.emit(result);
        this.searchFriendForm.reset();
      },
      error => {
        this.alertService.error(error.error);
      }
    );
  }

}
