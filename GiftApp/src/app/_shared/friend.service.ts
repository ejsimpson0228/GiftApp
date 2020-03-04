import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private http: HttpClient) { }

  getFriends() {
    return this.http.get(environment.baseUrl + 'friends/myfriends');
  }

  getFriendRequests() {
    return this.http.get(environment.baseUrl + 'friends/requests');
  }

  getSentFriendRequests() {
    return this.http.get(environment.baseUrl + 'friends/sentrequests');
  }

  sendFriendRequest(usernameTo: string) {
    return this.http.post(environment.baseUrl + 'friends/sendrequest/' + usernameTo, null); // TODO: see if this works
  }

  cancelSentRequest(requestId: number) {
    return this.http.delete(environment.baseUrl + 'friends/cancel/' + requestId, {responseType: 'text'});
  }

  declineFriendRequest(requestId: number) {
    return this.http.delete(environment.baseUrl + 'friends/decline/' + requestId, {responseType: 'text'});
  }

  acceptFriendRequest(requestId: number) {
    return this.http.post(environment.baseUrl + 'friends/confirm/' + requestId, {}, {responseType: 'text'});
  }

}
