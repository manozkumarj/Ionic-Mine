import { Component } from "@angular/core";
import { Platform } from "@ionic/angular";
import { BackgroundMode } from "@ionic-native/background-mode/ngx";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  constructor(
    public backgroundMode: BackgroundMode,
    public platform: Platform
  ) {
    platform.ready().then(() => {
      this.backgroundMode.on("activate").subscribe(() => {
        console.log("Device is in background");
      });
      
      this.backgroundMode.on("deactivate").subscribe(() => {
        console.log("Device is in foreground");
      });

      this.backgroundMode.enable();
    });
  }
}
