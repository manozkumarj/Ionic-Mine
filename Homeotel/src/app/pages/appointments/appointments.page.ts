import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { CommonService } from "src/app/services/common.service";
import { UtilitiesService } from "src/app/services/utilities.service";

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
    private utilities: UtilitiesService
  ) {
    this.getAppointments();
  }

  ngOnInit() {}

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
