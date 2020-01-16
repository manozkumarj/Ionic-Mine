import { Component } from "@angular/core";
import { FCM } from "@ionic-native/fcm/ngx";
import { Router } from "@angular/router";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { BackgroundMode } from "@ionic-native/background-mode/ngx";
import { LocalNotifications } from "@ionic-native/local-notifications/ngx";
import { FcmServices } from "./services/fcm.service";
import { StorageService } from "./services/storage.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  storedToken: string = "";
  token: string = "";
  public appPages = [
    {
      title: "Home",
      url: "/home",
      icon: "home"
    },
    {
      title: "List",
      url: "/list",
      icon: "list"
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FCM,
    private router: Router,
    public fcmService: FcmServices,
    private storageService: StorageService,
    public backgroundMode: BackgroundMode,
    public localNotifications: LocalNotifications
  ) {
    this.storageService
      .get("storedToken")
      .then(result => {
        this.storedToken = result;
        if (result) {
          console.log("Token is already stored");
        }
        console.log("storedToken is: " + result);
        this.initializeApp();
      })
      .catch(e => {
        console.log("error: " + e);
      });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.fcm.getToken().then(token => {
        //  console.log(token);
        this.token = token;
        if (!this.storedToken) {
          this.insertToken(token);
        }
      });

      this.fcm.onTokenRefresh().subscribe(token => {
        //  console.log(token);
        this.token = token;
        if (!this.storedToken) {
          this.insertToken(token);
        }
      });
    });

    this.fcm.onNotification().subscribe(data => {
      console.log(data);

      this.fcmService.insertItem();

      if (data.wasTapped) {
        console.log("Received in background");
        this.router.navigate([data.landing_page, data.price]);
      } else {
        console.log("Received in foreground");
        this.router.navigate([data.landing_page, data.price]);
      }
    });
    this.setupBackgroundMode();
  }

  insertToken(token) {
    console.log("this.storedToken --> " + this.storedToken);
    console.log("Token is, from app.component.ts -> " + token);

    if (!this.storedToken) {
      this.fcmService.storeToken(this.token);
    }
  }

  setupBackgroundMode() {
    this.backgroundMode.enable();
    this.backgroundMode.excludeFromTaskList();
    this.backgroundMode.setDefaults({ hidden: true, silent: true });

    this.backgroundMode.on("activate").subscribe(() => {
      console.log("Device is in background... :)");
      this.showNotificationWith15SecondsDelay();
      this.showNotificationWith1MinuteDelay();
    });

    this.backgroundMode.on("deactivate").subscribe(() => {
      console.log("Device is in foreground...");
      this.showNotification();
    });

    this.backgroundMode.on("pause").subscribe(() => {
      console.log("Device is Paused... :)");
    });
  }

  showNotification() {
    this.localNotifications.schedule({
      text: "Foreground related notification",
      foreground: true
    });
  }

  showNotificationWith15SecondsDelay() {
    this.localNotifications.schedule({
      text: "This is 15 seconds scheduled notification...",
      foreground: true,
      trigger: { at: new Date(new Date().getTime() + 15000) }
    });
  }

  showNotificationWith1MinuteDelay() {
    this.fcmService.insertItem();
    this.localNotifications.schedule({
      text: "This is 1 minute scheduled notification...",
      foreground: true,
      trigger: { at: new Date(new Date().getTime() + 60000) }
    });
  }
}
