import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { DatabaseService } from "./../services/database.service";
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy, AfterViewInit {
  backButtonSubscription; // for storing the returned subscription
  adminUsers: any[] = [];
  constructor(
    private db: DatabaseService,
    private platform: Platform,
  ) { }

  ngOnInit() {
    this.db.getUsers().then(users => {
      this.adminUsers = users;
      // alert("Total No. of users = " + users.length);
      // alert("Total users are ==> " + JSON.stringify(users));
    }).catch(error => {
      console.error("Database Error " + JSON.stringify(error));
    });
  }

  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }

}
