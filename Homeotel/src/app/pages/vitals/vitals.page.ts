import { Component, OnInit } from "@angular/core";
import { ActionSheetController } from "@ionic/angular";
import { Router } from "@angular/router";
import { UtilitiesService } from "src/app/services/utilities.service";

@Component({
  selector: "app-vitals",
  templateUrl: "./vitals.page.html",
  styleUrls: ["./vitals.page.scss"],
})
export class VitalsPage implements OnInit {
  vitals;
  constructor(
    public actShtCtr: ActionSheetController,
    private router: Router,
    private utilities: UtilitiesService
  ) {}

  ngOnInit() {
    this.vitals = [
      {
        id: 1,
        date: "23 March 2020",
        temparature: "97.6 F",
        pulseRate: "80 per min",
        respirationRate: "20 per min",
        bloodPressure: "120/80",
      },
      {
        id: 2,
        date: "15 March 2020",
        temparature: "97.6 F",
        pulseRate: "80 per min",
        respirationRate: "20 per min",
        bloodPressure: null,
      },
    ];
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
              this.redirect("edit");
            },
          },
          {
            text: "Delete",
            handler: () => {
              console.log("Delte clicked");
              this.vitals = this.vitals.filter((vital) => vital.id !== id);
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

  redirect(type) {
    console.log("type -> " + type);
    this.utilities.vitalPageState["type"] = type;
    if (type == "edit") {
      this.utilities.vitalPageState["vitalId"] = 1;
      this.utilities.vitalPageState["temperature"] = "98.6";
      this.utilities.vitalPageState["pulserate"] = "92";
      this.utilities.vitalPageState["respiratoryrate"] = "69";
      this.utilities.vitalPageState["bp_systolic"] = "94";
      this.utilities.vitalPageState["bp_diastolic"] = "18";
    } else {
      this.utilities.vitalPageState["vitalId"] = 0;
      this.utilities.vitalPageState["temperature"] = "2.4";
      this.utilities.vitalPageState["pulserate"] = "22";
      this.utilities.vitalPageState["respiratoryrate"] = "29";
      this.utilities.vitalPageState["bp_systolic"] = "24";
      this.utilities.vitalPageState["bp_diastolic"] = "28";
    }
    this.router.navigate(["/vital-questions", 1]);
  }
}
