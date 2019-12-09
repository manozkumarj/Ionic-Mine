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
  skills: any[];
  gender: string;
  img: string;
}

@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  developers = new BehaviorSubject([]);

  constructor(
    private plt: Platform,
    private sqlitePorter: SQLitePorter,
    private sqlite: SQLite,
    private http: HttpClient
  ) {}

  createDatabase() {
    console.log("Creating new Db");
    this.plt.ready().then(() => {
      this.sqlite
        .create({
          name: "developersList.db",
          location: "default"
        })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
        });
    });
  }

  seedDatabase() {
    this.http
      .get("assets/seed.sql", { responseType: "text" })
      .subscribe(sql => {
        this.sqlitePorter
          .importSqlToDb(this.database, sql)
          .then(_ => {
            this.loadDevelopers();
            this.dbReady.next(true);
          })
          .catch(e => console.error(e));
      });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getDevs(): Observable<Dev[]> {
    return this.developers.asObservable();
  }

  loadDevelopers() {
    return this.database
      .executeSql("SELECT * FROM developer", [])
      .then(data => {
        let developers: Dev[] = [];

        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            let skills = [];
            if (data.rows.item(i).skills != "") {
              skills = JSON.parse(data.rows.item(i).skills);
            }

            developers.push({
              id: data.rows.item(i).id,
              name: data.rows.item(i).name,
              role: data.rows.item(i).role,
              skills: skills,
              gender: data.rows.item(i).gender,
              img: data.rows.item(i).img
            });
          }
        }
        this.developers.next(developers);
      });
  }

  addDeveloper(name, role, skills, gender, img) {
    let data = [name, role, JSON.stringify(skills), gender, img];
    return this.database
      .executeSql(
        "INSERT INTO developer (name, role, skills, gender, img) VALUES (?, ?, ?, ?, ?)",
        data
      )
      .then(data => {
        this.loadDevelopers();
      });
  }

  getDeveloper(id): Promise<Dev> {
    return this.database
      .executeSql("SELECT * FROM developer WHERE id = ?", [id])
      .then(data => {
        let skills = [];
        if (data.rows.item(0).skills != "") {
          skills = JSON.parse(data.rows.item(0).skills);
        }

        return {
          id: data.rows.item(0).id,
          name: data.rows.item(0).name,
          role: data.rows.item(0).role,
          skills: skills,
          gender: data.rows.item(0).gender,
          img: data.rows.item(0).img
        };
      });
  }

  deleteDeveloper(id) {
    return this.database
      .executeSql("DELETE FROM developer WHERE id = ?", [id])
      .then(_ => {
        this.loadDevelopers();
      });
  }

  updateDeveloper(dev: Dev) {
    let data = [dev.name, dev.role, JSON.stringify(dev.skills), dev.gender, dev.img];
    return this.database
      .executeSql(
        `UPDATE developer SET name = ?, role = ?, skills = ?, gender = ?, img = ? WHERE id = ${dev.id}`,
        data
      )
      .then(data => {
        this.loadDevelopers();
      });
  }

}
