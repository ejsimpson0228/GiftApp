import { Component, OnInit, Input } from '@angular/core';
import { FriendRequest } from 'src/app/_models/friend-request';
import { FriendService } from 'src/app/_shared/friend.service';
import { AlertService } from 'src/app/_shared/alert.service';

@Component({
  selector: 'app-incoming-requests',
  templateUrl: './incoming-requests.component.html',
  styleUrls: ['../friend-management.component.css']
})
export class IncomingRequestsComponent implements OnInit {
  @Input() IncomingRequests: FriendRequest[] = [];

  constructor(private friendService: FriendService, private alertService: AlertService) { }

  ngOnInit() {
  }

  confirmRequest(requestId: number, index: number) {
    this.friendService.acceptFriendRequest(requestId).subscribe(
      result => {
        this.alertService.success(result);
        this.IncomingRequests.splice(index, 1);
      },
      error => {
        this.alertService.error('Error accepting request');
      }
    );
  }

  declineRequest(requestId: number, index: number) {
    this.friendService.declineFriendRequest(requestId).subscribe(
      result => {
        this.alertService.success(result);
        this.IncomingRequests.splice(index, 1);
      },
      error => {
        this.alertService.error('Error declining request');
      }
    );
  }

}
