import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ModalController, LoadingController } from "@ionic/angular";
import { ModalPage } from "../modal/modal.page";
import { AlertController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import { DatabaseService } from "src/app/services/database.service";

@Component({
  selector: "app-appointment-details",
  templateUrl: "./appointment-details.page.html",
  styleUrls: ["./appointment-details.page.scss"],
})
export class AppointmentDetailsPage implements OnInit {
  doctorName;
  doctorUsername;
  complaintDescription;
  doctorSpecialisation;
  doctorPhoto;

  recurring;
  recurringFrequency;
  aggravatedBy;
  description;
  doctorId;

  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    public utilities: UtilitiesService,
    private apiService: ApiService,
    public modalCtrl: ModalController,
    private loadingController: LoadingController,
    private db: DatabaseService
  ) {
    this.doctorName = this.utilities.bookAppointmentDoctorDetails["name"];
    this.doctorUsername = this.utilities.bookAppointmentDoctorDetails[
      "username"
    ];
    this.doctorSpecialisation = this.utilities.bookAppointmentDoctorDetails[
      "specialisation"
    ];
    this.doctorPhoto = this.utilities.bookAppointmentDoctorDetails[
      "doctorPhoto"
    ];

    this.complaintDescription = this.utilities.selectedAppointmentComplaintDetails[
      "complaint_description"
    ];

    this.recurring =
      this.utilities.selectedAppointmentComplaintDetails["is_recurring"] == 1
        ? "Recurring"
        : "No recurring";

    let getFrequency = this.utilities.selectedAppointmentComplaintDetails[
      "recurring_freq"
    ];
    this.recurringFrequency =
      getFrequency == 0
        ? "None"
        : getFrequency == 1
        ? "Weekly"
        : getFrequency == 2
        ? "Monthly"
        : "Yearly";

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
    this.utilities.bookAppointmentDetails[
      "appointmentId"
    ] = this.utilities.selectedAppointmentComplaintDetails["appointment_id"];
    this.utilities.isSlotBookingAction = true;
    this.utilities.isHomeokitPurchaseAction = false;
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

  cancelSlot() {
    this.alertCtrl
      .create({
        header: "Are you sure?",
        message: "Do you want to cancel the slot?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
          },
          {
            text: "Cancel Slot",
            handler: async () => {
              // alert("Slot will be cancelled");

              let appointmentId = this.utilities
                .selectedAppointmentComplaintDetails["appointment_id"];

              const loading = await this.loadingController
                .create({
                  message: "Cancelling...",
                  translucent: true,
                })
                .then((a) => {
                  a.present().then(async (res) => {
                    this.apiService
                      .cancelAppointment(appointmentId)
                      .subscribe((data) => {
                        console.log("Returned from Backend");
                        console.log(JSON.stringify(data));
                        if (this.utilities.isInvalidApiResponseData(data)) {
                          a.dismiss();
                          this.utilities.presentToastWarning(
                            "Something went wrong."
                          );
                          console.log("Returned Error");
                          console.log(data[0]);
                          if (data[0]["error"]) {
                            console.log("Something went wrong");
                          }
                        } else {
                          console.log("Returned Success");
                          this.utilities.presentToastSuccess(
                            "Appointment cancelled successfully"
                          );

                          let res = data[0][0];
                          if (data[0][0]["query"]) {
                            let receivedQuery = res["query"];
                            console.log(receivedQuery);

                            this.db
                              .crudOperations(receivedQuery)
                              .then((res) => {
                                a.dismiss();
                                console.log(
                                  "Appointment cancelled successfully"
                                );
                                this.router.navigate(["/home"]);
                              })
                              .catch((error) => {
                                this.utilities.presentToastWarning(
                                  "Something went wrong."
                                );
                                a.dismiss();
                                console.error(
                                  "Error -> cancelSlot function returned error." +
                                    JSON.stringify(error)
                                );
                              });
                          } else {
                            a.dismiss();
                            this.utilities.presentToastWarning(
                              "Something went wrong."
                            );
                            console.log(
                              "Query property is not received from backend SP"
                            );
                          }
                        }
                      });
                  });
                });
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }
}
