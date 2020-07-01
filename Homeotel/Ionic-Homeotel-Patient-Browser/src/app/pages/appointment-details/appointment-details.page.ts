import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ModalController, LoadingController } from "@ionic/angular";
import { ModalPage } from "../modal/modal.page";
import { AlertController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import { DatabaseService } from "src/app/services/database.service";
import { CommonService } from "src/app/services/common.service";
import { Validators, FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-appointment-details",
  templateUrl: "./appointment-details.page.html",
  styleUrls: ["./appointment-details.page.scss"],
})
export class AppointmentDetailsPage implements OnInit {
  appointmentDetailsForm: FormGroup;
  doctorName;
  doctorUsername;
  complaintDescription;
  doctorSpecialisation;
  doctorPhoto;

  recurring;
  recurringFrequency;
  aggravatedBy;
  description;
  severity;
  duration;
  onset_id;
  characteristics;
  sensation;
  aggravation;
  amelioration;
  modality;
  associated_symptoms_id;
  doctorId;
  isThisUpcomingAppointment = false;
  commonServiceUpcomingAppointment;

  // Masters data
  yesOrNoMasterData: any[] = [
    {
      id: 1,
      name: "Yes",
    },
    {
      id: 2,
      name: "No",
    },
  ];

  severityMasterData: any[] = [
    {
      id: 1,
      name: "Mild",
    },
    {
      id: 2,
      name: "Moderate",
    },
    {
      id: 3,
      name: "Severe",
    },
  ];

  onsetMasterData: any[] = [
    {
      id: 1,
      name: "Sudden",
    },
    {
      id: 2,
      name: "Gradual",
    },
  ];

  associatedSymptomsMasterData: any[] = [
    {
      id: 1,
      name: "Symptom 1",
    },
    {
      id: 2,
      name: "Symptom 2",
    },
  ];

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
    this.appointmentDetailsForm = new FormGroup({
      is_recurring: new FormControl("", Validators.required),
      recurring_freq: new FormControl("", Validators.required),
      severity_id: new FormControl("", Validators.required),
      duration: new FormControl("", Validators.required),
      onset_id: new FormControl("", Validators.required),
      characteristics: new FormControl("", Validators.required),
      sensation: new FormControl("", Validators.required),
      aggravation: new FormControl("", Validators.required),
      amelioration: new FormControl("", Validators.required),
      modality: new FormControl("", Validators.required),
      associated_symptoms_id: new FormControl("", Validators.required),
      complaint_description: new FormControl("", Validators.required),
    });

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

  navigater(param) {
    if (this.utilities.isHybridApp) {
      this.router.navigate(["/appointment-questions/" + param]);
    } else {
      console.log("This is web");
    }
  }

  selectedColumn(columnName) {
    let columnValue = this.appointmentDetailsForm.get(columnName).value;
    console.log("columnValue --> " + columnValue);
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
                        console.log(data);
                        if (this.utilities.isInvalidApiResponseData(data)) {
                          a.dismiss();
                          this.utilities.presentToastWarning(
                            "Something went wrong."
                          );
                          console.log("Returned Error");
                          console.log(data[0][0]);
                          if (data[0][0]["error"]) {
                            console.log("Something went wrong");
                          }
                        } else {
                          console.log("Returned Success");
                          this.utilities.presentToastSuccess(
                            "Appointment cancelled successfully"
                          );

                          if (this.utilities.isHybridApp) {
                            // delete_appointment related
                            let res = data[0][0];
                            if (data[0][0] && data[0][0]["query1"]) {
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
                            if (data[0][0] && data[0][0]["query2"]) {
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
