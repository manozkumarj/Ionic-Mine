import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { CommonService } from "src/app/services/common.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { DatabaseService } from "src/app/services/database.service";

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

  nextUpcomingAppointmentId = 0;
  commonServiceUpcomingAppointment;

  constructor(
    private apiService: ApiService,
    private commonService: CommonService,
    private db: DatabaseService,
    public utilities: UtilitiesService,
    private loadingController: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.commonServiceUpcomingAppointment = this.commonService.upcomingAppointment;
    if (this.commonServiceUpcomingAppointment) {
      this.nextUpcomingAppointmentId = this.commonServiceUpcomingAppointment[
        "appointment_id"
      ];
    }
    if (this.utilities.isHybridApp) {
      this.loadAppointments();
    } else {
      this.getAppointments();
    }
  }

  togglingTabs(tab) {
    this.selectedTab = tab;
  }

  async getAppointments() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.apiService.getAppointments().subscribe((data) => {
            console.log("Returned from Backend");
            console.log(data);
            console.log(data[0]);
            if (this.utilities.isInvalidApiResponseData(data)) {
              console.log("Returned Error");
            } else {
              a.dismiss();
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

                this.upcomingAppointments = this.upcomingAppointments.map(
                  (appointment) => {
                    let isItUpcomingAppointment = false;
                    if (
                      appointment["appointment_id"] ==
                      this.nextUpcomingAppointmentId
                    ) {
                      isItUpcomingAppointment = true;
                    }
                    return { ...appointment, isItUpcomingAppointment };
                  }
                );

                console.log("this.upcomingAppointments showing below");
                console.log(this.upcomingAppointments);

                console.log(
                  "***************************************************"
                );

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
        });
      });
  }

  async loadAppointments() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getUserAppointments(this.utilities.userId)
            .then((res: any[]) => {
              this.allAppointments = res;
              console.log("Appointments found");
              this.upcomingAppointments = this.allAppointments.filter(
                (appointment) => appointment["appointment_status"] == 0
              );

              this.upcomingAppointments = this.upcomingAppointments.map(
                (appointment) => {
                  let isItUpcomingAppointment = false;
                  if (
                    appointment["appointment_id"] ==
                    this.nextUpcomingAppointmentId
                  ) {
                    isItUpcomingAppointment = true;
                  }
                  return { ...appointment, isItUpcomingAppointment };
                }
              );

              console.log("this.upcomingAppointments showing below");
              console.log(this.upcomingAppointments);

              console.log(
                "***************************************************"
              );

              this.previousAppointments = this.allAppointments.filter(
                (appointment) => appointment["appointment_status"] == 1
              );

              console.log("this.previousAppointments showing below");
              console.log(this.previousAppointments);
            })
            .catch((error) => {
              this.utilities.sqliteErrorDisplayer(
                "appointments * loadAppointments",
                error
              );
              this.utilities.presentToastWarning("Something went wrong");
              console.error(
                "Error -> loadAppointments() function returned error." +
                  JSON.stringify(error)
              );
            });
          a.dismiss();
        });
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

    this.utilities.bookAppointmentDoctorDetails["id"] =
      selectedAppointment["doctor_id"];
    this.utilities.bookAppointmentDoctorDetails["name"] =
      selectedAppointment["doctorName"];
    this.utilities.bookAppointmentDoctorDetails["username"] =
      selectedAppointment["doctorUserame"];
    this.utilities.bookAppointmentDoctorDetails["specialisation"] =
      selectedAppointment["specialisation"];
    this.utilities.bookAppointmentDoctorDetails["doctorPhoto"] =
      selectedAppointment["photo"];

    console.log(this.utilities.selectedAppointmentComplaintDetails);
    if (!isViewEHR && this.utilities.isHybridApp) {
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
