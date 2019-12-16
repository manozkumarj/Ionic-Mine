import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.page.html',
  styleUrls: ['./admin-registration.page.scss'],
})
export class AdminRegistrationPage implements OnInit {

  constructor(public plt: Platform) {
    if (this.plt.is('ios')) {
      // This will only print when on iOS
      console.log('I am an iOS device!');
    } else if ('android') {
      // This will only print when on Android
      console.log('I am an Android device!');
    } else {
      console.log('Browser');
    }
  }

  ngOnInit() {
    // alert(window.cordova.platformId);
  }

}
