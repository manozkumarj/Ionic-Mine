import { Component, OnInit } from "@angular/core";
import { UtilitiesService } from "src/app/services/utilities.service";
import { AlertController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";

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
    private router: Router
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
                this.utilities.presentToastSuccess("Updated successfully");
              }
              this.router.navigate(["/health-records"]);
            });
        });
      });
  }
}
