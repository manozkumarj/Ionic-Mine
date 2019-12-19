import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { Platform } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  dbObject: SQLiteObject;
  database_name: string = "ex.db";
  table_name: string = "myfreakytable";

  constructor(public sqlite: SQLite) {
    this.sqlite.create({
      name: 'ex.db',
      location: 'default'
    }).then(async (db: SQLiteObject) => {
      this.dbObject = await db;
      console.log("database - constructor - Success -> " + JSON.stringify(db));
    }).catch(error => {
      console.log("database - constructor - Error -> " + JSON.stringify(error));
    });
  }

  insertItem(name_model) {
    let sql = 'INSERT INTO myfreakytable (name) VALUES (?)';
    return this.dbObject.executeSql(sql, [name_model]).then(res => {
      console.log("database - insertItem - Success -> " + JSON.stringify(res));
      return true;
    }).catch(error => {
      console.log("database - insertItem - Error -> " + JSON.stringify(error));
      return false;
    });
  }

  getItems() {
    let sql = 'SELECT * FROM myfreakytable';
    return this.dbObject.executeSql(sql, []).then(res => {
      let names = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          names.push(res.rows.item(i));
        }
      }
      return names;
    });
  }

  deleteItem(id) {
    let sql = 'DELETE FROM myfreakytable WHERE pid = ?';
    return this.dbObject.executeSql(sql, [id]).then(res => {
      console.log("database - deleteItem - Success -> " + JSON.stringify(res));
      return true;
    }).catch(error => {
      console.log("database - deleteItem - Error -> " + JSON.stringify(error));
      return false;
    });
  }
}
