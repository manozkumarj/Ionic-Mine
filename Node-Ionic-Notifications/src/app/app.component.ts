import { Component } from '@angular/core';
import { Platform } from "@ionic/angular";
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { FcmServices } from './services/fcm.service';
import { ToastController } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { Firebase } from '@ionic-native/firebase/ngx';
import { TabsPage } from './tabs/tabs.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  rootPage: any = TabsPage;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public fcm: FcmServices,
    public toastCtrl: ToastController,
    public firebaseNative: Firebase) {
    platform.ready().then(() => {

      statusBar.backgroundColorByHexString('#2693ee');
      statusBar.styleDefault();
      splashScreen.hide();

      // Get an FCM token
      fcm.getToken();

      // Listen to incoming messages
      fcm.listenToNotifications().pipe(
        tap(async msg => {
          // show a toast
          const toast = await this.toastCtrl.create({
            message: msg.body,
            duration: 3000
          });
          toast.present();
        })
      )
        .subscribe();
    });
  }
}