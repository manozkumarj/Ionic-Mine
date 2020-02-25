import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class CommonService {

  constructor(
    private alertCtrl: AlertController,
    private router: Router
  ) {
  }

  logout() {
    this.alertCtrl
      .create({
        header: "Are you sure?",
        message: "Do you want to logout?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel"
          },
          {
            text: "Logout",
            handler: () => {
              // alert("User will be logged out");
              this.router.navigate(["/login"]);
              // this.storageService.clear();
            }
          }
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });
  }
}
