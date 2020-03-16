import { Component, OnInit } from '@angular/core';
import { CommonService } from "../../services/common.service";
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-payment-gateways',
  templateUrl: './payment-gateways.page.html',
  styleUrls: ['./payment-gateways.page.scss'],
})
export class PaymentGatewaysPage implements OnInit {

  paymentGateways;
  amount;

  constructor(
    private commonService: CommonService,
    public modalCtrl: ModalController
  ) {
    this.paymentGateways = [
      {
        id: 1,
        name: 'Debit/Credit card'
      },
      {
        id: 2,
        name: 'Net banking'
      },
      {
        id: 3,
        name: 'UPI'
      },
      {
        id: 4,
        name: 'Google Pay'
      },
      {
        id: 5,
        name: 'Paytm Wallet'
      }
    ];
  }

  ngOnInit() {
    this.amount = this.commonService.selectedHomeKitCost;
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      showBackdrop: true,
      cssClass: "findDoctorModal",
      componentProps: {
        'action': 'makePayment'
      }
    });
    return await modal.present();
  }

  makePayment = id => {
    console.log("Selected payment gateway ID -> " + id);
    this.presentModal();
  }

}
