import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { MenuController } from "@ionic/angular";
import { StorageService } from "./services/storage.service";
import { CommonService } from "./services/common.service";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  public appPages = [
    // {
    //   title: "Initialization",
    //   url: "/initialization",
    //   icon: "list"
    // },
    // {
    //   title: "Home",
    //   url: "/home",
    //   icon: "list"
    // },
    // {
    //   title: "Admin Registration",
    //   url: "/admin-registration",
    //   icon: "list"
    // },
    // {
    //   title: "Login",
    //   url: "/login",
    //   icon: "list"
    // },
    // {
    //   title: "Session Selection",
    //   url: "/session-selection",
    //   icon: "list"
    // },
    {
      title: "Search Beneficiary",
      url: "/search-beneficiary",
      icon: "list"
    },
    {
      title: "Beneficiary Registration",
      url: "/beneficiary-registration",
      icon: "list"
    },
    {
      title: "Vitals",
      url: "/vitals",
      icon: "list"
    },
    {
      title: "Doctor",
      url: "/doctor",
      icon: "list"
    },
    {
      title: "LabTest",
      url: "/lab-test",
      icon: "list"
    },
    {
      title: "Medicine Dispense",
      url: "/medicine-dispense",
      icon: "list"
    },
    {
      title: "Consumable Dispense",
      url: "/consumable-dispense",
      icon: "list"
    },
    {
      title: "Beneficiary History",
      url: "/beneficiary-history",
      icon: "list"
    },
    {
      title: "Staff Registration",
      url: "/staff-registration",
      icon: "list"
    },
    {
      title: "Edit Staff",
      url: "/edit-staff",
      icon: "list"
    },
    {
      title: "Staff Attendance",
      url: "/staff-attendance",
      icon: "list"
    },
    {
      title: "Other Options",
      url: "/reports",
      icon: "list"
    },
    {
      title: "Logout",
      url: "/logout",
      icon: "log-out"
    }
    // {
    //   title: "Care Provided",
    //   url: "/care-provided",
    //   icon: "list"
    // },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public menuCtrl: MenuController,
    private storageService: StorageService,
    private commonService: CommonService,
    private alertCtrl: AlertController
  ) {
    this.initializeApp();
  }

  closeMenu() {
    this.menuCtrl.toggle();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
