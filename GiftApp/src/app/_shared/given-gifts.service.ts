import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GivenGiftsService {

  constructor(private http: HttpClient) { }

  getGivenGifts() {
    return this.http.get(environment.baseUrl + 'gifts/giftsgiven');
  }

  getRequestedGifts() {
    return this.http.get(environment.baseUrl + 'gifts/requests');
  }

  getGiftsGivenToUser (username: string) {
    return this.http.get(environment.baseUrl + 'gifts/giftsgivento/' + username);
  }

  addQuantityToGift (giftAdd: { giftId: number, quantityToAdd: number}) {
    return this.http.put(environment.baseUrl + 'gifts/addQuantity', giftAdd);
  }

  deleteGift (giftId: number) {
    return this.http.delete(environment.baseUrl + 'gifts/delete/' + giftId, {responseType: 'text'});
  }

  editGift (editGiftDTO: { giftId: number, newGiftName: string, newQuantity: string, newIsNew: boolean }) {
    return this.http.put(environment.baseUrl + 'gifts/edit', editGiftDTO);
  }
}
