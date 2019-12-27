import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { MenuController } from "@ionic/angular";
import { DatabaseService } from "./services/database.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  public appPages = [
    {
      title: "Home",
      url: "/home",
      icon: "list"
    },
    {
      title: "Admin Registration",
      url: "/admin-registration",
      icon: "list"
    },
    {
      title: "Login",
      url: "/login",
      icon: "list"
    },
    {
      title: "Session Selection",
      url: "/session-selection",
      icon: "list"
    },
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
      title: "Care Provided",
      url: "/care-provided",
      icon: "list"
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public menuCtrl: MenuController,
    private db: DatabaseService
  ) {
    this.initializeApp();
    this.prepareDatabase();
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

  prepareDatabase() {
    this.db
      .checkTable()
      .then((res: any) => {
        if (!res) {
          console.error(
            "checkTable() -> Something went wrong -> " + JSON.stringify(res)
          );
        } else {
          console.log("Table is ready :) -> " + JSON.stringify(res));
        }
      })
      .catch((error: any) => {
        console.error(
          "catch -> Table doesn't exist -> " + JSON.stringify(error)
        );
      });
  }
}
