import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController } from "@ionic/angular";
import { CommonService } from "./services/common.service";
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  appPages;
  constructor(
    private platform: Platform,
    private apiSerice : ApiService,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public menuCtrl: MenuController,
    public commonService: CommonService
  ) {
    this.initializeApp();

    // this.appPages = [
    //   {
    //     title: "Today's Queue",
    //     url: "/today-queue",
    //     icon: "heart-outline"
    //   }, {
    //     title: "Appointments",
    //     url: "/scheduled-appointments",
    //     icon: "calendar"
    //   },
    //   {
    //     title: "Settings",
    //     url: "/settings",
    //     icon: "settings"
    //   },
    //   {
    //     title: "Help Center",
    //     url: "/help-center",
    //     icon: "help-circle"
    //   }
    // ];
    // console.log(this.appPages[0].title);
  }



ngOnInit(){
  
 
}
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
