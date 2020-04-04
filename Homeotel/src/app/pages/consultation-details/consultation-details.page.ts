import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UtilitiesService } from "src/app/services/utilities.service";

@Component({
  selector: "app-consultation-details",
  templateUrl: "./consultation-details.page.html",
  styleUrls: ["./consultation-details.page.scss"]
})
export class ConsultationDetailsPage implements OnInit {
  selectedPerson = 0;
  doctorId;
  doctorName;
  doctorUsername;
  modeId;
  slotName;
  slotBookedTimestamp;

  constructor(private router: Router, private utilities: UtilitiesService) {
    this.doctorId = this.utilities.bookAppointmentDoctorDetails["id"];
    this.doctorName = this.utilities.bookAppointmentDoctorDetails["name"];
    this.doctorUsername = this.utilities.bookAppointmentDoctorDetails[
      "username"
    ];
    this.modeId = this.utilities.bookAppointmentDetails["bookableModeId"];
    this.slotName =
      this.modeId == 1
        ? "Video consultation"
        : this.modeId == 2
        ? "Audio consultation"
        : this.modeId == 3
        ? "Chat consultation"
        : "Personal visit";
    this.slotBookedTimestamp =
      this.utilities.bookAppointmentDetails["timestamp"] +
      " : " +
      this.utilities.bookAppointmentDetails["timeNSession"];
  }

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
