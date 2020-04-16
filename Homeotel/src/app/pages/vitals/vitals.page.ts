import { Component, OnInit } from "@angular/core";
import { ActionSheetController } from "@ionic/angular";
import { Router } from "@angular/router";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ApiService } from "src/app/services/api.service";

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
    private utilities: UtilitiesService
  ) {
    this.getVitals();
  }

  ngOnInit() {}

  getVitals() {
    this.apiService.getVitals().subscribe((data) => {
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
      this.utilities.vitalPageState["vitalId"] = 0;
      this.utilities.vitalPageState["temperature"] = "0.0";
      this.utilities.vitalPageState["pulserate"] = "0";
      this.utilities.vitalPageState["respiratoryrate"] = "0";
      this.utilities.vitalPageState["bp_systolic"] = "0";
      this.utilities.vitalPageState["bp_diastolic"] = "0";
    }
    this.router.navigate(["/vital-questions", 1]);
  }
}
