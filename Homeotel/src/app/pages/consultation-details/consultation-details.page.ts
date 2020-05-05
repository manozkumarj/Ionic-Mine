import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-consultation-details",
  templateUrl: "./consultation-details.page.html",
  styleUrls: ["./consultation-details.page.scss"],
})
export class ConsultationDetailsPage implements OnInit {
  selectedPerson = 1;
  doctorId;
  doctorName;
  doctorUsername;
  modeId;
  slotName;
  slotBookedTimestamp;

  description;

  userRelatives: any[] = [];

  constructor(
    private router: Router,
    private utilities: UtilitiesService,
    private apiService: ApiService
  ) {
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
    this.getUserRelatives();
  }

  ngOnInit() {}

  getUserRelatives() {
    this.apiService.getUserRelatives().subscribe((data) => {
      console.log("Returned from Backend");
      console.log(data);
      if (this.utilities.isInvalidApiResponseData(data)) {
        console.log("Returned Error");
      } else {
        if (typeof data != "undefined" && typeof data[0] != "undefined") {
          this.userRelatives = data[0];
        }
      }
    });
  }

  person(id) {
    console.log("Selected person ID -> " + id);
    if (id == 0) {
      this.router.navigate(["/add-relative/slot-selection"]);
    } else {
      this.selectedPerson = id;
    }
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
