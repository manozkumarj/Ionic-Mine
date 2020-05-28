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

  database_name: string = "homeotel_dev_2.db";

  // Tables
  table_users = "table_users";

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
  getSmokingMasters() {
    let sql = "SELECT smoking_id, name FROM m_smoking where is_active =1";
    return this.dbObject.executeSql(sql, []).then((data) => {
      let smokingMasterData = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          smokingMasterData.push({
            smoking_id: data.rows.item(i).smoking_id,
            name: data.rows.item(i).name,
          });
        }
      }
      return smokingMasterData;
    });
  }

  getAlcoholMasters() {
    let sql = "SELECT alcohol_id, name FROM m_alcohol where is_active =1";
    return this.dbObject.executeSql(sql, []).then((data) => {
      let alcoholMasterData = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          alcoholMasterData.push({
            alcohol_id: data.rows.item(i).alcohol_id,
            name: data.rows.item(i).name,
          });
        }
      }
      return alcoholMasterData;
    });
  }

  getExcerciseMasters() {
    let sql = "SELECT excercise_id, name FROM m_excercise where is_active =1";
    return this.dbObject.executeSql(sql, []).then((data) => {
      let excerciseMasterData = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          excerciseMasterData.push({
            excercise_id: data.rows.item(i).excercise_id,
            name: data.rows.item(i).name,
          });
        }
      }
      return excerciseMasterData;
    });
  }

  getActivityLevelMasters() {
    let sql =
      "SELECT activity_level_id, name FROM m_activity_level where is_active =1";
    return this.dbObject.executeSql(sql, []).then((data) => {
      let activityLevelMasterData = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          activityLevelMasterData.push({
            activity_level_id: data.rows.item(i).activity_level_id,
            name: data.rows.item(i).name,
          });
        }
      }
      return activityLevelMasterData;
    });
  }

  getProfessionMasters() {
    let sql = "SELECT profession_id, name FROM m_profession where is_active =1";
    return this.dbObject.executeSql(sql, []).then((data) => {
      let professionMasterData = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          professionMasterData.push({
            profession_id: data.rows.item(i).profession_id,
            name: data.rows.item(i).name,
          });
        }
      }
      return professionMasterData;
    });
  }

  getFoodMasters() {
    let sql = "SELECT food_id, name FROM m_food where is_active =1";
    return this.dbObject.executeSql(sql, []).then((data) => {
      let foodMasterData = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          foodMasterData.push({
            food_id: data.rows.item(i).food_id,
            name: data.rows.item(i).name,
          });
        }
      }
      return foodMasterData;
    });
  }

  getHeatMasters() {
    let sql = "SELECT heat_id, name FROM m_heat where is_active =1";
    return this.dbObject.executeSql(sql, []).then((data) => {
      let heatMasterData = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          heatMasterData.push({
            heat_id: data.rows.item(i).heat_id,
            name: data.rows.item(i).name,
          });
        }
      }
      return heatMasterData;
    });
  }

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

  getLifestyleMasters() {
    let lifestyleMasterData = [];
    let sql = `SELECT smoking_id as id, name, 'table_smoking' as master_type FROM m_smoking where is_active = 1 
    UNION ALL
  SELECT alcohol_id as id, name, 'table_alcohol' as master_type FROM m_alcohol where is_active =1
    UNION ALL
  SELECT excercise_id as id, name, 'table_excercise' as master_type FROM m_excercise where is_active =1
    UNION ALL
  SELECT activity_level_id as id, name, 'table_activity_level' as master_type FROM m_activity_level where is_active =1
    UNION ALL
  SELECT profession_id as id, name, 'table_profession' as master_type FROM m_profession where is_active =1
    UNION ALL
  SELECT food_id as id, name, 'table_food' as master_type FROM m_food where is_active =1
    UNION ALL
  SELECT heat_id as id, name, 'table_heat' as master_type FROM m_heat where is_active =1`;
    return this.dbObject
      .executeSql(sql, [])
      .then((data) => {
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            lifestyleMasterData.push({
              id: data.rows.item(i).id,
              name: data.rows.item(i).name,
              master_type: data.rows.item(i).master_type,
            });
          }
        }
        return lifestyleMasterData;
      })
      .catch((err) => {
        console.error(
          "Error -> getLifestyleMasters() function returned error." +
            JSON.stringify(err)
        );
      });
  }

  getLifestyles(IN_user_id, IN_relative_id) {
    let sql = `SELECT lifestyle_id, user_id, relative_id, smoking_id, alcohol_id, excercise_id,
    activity_level_id, profession_id, food_id, heat_id FROM ehr_lifestyle WHERE user_id = ${IN_user_id} AND relative_id = ${IN_relative_id}`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let lifestyleData = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          lifestyleData.push({
            lifestyle_id: res.rows.item(i).lifestyle_id,
            user_id: res.rows.item(i).user_id,
            relative_id: res.rows.item(i).relative_id,
            smoking_id: res.rows.item(i).smoking_id,
            alcohol_id: res.rows.item(i).alcohol_id,
            excercise_id: res.rows.item(i).excercise_id,
            activity_level_id: res.rows.item(i).activity_level_id,
            profession_id: res.rows.item(i).profession_id,
            food_id: res.rows.item(i).food_id,
            heat_id: res.rows.item(i).heat_id,
          });
        }
      }
      return lifestyleData;
    });
  }

  getProfileDetails(IN_user_id) {
    let sql = `SELECT * FROM d_user WHERE user_id = ${IN_user_id}`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let profileDetails = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          profileDetails.push({
            name: res.rows.item(i).name,
            phone: res.rows.item(i).phone,
            email: res.rows.item(i).email,
            gender_id: res.rows.item(i).gender_id,
            dob: res.rows.item(i).dob,
            blood_group_id: res.rows.item(i).blood_group_id,
            marital_status_id: res.rows.item(i).marital_status_id,
            height: res.rows.item(i).height,
            weight: res.rows.item(i).weight,
          });
        }
      }
      return profileDetails;
    });
  }

  getProfileRelatedMasters() {
    let profileRelatedMasters = [];
    let sql = `SELECT blood_group_id AS id, name AS name, 'blood_group' as master_type from m_blood_group WHERE is_active = 1
    Union
    SELECT marital_status_id AS id, name AS name, 'marital_status' as master_type from m_marital_status WHERE is_active = 1
    Union
    SELECT gender_id AS id, name AS name, 'gender' as master_type from m_gender WHERE is_active = 1`;
    return this.dbObject
      .executeSql(sql, [])
      .then((data) => {
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            profileRelatedMasters.push({
              id: data.rows.item(i).id,
              name: data.rows.item(i).name,
              master_type: data.rows.item(i).master_type,
            });
          }
        }
        return profileRelatedMasters;
      })
      .catch((err) => {
        console.error(
          "Error -> getLifestyleMasters() function returned error." +
            JSON.stringify(err)
        );
      });
  }

  getProfilePhoto(IN_user_id) {
    let sql = `SELECT photo FROM du_photo WHERE user_id = ${IN_user_id} relative_id = 0`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let profilePhoto = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          profilePhoto.push({
            photo: res.rows.item(i).photo,
          });
        }
      }
      return profilePhoto;
    });
  }

  getVitalDetails(IN_user_id, IN_relative_id) {
    let sql = `SELECT * FROM ehr_vital WHERE user_id = ${IN_user_id} AND relative_id = ${IN_relative_id}`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let vitalDetails = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          vitalDetails.push({
            vitalId: res.rows.item(i).vitalId,
            temperature: res.rows.item(i).temperature,
            pulse: res.rows.item(i).pulse,
            resp_rate: res.rows.item(i).resp_rate,
            bp_systolic: res.rows.item(i).bp_systolic,
            bp_diastolic: res.rows.item(i).bp_diastolic,
          });
        }
      }
      return vitalDetails;
    });
  }

  getRelationsMasters() {
    let sql = `SELECT * FROM m_relation where is_active =1`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let relationsMasters = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          relationsMasters.push({
            relation_id: res.rows.item(i).relation_id,
            name: res.rows.item(i).name,
          });
        }
      }
      return relationsMasters;
    });
  }

  getFilesMasters() {
    let sql = `SELECT * FROM m_file_type where is_active =1`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let filesMasters = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          filesMasters.push({
            file_type_id: res.rows.item(i).file_type_id,
            name: res.rows.item(i).name,
            icon: res.rows.item(i).icon,
          });
        }
      }
      return filesMasters;
    });
  }

  getFiles(IN_user_id, IN_relative_id) {
    let sql = `SELECT f.file_id, f.relative_id, f.file_type_id, f.file_date, f.file_blob AS photo, mf.name FROM ehr_file f LEFT JOIN m_file_type mf ON f.file_type_id = mf.file_type_id WHERE f.user_id = ${IN_user_id} AND relative_id = ${IN_relative_id}`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let files = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          files.push({
            file_id: res.rows.item(i).file_id,
            relative_id: res.rows.item(i).relative_id,
            file_type_id: res.rows.item(i).file_type_id,
            file_date: res.rows.item(i).file_date,
            photo: res.rows.item(i).photo,
            name: res.rows.item(i).name,
          });
        }
      }
      return files;
    });
  }

  getMedicalHistoryMasters() {
    let medicalHistoryMasterData = [];
    let sql = `SELECT allergy_id as id, name, 'table_allergy' as master_type FROM m_allergy where is_active = 1 
    UNION ALL
  SELECT current_medication_id as id, name, 'table_current_medication' as master_type FROM m_current_medication where is_active =1
    UNION ALL
  SELECT post_medication_id as id, name, 'table_post_medication' as master_type FROM m_post_medication where is_active =1
    UNION ALL
  SELECT surgery_id as id, name, 'table_surgery' as master_type FROM m_surgery where is_active =1
    UNION ALL
  SELECT injury_id as id, name, 'table_injury' as master_type FROM m_injury where is_active =1
    UNION ALL
  SELECT disease_id as id, name, 'table_disease' as master_type FROM m_disease where is_active =1
    UNION ALL
  SELECT relation_id as id, name, 'table_relation' as master_type FROM m_relation where is_active =1`;
    return this.dbObject
      .executeSql(sql, [])
      .then((data) => {
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            medicalHistoryMasterData.push({
              id: data.rows.item(i).id,
              name: data.rows.item(i).name,
              master_type: data.rows.item(i).master_type,
            });
          }
        }
        return medicalHistoryMasterData;
      })
      .catch((err) => {
        console.error(
          "Error -> getMedicalHistoryMasters() function returned error." +
            JSON.stringify(err)
        );
      });
  }

  getAllergiesData(IN_user_id, IN_relative_id) {
    let sql = `SELECT ea.allergy_id, ma.name FROM ehr_allergy ea
    LEFT JOIN m_allergy ma ON ea.allergy_id = ma.allergy_id
    WHERE user_id = ${IN_user_id} AND relative_id = ${IN_relative_id}`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let allergiesData = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          allergiesData.push({
            allergy_id: res.rows.item(i).allergy_id,
            name: res.rows.item(i).name,
          });
        }
      }
      return allergiesData;
    });
  }

  getCurrentMedicationsData(IN_user_id, IN_relative_id) {
    let sql = `SELECT em.medication_id, m.name FROM ehr_current_medication em
    LEFT JOIN m_current_medication m ON em.medication_id = m.current_medication_id
    where user_id = ${IN_user_id} AND relative_id = ${IN_relative_id}`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let currentMedicationsData = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          currentMedicationsData.push({
            medication_id: res.rows.item(i).medication_id,
            name: res.rows.item(i).name,
          });
        }
      }
      return currentMedicationsData;
    });
  }

  getPostMedicationsData(IN_user_id, IN_relative_id) {
    let sql = `SELECT em.medication_id, m.name FROM ehr_post_medication em
    LEFT JOIN m_post_medication m ON em.medication_id = m.post_medication_id
    where user_id = ${IN_user_id} AND relative_id = ${IN_relative_id}`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let postMedicationsData = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          postMedicationsData.push({
            medication_id: res.rows.item(i).medication_id,
            name: res.rows.item(i).name,
          });
        }
      }
      return postMedicationsData;
    });
  }

  getSurgeriesData(IN_user_id, IN_relative_id) {
    let sql = `SELECT es.surgery_id, m.name FROM ehr_surgery es
    LEFT JOIN m_surgery m ON es.surgery_id = m.surgery_id
    WHERE user_id = ${IN_user_id} AND relative_id = ${IN_relative_id}`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let surgeriesData = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          surgeriesData.push({
            surgery_id: res.rows.item(i).surgery_id,
            name: res.rows.item(i).name,
          });
        }
      }
      return surgeriesData;
    });
  }

  getInjuriesData(IN_user_id, IN_relative_id) {
    let sql = `SELECT ei.injury_id, m.name FROM ehr_injury ei
    LEFT JOIN m_injury m ON ei.injury_id = m.injury_id
    WHERE user_id = ${IN_user_id} AND relative_id = ${IN_relative_id}`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let injuriesData = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          injuriesData.push({
            injury_id: res.rows.item(i).injury_id,
            name: res.rows.item(i).name,
          });
        }
      }
      return injuriesData;
    });
  }

  getDiseasesData(IN_user_id, IN_relative_id) {
    let sql = `SELECT ec.disease_id, m.name FROM ehr_chronic ec
    LEFT JOIN m_disease m ON ec.disease_id = m.disease_id
    WHERE user_id = ${IN_user_id} AND relative_id = ${IN_relative_id}`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let diseasesData = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          diseasesData.push({
            disease_id: res.rows.item(i).disease_id,
            name: res.rows.item(i).name,
          });
        }
      }
      return diseasesData;
    });
  }

  getRelationsMedicalHistoryData(IN_user_id, IN_relative_id) {
    let sql = `SELECT efh.relative_id, efh.relation_id, efh.disease_id, md.name as diseaseName, mr.name as relationName
    FROM ehr_family_history efh
    LEFT JOIN m_disease md ON efh.disease_id = md.disease_id
    LEFT JOIN m_relation mr ON efh.relation_id = mr.relation_id
    WHERE efh.user_id = ${IN_user_id} AND efh.relative_id = ${IN_relative_id}`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let relationsMedicalHistoryData = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          relationsMedicalHistoryData.push({
            relative_id: res.rows.item(i).relative_id,
            relation_id: res.rows.item(i).relation_id,
            disease_id: res.rows.item(i).disease_id,
            diseaseName: res.rows.item(i).diseaseName,
            relationName: res.rows.item(i).relationName,
          });
        }
      }
      return relationsMedicalHistoryData;
    });
  }

  getUserAppointments(IN_user_id) {
    let sql = `SELECT a.appointment_id,a.user_id,a.relative_id,a.doctor_id, a.mode_id, a.appointment_at,a.amount_paid,a.appointment_status,
    u.username,d.name AS doctorName,d.username AS doctorUserame, c.is_recurring, c.recurring_freq, c.severity_id, c.complaint_description, dp.photo, ms.name as specialisation
    FROM d_appointment a
    LEFT JOIN d_user u ON a.user_id = u.user_id
    LEFT JOIN d_doctor d ON a.doctor_id = d.id
    LEFT JOIN da_complaint_detail c ON a.appointment_id = c.appointment_id
   LEFT JOIN dd_photo dp ON dp.doctor_id = a.doctor_id
   LEFT JOIN m_specialisation ms ON ms.id = a.doctor_id
     where a.user_id = ${IN_user_id}`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let appointmentsData = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          appointmentsData.push({
            appointment_id: res.rows.item(i).appointment_id,
            user_id: res.rows.item(i).user_id,
            relative_id: res.rows.item(i).relative_id,
            doctor_id: res.rows.item(i).doctor_id,
            mode_id: res.rows.item(i).mode_id,
            appointment_at: res.rows.item(i).appointment_at,
            amount_paid: res.rows.item(i).amount_paid,
            appointment_status: res.rows.item(i).appointment_status,
            username: res.rows.item(i).username,
            doctorName: res.rows.item(i).doctorName,
            doctorUserame: res.rows.item(i).doctorUserame,
            is_recurring: res.rows.item(i).is_recurring,
            recurring_freq: res.rows.item(i).recurring_freq,
            severity_id: res.rows.item(i).severity_id,
            complaint_description: res.rows.item(i).complaint_description,
            photo: res.rows.item(i).photo,
            specialisation: res.rows.item(i).specialisation,
          });
        }
      }
      return appointmentsData;
    });
  }

  getDoctorsKits(IN_userId, IN_doctorId) {
    let sql;
    if (IN_doctorId == 0) {
      sql = `SELECT d.kit_id, d.doctor_id, d.description, d.name, d.price, p.photo FROM dd_kit d
      LEFT JOIN dk_photo p ON d.kit_id = p.kit_id
      where d.doctor_id IN (SELECT concat(doctor_id) FROM du_doctor where user_id=${IN_userId})`;
    } else {
      sql = `SELECT d.kit_id, d.doctor_id, d.description, d.name, d.price, p.photo FROM dd_kit d
      LEFT JOIN dk_photo p ON d.kit_id = p.kit_id
      where d.doctor_id = ${IN_doctorId}`;
    }

    return this.dbObject.executeSql(sql, []).then((res) => {
      let kitsData = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          kitsData.push({
            kit_id: res.rows.item(i).kit_id,
            doctor_id: res.rows.item(i).doctor_id,
            description: res.rows.item(i).description,
            name: res.rows.item(i).name,
            price: res.rows.item(i).price,
            photo: res.rows.item(i).photo,
          });
        }
      }
      return kitsData;
    });
  }

  getOrderedKits(IN_userId, IN_doctorId) {
    let sql;
    if (IN_doctorId == 0) {
      sql = `SELECT o.kit_id, o.created_at, k.name, k.description, k.price, p.photo FROM dk_order o
      LEFT JOIN dd_kit k ON o.kit_id = k.kit_id
      LEFT JOIN dk_photo p ON o.kit_id = p.kit_id
      WHERE user_id=${IN_userId}`;
    } else {
      sql = `SELECT o.kit_id, o.created_at, k.name, k.description, k.price, p.photo FROM dk_order o
      LEFT JOIN dd_kit k ON o.kit_id = k.kit_id
      LEFT JOIN dk_photo p ON o.kit_id = p.kit_id
      WHERE o.doctor_id = ${IN_doctorId} AND o.user_id=${IN_userId}`;
    }

    return this.dbObject.executeSql(sql, []).then((res) => {
      let orderedKitsData = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          orderedKitsData.push({
            kit_id: res.rows.item(i).kit_id,
            created_at: res.rows.item(i).created_at,
            description: res.rows.item(i).description,
            name: res.rows.item(i).name,
            price: res.rows.item(i).price,
            photo: res.rows.item(i).photo,
          });
        }
      }
      return orderedKitsData;
    });
  }

  getUserRelatives(IN_user_id) {
    let sql = `SELECT * FROM du_relative WHERE user_id = ${IN_user_id}`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let relativesData = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          relativesData.push({
            user_id: res.rows.item(i).user_id,
            relative_id: res.rows.item(i).relative_id,
            relative_name: res.rows.item(i).relative_name,
            photo: res.rows.item(i).photo,
          });
        }
      }
      return relativesData;
    });
  }

  getIssues() {
    let sql = `SELECT * FROM homeotel.m_issue where is_active =1`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let issuesData = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          issuesData.push({
            id: res.rows.item(i).id,
            name: res.rows.item(i).name,
          });
        }
      }
      return issuesData;
    });
  }
}
