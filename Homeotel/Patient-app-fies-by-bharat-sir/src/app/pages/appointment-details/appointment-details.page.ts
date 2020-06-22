import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ModalController, LoadingController } from "@ionic/angular";
import { ModalPage } from "../modal/modal.page";
import { AlertController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import { DatabaseService } from "src/app/services/database.service";
import { CommonService } from "src/app/services/common.service";

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
  isThisUpcomingAppointment = false;
  commonServiceUpcomingAppointment;

  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    public utilities: UtilitiesService,
    private apiService: ApiService,
    public modalCtrl: ModalController,
    private commonService: CommonService,
    private loadingController: LoadingController,
    private db: DatabaseService
  ) {
    this.commonServiceUpcomingAppointment = this.commonService.upcomingAppointment;
    if (this.commonServiceUpcomingAppointment) {
      let getId = this.commonServiceUpcomingAppointment["appointment_id"];
      if (
        getId ==
        this.utilities.selectedAppointmentComplaintDetails["appointment_id"]
      ) {
        this.isThisUpcomingAppointment = true;
      }
    }

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

    if (
      this.utilities.selectedAppointmentComplaintDetails[
        "complaint_description"
      ]
    ) {
      this.complaintDescription = this.utilities.selectedAppointmentComplaintDetails[
        "complaint_description"
      ];
    } else {
      this.complaintDescription = "-N/A-";
    }

    if (this.utilities.selectedAppointmentComplaintDetails["is_recurring"]) {
      this.recurring =
        this.utilities.selectedAppointmentComplaintDetails["is_recurring"] == 1
          ? "Recurring"
          : "No recurring";
    } else {
      this.recurring = "-N/A-";
    }

    if (this.utilities.selectedAppointmentComplaintDetails["recurring_freq"]) {
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
    } else {
      this.recurringFrequency = "-N/A-";
    }

    if (this.utilities.selectedAppointmentComplaintDetails["severity_id"]) {
      this.aggravatedBy =
        this.utilities.selectedAppointmentComplaintDetails["severity_id"] == 1
          ? "Food"
          : this.utilities.selectedAppointmentComplaintDetails["severity_id"] ==
            2
          ? "Heat"
          : "Movement";
    } else {
      this.aggravatedBy = "-N/A-";
    }

    if (
      this.utilities.selectedAppointmentComplaintDetails[
        "complaint_description"
      ]
    ) {
      this.description = this.utilities.selectedAppointmentComplaintDetails[
        "complaint_description"
      ];
    } else {
      this.description = "-N/A-";
    }

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

                          if (this.utilities.isHybridApp) {
                            // delete_appointment related
                            let res = data[0];
                            if (data[0] && data[0]["query1"]) {
                              let receivedQuery = res["query1"];
                              console.log(receivedQuery);

                              this.db
                                .crudOperations(receivedQuery)
                                .then((res) => {
                                  a.dismiss();
                                  console.log(
                                    "delete_appointment query executed successfully"
                                  );
                                  this.router.navigate(["/home"]);
                                })
                                .catch((error) => {
                                  this.utilities.sqliteErrorDisplayer(
                                    "appointment-details * cancelSlot",
                                    error
                                  );
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
                              this.utilities.sqliteErrorDisplayer(
                                "appointment-details * cancelSlot",
                                "Query1 property is not received from backend SP"
                              );
                              this.utilities.presentToastWarning(
                                "Something went wrong."
                              );
                              console.log(
                                "Query1 property is not received from backend SP"
                              );
                            }

                            // update_transaction
                            if (data[0] && data[0]["query2"]) {
                              let receivedQuery = res["query2"];
                              console.log(receivedQuery);

                              this.db
                                .crudOperations(receivedQuery)
                                .then((res) => {
                                  a.dismiss();
                                  console.log(
                                    "update_transaction query executed successfully"
                                  );
                                  this.router.navigate(["/home"]);
                                })
                                .catch((error) => {
                                  this.utilities.sqliteErrorDisplayer(
                                    "appointment-details * cancelSlot",
                                    error
                                  );
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
                              this.utilities.sqliteErrorDisplayer(
                                "appointment-details * cancelSlot",
                                "Query2 property is not received from backend SP"
                              );
                              this.utilities.presentToastWarning(
                                "Something went wrong."
                              );
                              console.log(
                                "Query2 property is not received from backend SP"
                              );
                            }
                          } else {
                            a.dismiss();
                            console.log(
                              "update_transaction query executed successfully"
                            );
                            this.router.navigate(["/home"]);
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
