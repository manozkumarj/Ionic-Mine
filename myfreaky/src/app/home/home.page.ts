import { Component } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { ToastController } from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  namesList = [];
  name_model: string = ""; // Input field model
  dbObject: SQLiteObject;

  constructor(public sqlite: SQLite, private toastController: ToastController) {
    this.sqlite.create({
      name: 'ex.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.dbObject = db;
      // console.log("After create fun -> " + JSON.stringify(db));
      this.printAllNames();
    }).catch(error => {
      console.log("Error After create fun -> " + JSON.stringify(error));
    });
  }

  doRefresh(event) {
    console.log("Begin async operation");

    setTimeout(() => {
      console.log("Async operation has ended");
      this.presentToastSuccess();
      event.target.complete();
    }, 2000);
  }

  async presentToastSuccess() {
    const toast = await this.toastController.create({
      color: "success",
      message: "Success.",
      duration: 2000
    });
    toast.present();
  }

  async presentToastWarning() {
    const toast = await this.toastController.create({
      color: "danger",
      message: "Something went wrong.",
      duration: 2000
    });
    toast.present();
  }

  insertName() {
    if (!this.name_model.length) {
      alert("Enter Name");
      return;
    }
    let sql = 'INSERT INTO myfreakytable (name) VALUES (?)';
    this.dbObject.executeSql(sql, [this.name_model]).then(res => {
      this.name_model = '';
      this.printAllNames();
      this.presentToastSuccess();
    });
  }

  printAllNames() {
    let sql = 'SELECT * FROM myfreakytable';
    this.dbObject.executeSql(sql, []).then(res => {
      let names = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          names.push(res.rows.item(i));
        }
        this.namesList = names;
      }
    });
  }

  deleteRow(item) {
    console.log("Delatable name -> " + item);
  }

}
