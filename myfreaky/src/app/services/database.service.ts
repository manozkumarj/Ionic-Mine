import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { SQLitePorter } from "@ionic-native/sqlite-porter/ngx";
import { Platform } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  dbObject: SQLiteObject;
  database_name: string = "ex.db";
  table_name: string = "myfreakytable";

  constructor(
    private plt: Platform,
    public sqlite: SQLite,
    private http: HttpClient,
    private sqlitePorter: SQLitePorter
  ) {
    this.createDb();
  }

  createDb() {
    return this.plt.ready().then(() => {
      return this.sqlite.create({
        name: 'ex.db',
        location: 'default'
      }).then(async (db: SQLiteObject) => {
        this.dbObject = await db;
        console.log("database - constructor - Success -> " + JSON.stringify(db));
        return true;
      }).catch(error => {
        console.warn("database - constructor - Error -> " + JSON.stringify(error));
        return false;
      });
    });
  }

  seedSql() {
    this.http
      .get("assets/ex_sql.sql", { responseType: "text" })
      .subscribe(sql => {
        this.sqlitePorter
          .importSqlToDb(this.dbObject, sql)
          .then(_ => {
            console.log("SQL file imported successfully... :)");
            return true;
          })
          .catch(error => {
            console.warn("SQL file import error => " + JSON.stringify(error));
            return false;
          });
      });
  }

  checkTable() {
    return this.createDb().then(data => {
      let sql = "SELECT name FROM sqlite_master WHERE type='table' AND name='myfreakytable'";
      return this.dbObject.executeSql(sql, []).then(res => {
        console.log("database - checkTable - Success -> " + JSON.stringify(res));
        if (res.rows.length <= 0)
          return false;
        return true;
      }).catch(error => {
        console.warn("database - checkTable - Error -> " + JSON.stringify(error));
        return false;
      });
    });
  }

  insertItem(name_model) {
    let sql = 'INSERT INTO myfreakytable (name) VALUES (?)';
    return this.dbObject.executeSql(sql, [name_model]).then(res => {
      console.log("database - insertItem - Success -> " + JSON.stringify(res));
      return true;
    }).catch(error => {
      console.warn("database - insertItem - Error -> " + JSON.stringify(error));
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
      console.warn("database - deleteItem - Error -> " + JSON.stringify(error));
      return false;
    });
  }
}
