import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GiftService } from 'src/app/_shared/gift.service';
import { AlertService } from 'src/app/_shared/alert.service';
import { Gift } from 'src/app/_models/gift';

@Component({
  selector: 'app-request-gift-modal',
  templateUrl: './request-gift-modal.component.html',
  styleUrls: ['./request-gift-modal.component.css']
})
export class RequestGiftModalComponent implements OnInit {
  gift: Gift;
  requestGiftForm = new FormGroup({
    DateRequested: new FormControl('', Validators.required)
  });

  constructor(
    public activeModal: NgbActiveModal,
    private giftService: GiftService,
    private alertService: AlertService
    ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.requestGiftForm.addControl('GiftId', new FormControl(this.gift.id));
    this.giftService.requestGift(this.requestGiftForm.value).subscribe(
      data => {
        this.activeModal.close();
        this.alertService.success(data);
      },
      error => {
        this.alertService.error('Error occurred when claiming gift');
      }
    );
  }

}
