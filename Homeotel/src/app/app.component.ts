import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { MenuController } from "@ionic/angular";
import { CommonService } from "./services/common.service";
import { UtilitiesService } from "./services/utilities.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  appPages;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public menuCtrl: MenuController,
    public utilities: UtilitiesService
  ) {
    this.initializeApp();
    this.appPages = [
      {
        title: "My Doctors",
        url: "/my-doctors",
        icon: "heart-outline",
      },
      {
        title: "Appointments",
        url: "/appointments",
        icon: "send-outline",
      },
      {
        title: "Homeo Kits",
        url: "/homeo-kits",
        icon: "alarm-outline",
      },
      {
        title: "Health Records",
        url: "/health-records",
        icon: "chatbubbles-outline",
      },
      {
        title: "Payments",
        url: "/payments",
        icon: "flag-outline",
      },
      {
        title: "Settings",
        url: "/settings",
        icon: "pricetag-outline",
      },
      {
        title: "Help Center",
        url: "/help-center",
        icon: "cart-outline",
      },
      {
        title: "Logout",
        url: "/logout",
        icon: "log-out",
      },
    ];
    console.log(this.appPages[0].title);

    console.log("this.utilities.currentUserDetails below");
    console.log(this.utilities.currentUserDetails);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
