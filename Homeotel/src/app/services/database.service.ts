import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { SQLitePorter } from "@ionic-native/sqlite-porter/ngx";
import { Platform } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { UtilitiesService } from "./utilities.service";

@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  dbObject: SQLiteObject;
  isDbReady: boolean = false;

  database_name: string = "homeotel_dev_1.db";

  // Tables
  table_users = "table_users";

  IN_user_id = this.utilities.userId;
  IN_relative_id = this.utilities.selectedRelativeId;

  constructor(
    private plt: Platform,
    public sqlite: SQLite,
    private http: HttpClient,
    private sqlitePorter: SQLitePorter,
    private utilities: UtilitiesService
  ) {
    this.createDb();
  }

  createDb() {
    return this.plt.ready().then(() => {
      return this.sqlite
        .create({
          name: this.database_name,
          location: "default",
        })
        .then(async (db: SQLiteObject) => {
          this.dbObject = await db;
          console.log("database - createDb - Success -> " + JSON.stringify(db));
          return db;
        })
        .catch((error) => {
          console.warn(
            "database - createDb - Error -> " + JSON.stringify(error)
          );
          return false;
        });
    });
  }

  seedSql() {
    return this.http
      .get("assets/homeotel_dev_1.sql", { responseType: "text" })
      .toPromise()
      .then((sql) => {
        return this.sqlitePorter
          .importSqlToDb(this.dbObject, sql)
          .then(async (res) => {
            let getRes = await res;
            console.log("SQL file imported successfully... :)");
            this.isDbReady = true;
            return true;
          })
          .catch((error) => {
            console.warn("SQL file import error => " + JSON.stringify(error));
            return false;
          });
      });
  }

  exportDatabaseToSql() {
    this.sqlitePorter.exportDbToSql(this.database_name).then((data) => {
      console.log("Database has been exported" + JSON.stringify(data));
    });
  }

  checkTable() {
    return this.createDb().then(async (res: SQLiteObject) => {
      console.log("log from checkTable func");
      let data = await res;
      let sql = "SELECT name FROM sqlite_master WHERE type='table' AND name=?";
      return data
        .executeSql(sql, [this.table_users])
        .then((res) => {
          console.log(
            "database - checkTable - Success -> " + JSON.stringify(res)
          );
          if (res.rows.length <= 0) {
            return this.seedSql().then(async (res) => {
              let data = await res;
              if (data != null) {
                return true;
              }
            });
          } else {
            this.isDbReady = true;
            return true;
          }
        })
        .catch((error) => {
          console.warn(
            "database - checkTable - Error -> " + JSON.stringify(error)
          );
          return false;
        });
    });
  }

  // -------------------------- For reference - starts  --------------------------
  insertItem(name_model) {
    let sql = "INSERT INTO myfreakytable (name) VALUES (?)";
    return this.dbObject
      .executeSql(sql, [name_model])
      .then((res) => {
        console.log(
          "database - insertItem - Success -> " + JSON.stringify(res)
        );
        return true;
      })
      .catch((error) => {
        console.warn(
          "database - insertItem - Error -> " + JSON.stringify(error)
        );
        return false;
      });
  }

  getItems() {
    let sql = "SELECT * FROM myfreakytable";
    return this.dbObject.executeSql(sql, []).then((res) => {
      let names = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          names.push(res.rows.item(i));
        }
      }
      return names;
    });
  }

  getTables() {
    let sql = "SELECT name FROM sqlite_master WHERE type ='table'";
    return this.dbObject.executeSql(sql, []).then((data) => {
      let tables = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          tables.push({
            tableName: data.rows.item(i).name,
          });
        }
      }
      return tables;
    });
  }

  deleteItem(id) {
    let sql = "DELETE FROM myfreakytable WHERE pid = ?";
    return this.dbObject
      .executeSql(sql, [id])
      .then((res) => {
        console.log(
          "database - deleteItem - Success -> " + JSON.stringify(res)
        );
        return true;
      })
      .catch((error) => {
        console.warn(
          "database - deleteItem - Error -> " + JSON.stringify(error)
        );
        return false;
      });
  }
  // -------------------------- For reference - ends  --------------------------}
  crudOperations(query) {
    return this.dbObject
      .executeSql(query, [])
      .then((res) => {
        console.log(
          "database - crudOperation - Success -> " + JSON.stringify(res)
        );
        return true;
      })
      .catch((error) => {
        console.warn(
          "database - crudOperation - Error -> " + JSON.stringify(error)
        );
        return false;
      });
  }

  getLifestyles() {
    let sql = `SELECT * FROM (SELECT * FROM m_smoking where is_active =1) AS 'm_smoking', 
    (SELECT * FROM m_alcohol where is_active =1) AS 'm_alcohol',
    (SELECT * FROM m_excercise where is_active =1) AS 'm_excercise',
    (SELECT * FROM m_activity_level where is_active =1) AS 'm_activity_level',
    (SELECT * FROM m_profession where is_active =1) AS 'm_profession',
    (SELECT * FROM m_food where is_active =1) AS 'm_food',
    (SELECT * FROM m_heat where is_active =1) AS 'm_heat',

    (SELECT el.smoking_id, m.name FROM ehr_lifestyle el
    LEFT JOIN m_smoking m ON el.smoking_id = m.smoking_id
    where user_id = ${this.IN_user_id} AND relative_id = ${this.IN_relative_id}) AS 'smoking_data',

    (SELECT el.alcohol_id, m.name FROM ehr_lifestyle el
    LEFT JOIN m_alcohol m ON el.alcohol_id = m.alcohol_id
    where user_id = ${this.IN_user_id} AND relative_id = ${this.IN_relative_id}) AS 'alcohol_data',

    (SELECT el.excercise_id, m.name FROM ehr_lifestyle el
    LEFT JOIN m_excercise m ON el.excercise_id = m.excercise_id
    where user_id = ${this.IN_user_id} AND relative_id = ${this.IN_relative_id}) AS 'excercise_data',

    (SELECT el.activity_level_id, m.name FROM ehr_lifestyle el
    LEFT JOIN m_activity_level m ON el.activity_level_id = m.activity_level_id
    where user_id = ${this.IN_user_id} AND relative_id = ${this.IN_relative_id}) AS 'activity_level_data',

    (SELECT el.profession_id, m.name FROM ehr_lifestyle el
    LEFT JOIN m_profession m ON el.profession_id = m.profession_id
    where user_id = ${this.IN_user_id} AND relative_id = ${this.IN_relative_id}) AS 'profession_data',

    (SELECT el.food_id, m.name FROM ehr_lifestyle el
    LEFT JOIN m_food m ON el.food_id = m.food_id
    where user_id = ${this.IN_user_id} AND relative_id = ${this.IN_relative_id}) AS 'food_data',

    (SELECT el.heat_id, m.name FROM ehr_lifestyle el
    LEFT JOIN m_heat m ON el.heat_id = m.heat_id
    where user_id = ${this.IN_user_id} AND relative_id = ${this.IN_relative_id}) AS 'heat_data'`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let vitals = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          vitals.push(res.rows.item(i));
        }
      }
      return vitals;
    });
  }
}
