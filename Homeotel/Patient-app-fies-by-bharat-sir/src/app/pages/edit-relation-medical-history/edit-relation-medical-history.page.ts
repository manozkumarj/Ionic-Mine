import { Component, OnInit } from "@angular/core";
import { UtilitiesService } from "src/app/services/utilities.service";
import { AlertController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { DatabaseService } from "src/app/services/database.service";

@Component({
  selector: "app-edit-relation-medical-history",
  templateUrl: "./edit-relation-medical-history.page.html",
  styleUrls: ["./edit-relation-medical-history.page.scss"],
})
export class EditRelationMedicalHistoryPage implements OnInit {
  arrayOfObjects: any[] = [];
  selectedObjects: any[] = [];
  clonedArrayOfObjects: any[] = [];
  currentRelationId;

  constructor(
    private utilities: UtilitiesService,
    private alertCtrl: AlertController,
    private apiService: ApiService,
    private loadingController: LoadingController,
    private router: Router,
    private db: DatabaseService
  ) {
    console.clear();
    console.log("this.utilities.relationsMedicalHistoryPageState is below");
    console.log(this.utilities.relationsMedicalHistoryPageState);

    let currentMasters = this.utilities.relationsMedicalHistoryPageState[
      "diseasesMaster"
    ];
    console.log("Current master data is below");
    console.log(currentMasters);

    let data = this.utilities.relationsMedicalHistoryPageState[
      "selectedMedicalHistory"
    ];

    this.selectedObjects = this.utilities.relationsMedicalHistoryPageState[
      "selectedMedicalHistory"
    ]["selectedDiseaseIds"];

    this.currentRelationId = this.utilities.relationsMedicalHistoryPageState[
      "selectedMedicalHistory"
    ]["relation_id"];

    console.log("this.selectedObjects is below");
    console.log(this.selectedObjects);

    let i = 0;
    this.clonedArrayOfObjects = this.arrayOfObjects = currentMasters.map(
      (items) => {
        return {
          ...items,
          id: i++,
          isSelected: this.selectedObjects.includes(items["disease_id"])
            ? true
            : false,
        };
      }
    );
    console.log("this.clonedArrayOfObjects is below");
    console.log(this.clonedArrayOfObjects);

    this.selectedObjects = [];
  }

  ngOnInit() {}

  onChange(word) {
    console.log("Searched word -> " + word);
    this.clonedArrayOfObjects = this.arrayOfObjects.filter((q) => {
      const regex = new RegExp(`${word}`, "gi");
      return !q.isSelected && q.name.match(regex);
    });
    console.log(JSON.stringify(this.arrayOfObjects));
  }

  chooser(id) {
    console.log("Item will be chosen " + id);
    this.arrayOfObjects[id]["isSelected"] = true;
  }

  remover(id) {
    console.log("Item will be removed " + id);
    this.arrayOfObjects[id]["isSelected"] = false;
  }

  async save() {
    let filterSelected = this.arrayOfObjects.filter((obj) => obj["isSelected"]);
    this.selectedObjects = filterSelected.map((obj) => {
      if (obj["isSelected"]) {
        return obj["disease_id"];
      } else {
        return false;
      }
    });
    if (this.selectedObjects.length == 0) {
      alert("Please select at least one item");
      return false;
    }
    console.log("this.selectedObjects are below");
    console.log(this.selectedObjects);

    let userId = this.utilities.userId;
    let relativeId = this.utilities.selectedRelativeId;
    let relationId = this.currentRelationId;

    let commaSeparated = "";

    this.selectedObjects.forEach((diseaseId) => {
      commaSeparated += "(";
      commaSeparated += "id,";
      commaSeparated += userId + ",";
      commaSeparated += relativeId + ",";
      commaSeparated += relationId + ",";
      commaSeparated += diseaseId + ",";
      commaSeparated += userId + ",";
      commaSeparated += userId + ",";
      commaSeparated += "'timestamp',";
      commaSeparated += "'timestamp'";
      commaSeparated += ")";
      commaSeparated += ", ";
    });

    commaSeparated = commaSeparated.replace(/,\s*$/, "");

    console.log("commaSeparated -> ");
    console.log(commaSeparated);

    const loading = await this.loadingController
      .create({
        message: "Saving...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.apiService
            .upsertRelationMedicalHistory(
              userId,
              relativeId,
              relationId,
              commaSeparated
            )
            .subscribe((data) => {
              a.dismiss();
              console.log("Returned from Backend");
              console.log(JSON.stringify(data));
              if (this.utilities.isInvalidApiResponseData(data)) {
                console.log("Returned Error");
                console.log(data);
                if (data["error"]) {
                  console.log("Something went wrong");
                  this.utilities.presentToastWarning("Something went wrong");
                }
              } else {
                console.log("Returned Success");

                if (this.utilities.isHybridApp) {
                  let res = data[0];
                  if (data[0]["query1"]) {
                    let receivedQuery = res["query1"];
                    console.log(receivedQuery);

                    this.db
                      .crudOperations(receivedQuery)
                      .then((res) => {
                        if (data[0]["query2"]) {
                          let receivedQuery = data[0]["query2"];
                          console.log(receivedQuery);

                          this.db
                            .crudOperations(receivedQuery)
                            .then((res) => {
                              a.dismiss();
                              console.log("family history saved successfully");
                              this.utilities.presentToastSuccess(
                                "Updated successfully"
                              );
                              this.router.navigate([
                                "/medical-history-relations",
                              ]);
                            })
                            .catch((error) => {
                              this.utilities.presentToastWarning(
                                "Something went wrong."
                              );
                              a.dismiss();
                              this.utilities.sqliteErrorDisplayer(
                                "multi-selection * saveMedicalHistory",
                                error
                              );
                              console.error(
                                "Error -> saveMedicalHistory function returned error." +
                                  JSON.stringify(error)
                              );
                            });
                        } else {
                          a.dismiss();
                          this.utilities.sqliteErrorDisplayer(
                            "multi-selection * saveMedicalHistory",
                            "Query2 property is not received from backend SP"
                          );
                          this.utilities.presentToastWarning(
                            "Something went wrong."
                          );
                          console.log(
                            "Query2 property is not received from backend SP"
                          );
                        }
                      })
                      .catch((error) => {
                        this.utilities.presentToastWarning(
                          "Something went wrong."
                        );
                        a.dismiss();
                        this.utilities.sqliteErrorDisplayer(
                          "edit-relation-medical-history * save",
                          "Query1 property is not received from backend SP"
                        );
                        console.error(
                          "Error -> saveRelationMedicalHistory function returned error." +
                            JSON.stringify(error)
                        );
                      });
                  } else {
                    a.dismiss();
                    this.utilities.sqliteErrorDisplayer(
                      "edit-relation-medical-history * save",
                      "Query property is not received from backend SP"
                    );
                    this.utilities.presentToastWarning("Something went wrong.");
                    console.log(
                      "Query property is not received from backend SP"
                    );
                  }
                } else {
                  a.dismiss();
                  console.log("family history saved successfully");
                  this.utilities.presentToastSuccess("Updated successfully");
                  this.router.navigate(["/medical-history-relations"]);
                }
              }
            });
        });
      });
  }
}
