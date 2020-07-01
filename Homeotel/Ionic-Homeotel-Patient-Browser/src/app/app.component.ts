import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { MenuController } from "@ionic/angular";
import { UtilitiesService } from "./services/utilities.service";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faFlag } from "@fortawesome/free-regular-svg-icons";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";
import { faStickyNote } from "@fortawesome/free-regular-svg-icons";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { AuthService } from "./services/auth.service";

// import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
// import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
// import { faFile } from "@fortawesome/free-regular-svg-icons";
// import { faCircle } from "@fortawesome/free-regular-svg-icons";
// import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";
// import { faCheckSquare } from "@fortawesome/free-regular-svg-icons";
// import { faBuilding } from "@fortawesome/free-regular-svg-icons";
// import { faIdBadge } from "@fortawesome/free-regular-svg-icons";
// import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";
// import { faCalendar } from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  appPages;
  faBars = faBars;
  faUserFriends = faUserFriends;
  faPaperPlane = faPaperPlane;
  faBell = faBell;
  faEnvelope = faEnvelope;
  faFlag = faFlag;
  faNewspaper = faNewspaper;
  faStickyNote = faStickyNote;
  faArrowAltCircleLeft = faArrowAltCircleLeft;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private androidPermissions: AndroidPermissions,
    public menuCtrl: MenuController,
    public authService: AuthService,
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
        icon: faUserFriends,
      },
      {
        title: "Appointments",
        url: "/appointments",
        icon: faPaperPlane,
      },
      {
        title: "Homeo Kits",
        url: "/homeo-kits",
        icon: faBell,
      },
      {
        title: "Health Records",
        url: this.utilities.isHybridApp ? "/health-records" : "/vitals",
        icon: faEnvelope,
      },
      {
        title: "Payments",
        url: "/payments",
        icon: faFlag,
      },
      {
        title: "Settings",
        url: "/settings",
        icon: faNewspaper,
      },
      {
        title: "Help Center",
        url: "/help-center",
        icon: faStickyNote,
      },
      {
        title: "Previous Consultations",
        url: "/previous-consultations",
        icon: faStickyNote,
      },
      {
        title: "Logout",
        url: "/logout",
        icon: faArrowAltCircleLeft,
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
