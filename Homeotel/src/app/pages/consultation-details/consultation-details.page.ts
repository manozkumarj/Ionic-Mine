import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UtilitiesService } from "src/app/services/utilities.service";

@Component({
  selector: "app-consultation-details",
  templateUrl: "./consultation-details.page.html",
  styleUrls: ["./consultation-details.page.scss"],
})
export class ConsultationDetailsPage implements OnInit {
  selectedPerson = 0;
  doctorId;
  doctorName;
  doctorUsername;
  modeId;
  slotName;
  slotBookedTimestamp;

  description;

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
    this.utilities.bookAppointmentDetails["relativeId"] = this.selectedPerson;
    this.utilities.bookAppointmentDetails["description"] = this.description;
    this.utilities.isSlotBookingAction = true;
    this.utilities.isHomeokitPurchaseAction = false;

    // console.log("bookAppointmentDetails obj is below");
    // console.log(this.utilities.bookAppointmentDetails);

    // console.log("bookAppointmentDoctorDetails obj is below");
    // console.log(this.utilities.bookAppointmentDoctorDetails);

    console.log("Current User ID -> " + this.utilities.userId);

    this.router.navigate(["/payment-gateways"]);
  }
}
