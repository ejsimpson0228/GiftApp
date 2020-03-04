import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GiftService {

  constructor(private http: HttpClient) { }

  getUserGifts() {
    return this.http.get(environment.baseUrl + 'gifts/mygifts');
  }

  getUserRequestedGifts() {
    return this.http.get(environment.baseUrl + 'gifts/MyRequestedGifts');
  }

  requestGift(giftRequested: any) {
    return this.http.post(environment.baseUrl + 'gifts/request', giftRequested, {responseType: 'text'});
  }

  cancelRequestedGift(requestedGift: { id: number, date: Date }) {
    return this.http.put(environment.baseUrl + 'gifts/cancel', requestedGift, {responseType: 'text'});
  }

  giveGift(giftToGive: {giftName: string, quantity: number, receiverUserName: string}) {
    return this.http.post(environment.baseUrl + 'gifts/give', giftToGive);
  }
}
