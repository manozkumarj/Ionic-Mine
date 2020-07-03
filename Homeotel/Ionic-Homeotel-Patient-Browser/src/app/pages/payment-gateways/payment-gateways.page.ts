import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { CommonService } from "../../services/common.service";
import { ModalController } from "@ionic/angular";
import { ModalPage } from "../modal/modal.page";
import { UtilitiesService } from "src/app/services/utilities.service";
import { Router } from "@angular/router";
import { BroadcastChannel } from 'broadcast-channel';

@Component({
  selector: "app-payment-gateways",
  templateUrl: "./payment-gateways.page.html",
  styleUrls: ["./payment-gateways.page.scss"],
})
export class PaymentGatewaysPage implements OnInit {
  @ViewChild('paymentForm', null) paymentForm: ElementRef;

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

    const channel = new BroadcastChannel('payment_message');
    channel.onmessage = msg => this.handlePaymentResponse(msg);

    this.setPaymentFormData();
  }

  setPaymentFormData() {
    //send transaction details to server, get hash and transaction id, set form details 
    //console.log(this.paymentForm.nativeElement.querySelectorAll('input'))    

    let hashInput = this.paymentForm.nativeElement.querySelector('input[name="hash"]');
    hashInput.value = "ba12a5846b29255b3d9133a24c7cfcf9221a7af798a74494e648bd58a39f94705dedf638dc053a3a89800c5e5ff9cb7a12c07c77d0926a7659060032b47f056e";

    let hashStringInput = this.paymentForm.nativeElement.querySelector('input[name="hash_string"]');
    hashStringInput.value = hashInput.value;

    let txnidInput = this.paymentForm.nativeElement.querySelector('input[name="txnid"]');
    txnidInput.value = "Abcd2";

    let amountInput = this.paymentForm.nativeElement.querySelector('input[name="amount"]');
    amountInput.value = "100.00";

    let firstNameInput = this.paymentForm.nativeElement.querySelector('input[name="firstname"]');
    firstNameInput.value = "Name";

    let emailInput = this.paymentForm.nativeElement.querySelector('input[name="email"]');
    emailInput.value = "zoltprojects@gmail.com";

    let phoneInput = this.paymentForm.nativeElement.querySelector('input[name="phone"]');
    phoneInput.value = "9293925613";

    let productinfoInput = this.paymentForm.nativeElement.querySelector('input[name="productinfo"]');
    productinfoInput.value = "Homeo1234";

    let serverUrl = "https://2jcmdv97a5.execute-api.ap-south-1.amazonaws.com/beta-cognito";
    
    let surlInput = this.paymentForm.nativeElement.querySelector('input[name="surl"]');
    surlInput.value = serverUrl + '/payment/success'

    let furlInput = this.paymentForm.nativeElement.querySelector('input[name="furl"]');
    furlInput.value = serverUrl + '/payment/fail';
  }

  async handlePaymentResponse(msg) {
    if (msg != 'success') {
      alert("payment failed. Please check and try again");
    }
    else {
      this.presentModal();
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
