import { Component, OnInit } from "@angular/core";
import { ActionSheetController } from "@ionic/angular";

@Component({
  selector: "app-files",
  templateUrl: "./files.page.html",
  styleUrls: ["./files.page.scss"]
})
export class FilesPage implements OnInit {
  constructor(private actShtCtr: ActionSheetController) {}

  ngOnInit() {}

  openMenu() {
    console.log("Actionsheet is opened");
    let actionSheet = this.actShtCtr
      .create({
        cssClass: "action-sheets-basic-page",
        buttons: [
          {
            text: "Take a Photo",
            handler: () => {
              console.log("Edit clicked");
            }
          },
          {
            text: "Upload from gallery",
            handler: () => {
              console.log("Delte clicked");
            }
          },
          {
            text: "Cancel",
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
