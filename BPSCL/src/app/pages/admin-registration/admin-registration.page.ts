import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.page.html',
  styleUrls: ['./admin-registration.page.scss'],
})
export class AdminRegistrationPage implements OnInit {

  adminUsers: any[] = [];
  constructor(public plt: Platform, private db: DatabaseService) {
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
    this.db.getUsers().then(users => {
      this.adminUsers = users;
      // alert("Total No. of users = " + users.length);
      // alert("Total users are ==> " + JSON.stringify(users));
    }).catch(error => {
      console.error("Database Error " + JSON.stringify(error));
    });
  }

}
