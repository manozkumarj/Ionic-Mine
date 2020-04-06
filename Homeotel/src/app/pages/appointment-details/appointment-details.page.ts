import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ModalController } from "@ionic/angular";
import { ModalPage } from "../modal/modal.page";

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
  doctorId;

  constructor(
    private router: Router,
    private utilities: UtilitiesService,
    public modalCtrl: ModalController
  ) {
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
    this.doctorId = this.utilities.selectedAppointmentComplaintDetails[
      "doctor_id"
    ];
  }

  ngOnInit() {}

  async presentDoctorContactModal(doctorId) {
    console.log("doctorId -> " + doctorId);
    this.utilities.bookAppointmentDoctorDetails["id"] = doctorId;
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      showBackdrop: true,
      cssClass: "findDoctorModal",
      componentProps: {
        action: "contactDoctor",
        doctorId: doctorId,
      },
    });
    return await modal.present();
  }
}
