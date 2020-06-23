import { Component, OnInit } from "@angular/core";
import { CommonService } from "../../services/common.service";
import { ModalController } from "@ionic/angular";
import { ModalPage } from "../modal/modal.page";
import { UtilitiesService } from "src/app/services/utilities.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-payment-gateways",
  templateUrl: "./payment-gateways.page.html",
  styleUrls: ["./payment-gateways.page.scss"],
})
export class PaymentGatewaysPage implements OnInit {
  paymentGateways;
  amount;

  constructor(
    private commonService: CommonService,
    public modalCtrl: ModalController,
    private utilities: UtilitiesService,
    private router: Router
  ) {
    this.paymentGateways = [
      {
        id: 1,
        name: "Debit/Credit card",
      },
      {
        id: 2,
        name: "Net banking",
      },
      {
        id: 3,
        name: "UPI",
      },
      {
        id: 4,
        name: "Google Pay",
      },
      {
        id: 5,
        name: "Paytm Wallet",
      },
    ];
  }

  ngOnInit() {
    if (this.utilities.isHomeokitPurchaseAction) {
      this.amount = this.commonService.selectedHomeKitCost;
    } else if (this.utilities.isSlotBookingAction) {
      this.amount = this.utilities.bookAppointmentDetails["price"];
      console.log("this.utilities.selectedAppointmentComplaintDetails below");
      console.log(this.utilities.selectedAppointmentComplaintDetails);
      console.log("bookAppointmentDetails below");
      console.log(this.utilities.bookAppointmentDetails);
    }
  }

  async presentModal() {
    let paymentFor;
    if (this.utilities.isHomeokitPurchaseAction) {
      paymentFor = "homeokit";
    } else if (this.utilities.isSlotBookingAction) {
      paymentFor = "slotBooking";
    }
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      showBackdrop: true,
      cssClass: "findDoctorModal",
      componentProps: {
        action: "makePayment",
        paymentFor,
      },
    });
    return await modal.present();
    this.router.navigate(["/home"]);
  }

  makePayment = (id) => {
    console.log("Selected payment gateway ID -> " + id);
    this.presentModal();
  };
}
