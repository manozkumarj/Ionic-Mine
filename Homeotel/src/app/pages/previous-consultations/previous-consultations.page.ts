import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { CommonService } from "src/app/services/common.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { DatabaseService } from "src/app/services/database.service";

@Component({
  selector: "app-previous-consultations",
  templateUrl: "./previous-consultations.page.html",
  styleUrls: ["./previous-consultations.page.scss"],
})
export class PreviousConsultationsPage implements OnInit {
  allAppointments: any[] = [];
  previousAppointments: any[] = [];
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
    // this.getAppointments();
    this.loadAppointments();
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
              this.allAppointments = res[0];
              console.log("Appointments found");

              this.previousAppointments = this.allAppointments.filter(
                (appointment) => appointment["appointment_status"] == 1
              );

              console.log("this.previousAppointments showing below");
              console.log(this.previousAppointments);
            })
            .catch((error) => {
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

  async getAppointments() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.apiService.getAppointments().subscribe((data) => {
            a.dismiss();
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

  redirect(appointmentId) {
    console.log("redirect appointmentId -> " + appointmentId);
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
    this.utilities.selectedAppointmentComplaintDetails["appointment_at"] =
      selectedAppointment["appointment_at"];

    this.utilities.bookAppointmentDoctorDetails["doctorPhoto"] =
      selectedAppointment["photo"];

    console.log(this.utilities.selectedAppointmentComplaintDetails);

    this.router.navigate(["/completed-consultation-details"]);
  }
}
