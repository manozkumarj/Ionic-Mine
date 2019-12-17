import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "./../services/database.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private db: DatabaseService) { }

  ngOnInit() {
    this.db.getUsers().then(users => {
      alert("Total No. of users = " + users.length);
    }).catch(error => {
      // this.presentToastWarning();
      alert("Database Error " + JSON.stringify(error));
    });
  }
}
