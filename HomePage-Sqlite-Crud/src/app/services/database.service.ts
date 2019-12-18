import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  databaseObj: SQLiteObject;
  row_data: any = [];
  readonly database_name: string = "freaky_datatable_zolt.db";
  readonly table_name: string = "myfreakytable_zolt";

  constructor(
    private platform: Platform,
    private sqlite: SQLite
  ) {
    this.platform.ready().then(() => {
      this.createDB();
    }).catch(error => {
      console.log(error);
    })
  }


  createDB() {
    return this.sqlite.create({
      name: this.database_name,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
        alert('freaky_datatable Database Created!');
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }


  createTable() {
    this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS ' + this.table_name + ' (pid INTEGER PRIMARY KEY, Name varchar(255))', [])
      .then(() => {
        alert('Table Created!');
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }


  insertRow(name_model) {
    return this.databaseObj.executeSql('INSERT INTO ' + this.table_name + ' (Name) VALUES ("' + name_model + '")', [])
      .then(() => {
        return this.getRows();
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }


  getRows() {
    return this.databaseObj.executeSql("SELECT * FROM " + this.table_name, [])
      .then((res) => {
        this.row_data = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            this.row_data.push(res.rows.item(i));
          }
          return this.row_data;
        }
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }

  deleteRow(item) {
    return this.databaseObj.executeSql("DELETE FROM " + this.table_name + " WHERE pid = " + item.pid, [])
      .then((res) => {
        alert("Row Deleted!");
        return this.getRows();
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }

}
