import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UtilitiesService } from "src/app/services/utilities.service";

@Component({
  selector: "app-consultation-details",
  templateUrl: "./consultation-details.page.html",
  styleUrls: ["./consultation-details.page.scss"]
})
export class ConsultationDetailsPage implements OnInit {
  selectedPerson;

  constructor(private router: Router, private utilities: UtilitiesService) {}

  ngOnInit() {}

  person(id) {
    console.log("Selected person ID -> " + id);
    this.selectedPerson = id;
  }

  goToPaymentgateways() {
    this.utilities.isSlotBookingAction = true;
    this.utilities.isHomeokitPurchaseAction = false;
    this.router.navigate(["/payment-gateways"]);
  }
}
