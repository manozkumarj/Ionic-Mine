import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UtilitiesService } from "src/app/services/utilities.service";

@Component({
  selector: "app-completed-consultation-details",
  templateUrl: "./completed-consultation-details.page.html",
  styleUrls: ["./completed-consultation-details.page.scss"],
})
export class CompletedConsultationDetailsPage implements OnInit {
  doctorName;
  doctorUsername;
  appointmentAt;
  complaintDescription;
  doctorPhoto;

  recurring;
  recurringSince;
  aggravatedBy;
  description;
  doctorId;

  constructor(private router: Router, public utilities: UtilitiesService) {
    this.doctorName = this.utilities.selectedAppointmentComplaintDetails[
      "doctorName"
    ];
    this.doctorUsername = this.utilities.selectedAppointmentComplaintDetails[
      "doctorUserame"
    ];
    this.complaintDescription = this.utilities.selectedAppointmentComplaintDetails[
      "complaint_description"
    ];

    this.doctorPhoto = this.utilities.bookAppointmentDoctorDetails[
      "doctorPhoto"
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
    this.doctorId = this.utilities.selectedAppointmentComplaintDetails[
      "doctor_id"
    ];
    this.appointmentAt = this.utilities.selectedAppointmentComplaintDetails[
      "appointment_at"
    ];
  }

  ngOnInit() {}
}
