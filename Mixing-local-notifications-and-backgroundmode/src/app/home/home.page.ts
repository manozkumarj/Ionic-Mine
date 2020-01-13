import { Component } from "@angular/core";
import { Platform } from "@ionic/angular";
import { BackgroundMode } from "@ionic-native/background-mode/ngx";
import { LocalNotifications } from "@ionic-native/local-notifications/ngx";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  notificationAlreadyReceived = false;
  constructor(
    public backgroundMode: BackgroundMode,
    public platform: Platform,
    public localNotifications: LocalNotifications
  ) {
    platform.ready().then(() => {
      this.backgroundMode.on("activate").subscribe(() => {
        console.log("Device is in background... :)");
        if (this.notificationAlreadyReceived === false) {
          this.showNotification();
        }
      });

      this.backgroundMode.on("deactivate").subscribe(() => {
        console.log("Device is in foreground...");
        this.showNotification();
      });

      this.backgroundMode.enable();
    });
  }

  showNotification() {
    this.localNotifications.schedule({
      text: "There is a legendary Pokemon near you",
      foreground: true
    });

    this.notificationAlreadyReceived = true;
  }
}
