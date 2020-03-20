import { Component, OnInit } from "@angular/core";
import { ActionSheetController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-vitals",
  templateUrl: "./vitals.page.html",
  styleUrls: ["./vitals.page.scss"]
})
export class VitalsPage implements OnInit {
  vitals;
  constructor(
    public actShtCtr: ActionSheetController,
    private router: Router
  ) {}

  ngOnInit() {
    this.vitals = [
      {
        id: 1,
        date: "23 March 2020",
        temparature: "97.6 F",
        pulseRate: "80 per min",
        respirationRate: "20 per min",
        bloodPressure: "120/80"
      },
      {
        id: 2,
        date: "15 March 2020",
        temparature: "97.6 F",
        pulseRate: "80 per min",
        respirationRate: "20 per min",
        bloodPressure: null
      }
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
              this.router.navigate(["/vital-questions", 1]);
            }
          },
          {
            text: "Delete",
            handler: () => {
              console.log("Delte clicked");
              this.vitals = this.vitals.filter(vital => vital.id !== id);
            }
          },
          {
            text: "Close",
            role: "cancel",
            handler: () => {
              console.log("Cancel clicked");
            }
          }
        ]
      })
      .then(ac => ac.present());
  }
}
