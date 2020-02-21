import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController } from "@ionic/angular";
import { CommonService } from "./services/common.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  appPages;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public menuCtrl: MenuController,
    private commonService: CommonService
  ) {
    this.initializeApp();
    this.appPages = [
      {
        title: "Profile",
        url: "/profile",
        icon: "person-outline"
      },
      {
        title: "Family",
        url: "/family",
        icon: "heart-outline"
      }, {
        title: "Consultations",
        url: "/consultations",
        icon: "send-outline"
      },
      {
        title: "Reminders",
        url: "/reminders",
        icon: "alarm-outline"
      },
      {
        title: "Transactions",
        url: "/transactions",
        icon: "chatbubbles-outline"
      },
      {
        title: "Feedback",
        url: "/feedback",
        icon: "flag-outline"
      },
      {
        title: "Promos",
        url: "/promos",
        icon: "pricetag-outline"
      },
      {
        title: "Purchases",
        url: "/purchases",
        icon: "cart-outline"
      },
      {
        title: "Logout",
        url: "/logout",
        icon: "log-out"
      }
    ];
    console.log(this.appPages[0].title);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
