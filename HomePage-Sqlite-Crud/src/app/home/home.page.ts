import { DatabaseService } from './../services/database.service';
import { Component, OnInit } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  databaseObj: SQLiteObject;
  name_model: string = "";
  row_data: any = [];
  readonly database_name: string = "freaky_datatable.db";
  readonly table_name: string = "myfreakytable";

  showCreateDBBtn: boolean = false;
  showCreateTableBtn: boolean = false;
  showGetRowsBtn: boolean = true;

  constructor(
    private platform: Platform,
    private db: DatabaseService
  ) {
    this.platform.ready().then(() => {
      this.db.getRows().then(data => {
        this.row_data = data;
        alert("Database is exist");
      }).catch(error => {
        this.showCreateDBBtn = true;
        this.showCreateTableBtn = true;
        this.db.createDB().then(data => {
          this.db.createTable();
        }).catch(error => {
          alert(error);
        });
        console.log(error);
      });
    });
  }

  ngOnInit() {

  }

  getRows() {
    this.db.getRows().then(data => {
      this.row_data = data;
      this.showCreateDBBtn = false;
      this.showCreateTableBtn = false;
    }).catch(error => {
      console.log(error);
    });
  }

  insertRow(name_model) {
    if (!name_model.length) {
      alert("Enter Name");
      return;
    } else {
      this.db.getRows().then(data => {
        this.row_data = data;
        alert('Row Inserted!');
      });
    }
  }


  deleteRow(item) {
    this.db.getRows().then(data => {
      this.row_data = data;
      alert("Row Deleted!");
    });
  }

}