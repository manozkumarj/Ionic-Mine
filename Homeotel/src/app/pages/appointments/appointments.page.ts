import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { CommonService } from "src/app/services/common.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-appointments",
  templateUrl: "./appointments.page.html",
  styleUrls: ["./appointments.page.scss"],
})
export class AppointmentsPage implements OnInit {
  selectedTab = 1;
  allAppointments: any[] = [];
  upcomingAppointments: any[] = [];
  previousAppointments: any[] = [];

  constructor(
    private apiService: ApiService,
    private commonService: CommonService,
    private utilities: UtilitiesService,
    private router: Router
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getAppointments();
  }

  togglingTabs(tab) {
    this.selectedTab = tab;
  }

  getAppointments() {
    this.apiService.getAppointments().subscribe((data) => {
      console.log("Returned from Backend");
      console.log(data);
      console.log(data[0]);
      if (this.utilities.isInvalidApiResponseData(data)) {
        console.log("Returned Error");
      } else {
        if (
          typeof data != "undefined" &&
          typeof data[0] != "undefined" &&
          typeof data[0][0] != "undefined"
        ) {
          this.allAppointments = data[0];
          console.log("Appointments found");
          this.upcomingAppointments = this.allAppointments.filter(
            (appointment) => appointment["appointment_status"] == 0
          );

          console.log("this.upcomingAppointments showing below");
          console.log(this.upcomingAppointments);

          console.log("***************************************************");

          this.previousAppointments = this.allAppointments.filter(
            (appointment) => appointment["appointment_status"] == 1
          );

          console.log("this.previousAppointments showing below");
          console.log(this.previousAppointments);
        } else {
          console.log("Backend returned error");
        }
      }
    });
  }

  addDetails(appointmentId, isViewEHR = false) {
    console.log("appointmentId -> " + appointmentId);
    console.log("isViewEHR -> " + isViewEHR);
    this.utilities.selectedAppointmentComplaintDetails = {};
    let selectedAppointment = this.allAppointments.filter(
      (item) => item["appointment_id"] == appointmentId
    );
    selectedAppointment = selectedAppointment[0];
    console.log(selectedAppointment);
    this.utilities.selectedAppointmentComplaintDetails["user_id"] =
      selectedAppointment["user_id"];
    this.utilities.selectedAppointmentComplaintDetails["relative_id"] =
      selectedAppointment["relative_id"];
    this.utilities.selectedAppointmentComplaintDetails["appointment_id"] =
      selectedAppointment["appointment_id"];

    this.utilities.selectedAppointmentComplaintDetails["appointment_at"] =
      selectedAppointment["appointment_at"];

    this.utilities.selectedAppointmentComplaintDetails["doctor_id"] =
      selectedAppointment["doctor_id"];
    this.utilities.selectedAppointmentComplaintDetails["doctorName"] =
      selectedAppointment["doctorName"];
    this.utilities.selectedAppointmentComplaintDetails["doctorUserame"] =
      selectedAppointment["doctorUserame"];

    this.utilities.selectedAppointmentComplaintDetails["is_recurring"] =
      selectedAppointment["is_recurring"];
    this.utilities.selectedAppointmentComplaintDetails["recurring_freq"] =
      selectedAppointment["recurring_freq"];
    this.utilities.selectedAppointmentComplaintDetails["severity_id"] =
      selectedAppointment["severity_id"];
    this.utilities.selectedAppointmentComplaintDetails[
      "complaint_description"
    ] = selectedAppointment["complaint_description"];

    console.log(this.utilities.selectedAppointmentComplaintDetails);
    if (!isViewEHR) {
      this.router.navigate(["/appointment-questions", 1]);
    } else {
      this.router.navigate(["/appointment-details"]);
    }
  }

  getAppointmentMode(modeId) {
    return modeId == 1
      ? "Video consultation"
      : modeId == 2
      ? "Audio consultation"
      : modeId == 3
      ? "Chat consultation"
      : "Personal visit";
  }
}
