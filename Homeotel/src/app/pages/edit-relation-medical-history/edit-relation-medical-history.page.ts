import { Component, OnInit } from "@angular/core";
import { UtilitiesService } from "src/app/services/utilities.service";
import { AlertController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-edit-relation-medical-history",
  templateUrl: "./edit-relation-medical-history.page.html",
  styleUrls: ["./edit-relation-medical-history.page.scss"],
})
export class EditRelationMedicalHistoryPage implements OnInit {
  arrayOfObjects: any[] = [];
  selectedObjects: any[] = [];
  clonedArrayOfObjects: any[] = [];

  constructor(
    private utilities: UtilitiesService,
    private alertCtrl: AlertController,
    private apiService: ApiService,
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

  save() {
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
  }
}
