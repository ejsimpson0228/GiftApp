import { Component, OnInit, Input } from '@angular/core';
import { FriendRequest } from 'src/app/_models/friend-request';
import { FriendService } from 'src/app/_shared/friend.service';
import { AlertService } from 'src/app/_shared/alert.service';

@Component({
  selector: 'app-sent-requests',
  templateUrl: './sent-requests.component.html',
  styleUrls: ['../friend-management.component.css']
})
export class SentRequestsComponent implements OnInit {
  @Input() SentRequests: FriendRequest[] = [];

  constructor(private friendService: FriendService, private alertService: AlertService) { }

  ngOnInit() {
  }

  cancelSentRequest(requestId: number, index: number) {
    this.friendService.cancelSentRequest(requestId).subscribe(
      result => {
        this.alertService.success('Friend request canceled');
        this.SentRequests.splice(index, 1);
      },
      error => {
        this.alertService.error('Error canceling request');
        console.log(error);
      }
    );
  }
}
