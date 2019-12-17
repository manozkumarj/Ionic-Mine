import { Platform } from "@ionic/angular";
import { Injectable } from "@angular/core";
import { SQLitePorter } from "@ionic-native/sqlite-porter/ngx";
import { HttpClient } from "@angular/common/http";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { BehaviorSubject, Observable } from "rxjs";

export interface Dev {
  id: number;
  name: string;
  role: string;
  gender: string;
  img: string;
}

@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  databaseStatus = false;

  developers = new BehaviorSubject([]);

  constructor(
    private plt: Platform,
    private sqlitePorter: SQLitePorter,
    private sqlite: SQLite,
    private http: HttpClient
  ) { }

  createDatabase() {
    // console.log("Creating new Db");
    this.plt.ready().then(() => {
      this.sqlite
        .create({
          name: "sampleList.db",
          location: "default"
        })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.getUsers().then(users => {
            alert("Database is already exist...!");
          }).catch(error => {
            this.seedDatabase();
          });
        })
        .catch(error => alert("Create database error => " + JSON.stringify(error)));
    });
  }

  seedDatabase() {
    this.http
      .get("assets/seed.sql", { responseType: "text" })
      .subscribe(sql => {
        this.sqlitePorter
          .importSqlToDb(this.database, sql)
          .then(_ => {
            this.databaseStatus = true;
            alert("Database is created & SQL file imported :) ");
            this.dbReady.next(true);
          })
          .catch(error => alert("Seed database error => " + JSON.stringify(error)));
      });
  }

  getDatabaseState() {
    return this.databaseStatus;
  }

  getUsers() {
    return this.database
      .executeSql("SELECT * FROM du_User", []);
  }

}
