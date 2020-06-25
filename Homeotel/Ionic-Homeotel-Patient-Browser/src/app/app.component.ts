import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { MenuController } from "@ionic/angular";
import { UtilitiesService } from "./services/utilities.service";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
import { faBars } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  appPages;
  faBars = faBars;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private androidPermissions: AndroidPermissions,
    public menuCtrl: MenuController,
    public utilities: UtilitiesService
  ) {
    platform.ready().then(() => {
      this.androidPermissions.requestPermissions([
        this.androidPermissions.PERMISSION.CAMERA,
        this.androidPermissions.PERMISSION.CALL_PHONE,
        this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
        this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
        this.androidPermissions.PERMISSION.ACCEPT_HANDOVER,
        this.androidPermissions.PERMISSION.CAPTURE_AUDIO_OUTPUT,
        this.androidPermissions.PERMISSION.RECORD_AUDIO,
        this.androidPermissions.PERMISSION.RECORD_VIDEO,
      ]);
    });

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
