import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-multi-selection",
  templateUrl: "./multi-selection.page.html",
  styleUrls: ["./multi-selection.page.scss"],
})
export class MultiSelectionPage implements OnInit {
  title;
  arrayOfObjects;
  selectedObjects;
  clonedArrayOfObjects;

  constructor(
    private utilities: UtilitiesService,
    private alertCtrl: AlertController,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(
      "this.utilities.medicalHistoryPageState['selectedMedicalHistory'] is below"
    );
    console.log(
      this.utilities.medicalHistoryPageState["selectedMedicalHistory"]
    );

    let master = this.utilities.medicalHistoryPageState[
      "selectedMedicalHistory"
    ]["masterDataTag"];
    let currentMasters = this.utilities.medicalHistoryPageState[master];
    console.log("Current master data is below");
    console.log(currentMasters);

    let sortedCurrentMasters = currentMasters.sort((a, b) => {
      if (a["name"] > b["name"]) return 1;
      else return -1;
    });
    console.log("sortedCurrentMasters data is below");
    console.log(sortedCurrentMasters);

    this.title = this.utilities.medicalHistoryPageState[
      "selectedMedicalHistory"
    ]["name"];

    let data = this.utilities.medicalHistoryPageState["selectedMedicalHistory"][
      "data"
    ];

    console.log("data is below");
    console.log(data);

    if (data.length > 0) {
      this.selectedObjects = data.map((item) => {
        return item["self_id"];
      });
    }

    console.log("this.selectedObjects is below");
    console.log(this.selectedObjects);

    // let j = 0;
    // let generated = currentMasters.map((items) => {
    //   return { ...items, id: j++, isSelected: false };
    // });
    // console.log("generated is below");
    // console.log(generated);

    let i = 0;
    this.clonedArrayOfObjects = this.arrayOfObjects = sortedCurrentMasters.map(
      (items) => {
        return {
          ...items,
          id: i++,
          isSelected: this.selectedObjects.includes(items["self_id"])
            ? true
            : false,
        };
      }
    );
    console.log("this.clonedArrayOfObjects is below");
    console.log(this.clonedArrayOfObjects);

    this.selectedObjects = [];
  }

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

  save() {
    let filterSelected = this.arrayOfObjects.filter((obj) => obj["isSelected"]);
    this.selectedObjects = filterSelected.map((obj) => {
      if (obj["isSelected"]) {
        return obj["self_id"];
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

    this.selectedObjects = this.selectedObjects.map((item) => item.toString());
    console.log("this.selectedObjects mapped are below");
    console.log(this.selectedObjects);

    let selectedObjectsString = this.selectedObjects.join(",");
    console.log("selectedObjectsString are below");
    console.log(selectedObjectsString);

    let selectedMedicalHistory = this.utilities.medicalHistoryPageState[
      "selectedMedicalHistory"
    ]["tag"];
    console.log("selectedMedicalHistory -> " + selectedMedicalHistory);

    let userId = this.utilities.userId;
    let relativeId = this.utilities.selectedRelativeId;
    let allergiesArray = this.selectedObjects.map((element) => {
      return [
        userId,
        relativeId,
        element,
        userId,
        userId,
        "timestamp",
        "timestampp",
      ];
    });

    console.log("allergiesArray");
    console.log(allergiesArray);

    this.apiService
      .upsertAllergies(relativeId, selectedObjectsString, allergiesArray)
      .subscribe((data) => {
        console.log("Returned from Backend");
        console.log(JSON.stringify(data));
        if (this.utilities.isInvalidApiResponseData(data)) {
          console.log("Returned Error");
          console.log(data);
          if (data["error"]) {
            console.log("Something went wrong");
          }
        } else {
          console.log("Returned Success");
          // this.router.navigate(["/files"]);
        }
      });

    // this.router.navigate(["/medical-history"]);
  }
}