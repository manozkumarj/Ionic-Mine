import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UtilitiesService } from "src/app/services/utilities.service";

@Component({
  selector: "app-appointment-details",
  templateUrl: "./appointment-details.page.html",
  styleUrls: ["./appointment-details.page.scss"],
})
export class AppointmentDetailsPage implements OnInit {
  doctorName;
  doctorUsername;
  complaintDescription;

  recurring;
  recurringSince;
  aggravatedBy;
  description;

  constructor(private router: Router, private utilities: UtilitiesService) {
    this.doctorName = this.utilities.selectedAppointmentComplaintDetails[
      "doctorName"
    ];
    this.doctorUsername = this.utilities.selectedAppointmentComplaintDetails[
      "doctorUserame"
    ];
    this.complaintDescription = this.utilities.selectedAppointmentComplaintDetails[
      "complaint_description"
    ];

    this.recurring =
      this.utilities.selectedAppointmentComplaintDetails["is_recurring"] == 1
        ? "Recurring"
        : "No recurring";
    this.recurringSince = this.utilities.selectedAppointmentComplaintDetails[
      "recurring_freq"
    ];
    this.aggravatedBy =
      this.utilities.selectedAppointmentComplaintDetails["severity_id"] == 1
        ? "Food"
        : this.utilities.selectedAppointmentComplaintDetails["severity_id"] == 2
        ? "Heat"
        : "Movement";

    this.description = this.utilities.selectedAppointmentComplaintDetails[
      "complaint_description"
    ];
  }

  ngOnInit() {}
}
