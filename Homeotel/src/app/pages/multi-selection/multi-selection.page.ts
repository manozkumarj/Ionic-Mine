import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { UtilitiesService } from "src/app/services/utilities.service";

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
    console.log("Current master data is below");
    console.log(this.utilities.medicalHistoryPageState[master]);

    this.title = this.utilities.medicalHistoryPageState[
      "selectedMedicalHistory"
    ]["name"];

    this.clonedArrayOfObjects = this.arrayOfObjects = [
      {
        id: 0,
        name: "John",
        isSelected: false,
      },
      {
        id: 1,
        name: "Honey",
        isSelected: false,
      },
      {
        id: 2,
        name: "Donald Trump",
        isSelected: false,
      },
      {
        id: 3,
        name: "Nair",
        isSelected: false,
      },
      {
        id: 4,
        name: "Evan",
        isSelected: false,
      },
      {
        id: 5,
        name: "Valen",
        isSelected: false,
      },
      {
        id: 6,
        name: "Iffy",
        isSelected: false,
      },
    ];

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
    this.selectedObjects.push(id);
  }

  remover(id) {
    console.log("Item will be removed " + id);
    this.arrayOfObjects[id]["isSelected"] = false;
    this.selectedObjects = this.selectedObjects.filter(
      (option) => option != id
    );
  }

  save() {
    if (this.selectedObjects.length == 0) {
      alert("Please select at least one item");
      return false;
    }
    console.log("this.selectedObjects are below");
    console.log(this.selectedObjects);
    this.router.navigate(["/medical-history"]);
  }
}
