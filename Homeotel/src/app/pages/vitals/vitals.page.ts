import { Component, OnInit } from "@angular/core";
import { ActionSheetController } from "@ionic/angular";
import { Router } from "@angular/router";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ApiService } from "src/app/services/api.service";
import { LoadingController } from "@ionic/angular";
import { DatabaseService } from "src/app/services/database.service";

@Component({
  selector: "app-vitals",
  templateUrl: "./vitals.page.html",
  styleUrls: ["./vitals.page.scss"],
})
export class VitalsPage implements OnInit {
  vitals: any[] = [];
  constructor(
    public actShtCtr: ActionSheetController,
    private router: Router,
    private apiService: ApiService,
    private db: DatabaseService,
    private loadingController: LoadingController,
    private utilities: UtilitiesService
  ) {
    // this.getVitals();
    this.getLocalVitals();
  }

  ngOnInit() {}

  async getLocalVitals() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getVitalDetails(
              this.utilities.userId,
              this.utilities.selectedRelativeId
            )
            .then((res: any[]) => {
              console.log("Received vital details are below -> ");
              console.log(res);
              a.dismiss();
              this.vitals = res[0];
            })
            .catch((error) => {
              a.dismiss();
              this.utilities.presentToastWarning("Something went wrong");
              console.error(
                "Error -> getLocalVitals() function returned error." +
                  JSON.stringify(error)
              );
            });
        });
      });
  }

  async getVitals() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.apiService.getVitals().subscribe((data) => {
            a.dismiss();
            console.log("Returned from Backend");
            console.log(data);
            if (this.utilities.isInvalidApiResponseData(data)) {
              console.log("Returned Error");
            } else {
              if (
                typeof data != "undefined" &&
                typeof data[0] != "undefined" &&
                typeof data[0][0] != "undefined"
              ) {
                console.log("Data returned from backend");
                this.vitals = data[0];
              } else {
                console.log("Something went wrong in backend");
              }
            }
          });
        });
      });
  }

  openMenu(id) {
    console.log("Selected ID -> " + id);
    let actionSheet = this.actShtCtr
      .create({
        cssClass: "action-sheets-basic-page",
        buttons: [
          {
            text: "Edit",
            handler: () => {
              console.log("Edit clicked");
              this.redirect("edit", id);
            },
          },
          {
            text: "Delete",
            handler: async () => {
              console.log("Delte clicked");

              const loading = await this.loadingController
                .create({
                  message: "Deleting...",
                  translucent: true,
                })
                .then((a) => {
                  a.present().then(async (res) => {
                    this.apiService.deleteVital(id).subscribe((data) => {
                      console.log("Returned from Backend");
                      console.log(data);
                      if (this.utilities.isInvalidApiResponseData(data)) {
                        console.log("Returned Error");
                      } else {
                        if (typeof data != "undefined") {
                          console.log("Returned from backend");
                          this.vitals = this.vitals.filter(
                            (vital) => vital.vital_id !== id
                          );
                          this.utilities.presentToastSuccess(
                            "Success, Vital is deleted."
                          );

                          let res = data[0][0];
                          if (data[0][0]["query"]) {
                            let receivedQuery = res["query"];
                            console.log(receivedQuery);

                            this.db
                              .crudOperations(receivedQuery)
                              .then((res) => {
                                a.dismiss();
                                console.log("vitals is deleted successfully");
                              })
                              .catch((error) => {
                                this.utilities.presentToastWarning(
                                  "Something went wrong."
                                );
                                a.dismiss();
                                console.error(
                                  "Error -> vital save function returned error." +
                                    JSON.stringify(error)
                                );
                              });
                          } else {
                            a.dismiss();
                            console.log(
                              "Query property is not received from backend SP"
                            );
                          }
                        } else {
                          a.dismiss();
                          console.log("Something went wrong in backend");
                          this.utilities.presentToastSuccess(
                            "Something went wrong."
                          );
                        }
                      }
                    });
                  });
                });
            },
          },
          {
            text: "Close",
            role: "cancel",
            handler: () => {
              console.log("Cancel clicked");
            },
          },
        ],
      })
      .then((ac) => ac.present());
  }

  redirect(type, id = 0) {
    console.log("type -> " + type);
    this.utilities.vitalPageState["type"] = type;
    if (type == "edit") {
      let vitalIndex = this.vitals.findIndex(
        (vital) => vital["vital_id"] == id
      );
      console.log("vitalIndex -> " + vitalIndex);
      console.log(this.vitals[vitalIndex]);
      this.utilities.vitalPageState["vitalId"] = this.vitals[vitalIndex][
        "vital_id"
      ];
      this.utilities.vitalPageState["temperature"] = this.vitals[vitalIndex][
        "temperature"
      ];
      this.utilities.vitalPageState["pulserate"] = this.vitals[vitalIndex][
        "pulse"
      ];
      this.utilities.vitalPageState["pulserate"] = 53;
      this.utilities.vitalPageState["respiratoryrate"] = this.vitals[
        vitalIndex
      ]["resp_rate"];
      this.utilities.vitalPageState["bp_systolic"] = this.vitals[vitalIndex][
        "bp_systolic"
      ];
      this.utilities.vitalPageState["bp_diastolic"] = this.vitals[vitalIndex][
        "bp_diastolic"
      ];
    } else {
      this.utilities.vitalPageState["vitalId"] = null;
      this.utilities.vitalPageState["temperature"] = null;
      this.utilities.vitalPageState["pulserate"] = null;
      this.utilities.vitalPageState["respiratoryrate"] = null;
      this.utilities.vitalPageState["bp_systolic"] = null;
      this.utilities.vitalPageState["bp_diastolic"] = null;
    }
    this.router.navigate(["/vital-questions", 1]);
  }
}
