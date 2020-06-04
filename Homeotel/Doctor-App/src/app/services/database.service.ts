import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { SQLitePorter } from "@ionic-native/sqlite-porter/ngx";
import { Platform } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { UtilitiesService } from "./utilities.service";
import { CommonService } from "./common.service";

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
    private utilities: UtilitiesService,
    private commonService: CommonService
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

  // doctor related functions
  getTotalNetAmount(IN_doctor_id) {
    let sql = `select (SELECT case when sum(net_amount) is null then 0 else sum(net_amount) end as debit FROM d_transaction where transaction_type_id in (1, 3) and doctor_id = IN_doctor_id) - (SELECT case when sum(net_amount) is null then 0 else sum(net_amount) end as debit FROM d_transaction where transaction_type_id in (2, 4) and doctor_id = ${IN_doctor_id})as total_net_amount;`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let totalNetAmount;
      console.log(res);
      if (res.rows.length > 0) {
        totalNetAmount = res.rows.item(0).total_net_amount;
      }
      return totalNetAmount;
    });
  }

  getPayments(IN_doctor_id) {
    let sql = `SELECT dt.*,case when dt.kit_id is null then 'appointment' else 'kit' end as 'transaction_for' , dk.name as kit_name, du.name as user_name , m.name as mode_name , da.relative_id , dr.relative_name FROM d_transaction dt
    left join dd_kit dk on dt.kit_id = dk.kit_id and dt.doctor_id = dk.doctor_id
    left join d_user du on du.user_id = dt.user_id
    left join d_appointment da on da.appointment_id = dt.appointment_id
    left join m_mode m on da.mode_id = m.mode_id
    left join du_relative dr on dr.relative_id = da.relative_id
    where dt.doctor_id= ${IN_doctor_id}`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      var transactionType;
      let payments = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          if (res.rows.item(i).transaction_for == "kit") {
            transactionType = res.rows.item(i).kit_name;
          } else {
            transactionType = res.rows.item(i).mode_name;
          }
          payments.push({
            displayName: res.rows.item(i).user_name,
            transactionType: transactionType,
            transactionDate: res.rows.item(i).transaction_at,
            transactionTypeId: res.rows.item(i).transaction_type_id,
            netAmount: res.rows.item(i).net_amount.toFixed(2),
          });
        }
      }
      return payments;
    });
  }

  getDoctorPreviousConsultations(IN_doctor_id) {
    let sql = `SELECT d.user_id,du.name as user_name,d.relative_id ,r.relative_name ,d.appointment_at,dc.name as doctor_name,m.name as mode  , p.photo FROM d_appointment d
    left join d_user du on du.user_id=d.user_id
    left join d_doctor dc on dc.id = d.doctor_id
    left join m_mode m on d.mode_id = m.mode_id
    left join du_relative r on d.relative_id = r.relative_id and d.user_id = r.user_id
    left join du_photo p on d.relative_id = p.relative_id and d.user_id = p.user_id
    where doctor_id= ${IN_doctor_id} and appointment_status=1`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let doctorPreviousConsultations = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          var displayName;
          if (res.rows.item(i).relative_id == 0) {
            displayName = res.rows.item(i).user_name;
          } else {
            displayName = res.rows.item(i).relative_name;
          }
          doctorPreviousConsultations.push({
            userId: res.rows.item(i).user_id,
            relativeId: res.rows.item(i).relative_id,
            displayName: displayName,
            appointmentAt: res.rows.item(i).appointment_at,
            doctorName: res.rows.item(i).doctor_name,
            byName: res.rows.item(i).user_name,
            mode: res.rows.item(i).mode,
            photo: res.rows.item(i).photo,
          });
        }
      }
      return doctorPreviousConsultations;
    });
  }

  getUserConsultationDetails(IN_doctor_id, IN_user_id, IN_relative_id) {
    let sql = `SELECT d.user_id,du.name as user_name,d.relative_id ,r.relative_name ,d.appointment_at,dc.name as doctor_name,m.name as mode FROM d_appointment d
    left join d_user du on du.user_id=d.user_id
    left join d_doctor dc on dc.id = d.doctor_id
    left join m_mode m on d.mode_id = m.mode_id
    left join du_relative r on d.relative_id = r.relative_id and d.user_id = r.user_id
    where d.doctor_id= ${IN_doctor_id} and d.appointment_status=1 and d.user_id = ${IN_user_id} and d.relative_id= ${IN_relative_id}`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let userConsultationDetails = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          var displayName;
          if (res.rows.item(i).relative_id == 0) {
            displayName = res.rows.item(i).user_name;
          } else {
            displayName = res.rows.item(i).relative_name;
          }
          userConsultationDetails.push({
            userId: res.rows.item(i).user_id,
            relativeId: res.rows.item(i).relative_id,
            displayName: displayName,
            appointmentAt: res.rows.item(i).appointment_at,
            doctorName: res.rows.item(i).doctor_name,
            byName: `by ${res.rows.item(i).user_name}`,
            mode: res.rows.item(i).mode,
          });
        }
      }
      return userConsultationDetails;
    });
  }

  getUserComplaints(IN_doctor_id, IN_user_id, IN_relative_id) {
    let sql = `SELECT main_complaint, advice,review_date FROM d_appointment d
    where doctor_id= ${IN_doctor_id} and user_id = ${IN_user_id} and relative_id= ${IN_relative_id}`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let userComplaints = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          userComplaints.push({
            main_complaint: res.rows.item(i).main_complaint,
            relativeId: res.rows.item(i).relative_id,
            advice: res.rows.item(i).advice,
            review_date: res.rows.item(i).review_date,
          });
        }
      }
      return userComplaints;
    });
  }

  getUserComplaintDetails(IN_doctor_id, IN_user_id, IN_relative_id) {
    let sql = `SELECT case when is_recurring=1 then 'yes' else 'no' end as recurring ,recurring_freq,m.name as severity
    ,complaint_description FROM da_complaint_detail d
   left join m_severity m on m.severity_id = d.severity_id
   where doctor_id= ${IN_doctor_id} and user_id = ${IN_user_id} and relative_id= ${IN_relative_id}`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let userComplaintDetails = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          userComplaintDetails.push({
            recurring: res.rows.item(i).recurring,
            recurring_freq: res.rows.item(i).recurring_freq,
            complaint_description: res.rows.item(i).complaint_description,
          });
        }
      }
      return userComplaintDetails;
    });
  }

  getUserDiagnosis(IN_doctor_id, IN_user_id, IN_relative_id) {
    let sql = `SELECT d.other_diagnosis ,m.name as diagnosis FROM da_diagnosis d
    left join m_diagnosis m on d.diagnosis_id = m.diagnosis_id
    where doctor_id= ${IN_doctor_id} and user_id = ${IN_user_id} and relative_id= ${IN_relative_id}`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let userDiagnosis = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          userDiagnosis.push({
            diagnosis: res.rows.item(i).diagnosis,
            other_diagnosis: res.rows.item(i).other_diagnosis,
          });
        }
      }
      return userDiagnosis;
    });
  }

  getUserPrescription(IN_doctor_id, IN_user_id, IN_relative_id) {
    let sql = `SELECT m.name as drug,s.name as scale,p.name as potency,ds.name as dosage,f.name as freq,i.name as inst
    ,no_of_days FROM da_prescription d
    left join m_drugs m on d.drug_id=m.drug_id
    left join m_scale s on d.scale_id = s.scale_id
    left join m_potency p on d.potency_id = p.potency_id
    left join m_dosage ds on ds.dosage_id = d.dosage_id
    left join m_freq f on f.freq_id = d.freq_id
    left join m_instruction i on i.instruction_id = d.instruction_id
    where doctor_id= ${IN_doctor_id} and user_id = ${IN_user_id} and relative_id= ${IN_relative_id}`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let userPrescription = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          userPrescription.push({
            drug: res.rows.item(i).drug,
            freq: res.rows.item(i).freq,
            no_of_days: res.rows.item(i).no_of_days,
          });
        }
      }
      return userPrescription;
    });
  }

  getIssues() {
    let sql = `SELECT * FROM m_issue where is_active =1`;

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

  getDoctorHomeoKits(IN_doctor_id) {
    let sql = `SELECT dk.* , dp.photo FROM dd_kit dk
    left join dk_photo dp on dk.kit_id = dp.kit_id and dk.doctor_id = dp.doctor_id where dk.doctor_id = ${IN_doctor_id}`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let doctorHomeoKits = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          doctorHomeoKits.push({
            id: res.rows.item(i).kit_id,
            name: res.rows.item(i).name,
            description: res.rows.item(i).description,
            price: res.rows.item(i).price,
            photo: res.rows.item(i).photo,
          });
        }
      }
      return doctorHomeoKits;
    });
  }

  getDoctorHomeoOrders(IN_doctor_id) {
    let sql = `SELECT o.doctor_id ,  u.name as 'user_name', k.name as 'kit_name' ,o.amount_paid , o.created_at , dp.photo FROM dk_order o
    left join d_user u on o.user_id= u.user_id
    left join dd_kit k on k.kit_id = o.kit_id 
    left join dk_photo dp on k.kit_id = dp.kit_id and k.doctor_id = o.doctor_id where o.doctor_id = ${IN_doctor_id}`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let doctorHomeoOrders = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          doctorHomeoOrders.push({
            userName: res.rows.item(i).user_name,
            kitName: res.rows.item(i).kit_name,
            amountPaid: res.rows.item(i).amount_paid,
            orderDate: res.rows.item(i).created_at,
            photo: res.rows.item(i).photo,
          });
        }
      }
      return doctorHomeoOrders;
    });
  }

  getKitDetail(IN_doctor_id, IN_kit_id) {
    let sql = `SELECT * FROM dd_kit d
    left join dk_photo dp on d.kit_id = dp.kit_id where d.doctor_id = ${IN_doctor_id} and d.kit_id = ${IN_kit_id}`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let kitDetail = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          kitDetail.push({
            description: res.rows.item(i).description,
            name: res.rows.item(i).name,
            price: res.rows.item(i).price,
            photo: res.rows.item(i).photo,
          });
        }
      }
      return kitDetail;
    });
  }

  getScheduledUpcomingAppointments(IN_doctor_id) {
    let sql = `SELECT d.appointment_id ,d.user_id,du.name as user_name,d.relative_id ,r.relative_name ,d.appointment_at,dc.name as doctor_name,m.name as mode FROM d_appointment d
    left join d_user du on du.user_id=d.user_id
    left join d_doctor dc on dc.id = d.doctor_id
    left join m_mode m on d.mode_id = m.mode_id
    left join du_relative r on d.relative_id = r.relative_id and d.user_id = r.user_id
    where doctor_id= ${IN_doctor_id} and appointment_status=0`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let scheduledUpcomingAppointments = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          var displayName;
          if (res.rows.item(i).relative_id == 0) {
            displayName = res.rows.item(i).user_name;
          } else {
            displayName = res.rows.item(i).relative_name;
          }
          scheduledUpcomingAppointments.push({
            userId: res.rows.item(i).user_id,
            relativeId: res.rows.item(i).relative_id,
            displayName: displayName,
            appointmentAt: res.rows.item(i).appointment_at,
            appointmentId: res.rows.item(i).appointment_id,
            doctorName: res.rows.item(i).doctor_name,
            byName: res.rows.item(i).user_name,
            mode: res.rows.item(i).mode,
            photo: res.rows.item(i).photo,
          });
        }
      }
      return scheduledUpcomingAppointments;
    });
  }

  getScheduledPreviousAppointments(IN_doctor_id) {
    let sql = `SELECT d.user_id,du.name as user_name,d.relative_id ,r.relative_name ,d.appointment_at,dc.name as doctor_name,m.name as mode FROM d_appointment d
    left join d_user du on du.user_id=d.user_id
    left join d_doctor dc on dc.id = d.doctor_id
    left join m_mode m on d.mode_id = m.mode_id
    left join du_relative r on d.relative_id = r.relative_id and d.user_id = r.user_id
    where doctor_id= ${IN_doctor_id} and appointment_status=1`;
    return this.dbObject.executeSql(sql, []).then((res) => {
      let scheduledPreviousAppointments = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          var displayName;
          if (res.rows.item(i).relative_id == 0) {
            displayName = res.rows.item(i).user_name;
          } else {
            displayName = res.rows.item(i).relative_name;
          }
          scheduledPreviousAppointments.push({
            userId: res.rows.item(i).user_id,
            relativeId: res.rows.item(i).relative_id,
            displayName: displayName,
            appointmentAt: res.rows.item(i).appointment_at,
            doctorName: res.rows.item(i).doctor_name,
            byName: res.rows.item(i).user_name,
            mode: res.rows.item(i).mode,
            photo: res.rows.item(i).photo,
          });
        }
      }
      return scheduledPreviousAppointments;
    });
  }

  getUserVitals(IN_user_id, IN_relative_id) {
    let sql = `SELECT * FROM ehr_vital where user_id = ${IN_user_id} and relative_id = ${IN_relative_id}`;
    return this.dbObject.executeSql(sql, []).then((res) => {
      let userVitals = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          userVitals.push({
            date: res.rows.item(i).created_at,
            temparature: res.rows.item(i).temperature,
            pulseRate: res.rows.item(i).pulse,
            respirationRate: res.rows.item(i).resp_rate,
            bloodPressure: `${res.rows.item(i).bp_systolic}/${
              res.rows.item(i).bp_diastolic
            }`,
          });
        }
      }
      return userVitals;
    });
  }

  getUserAllergies(IN_user_id, IN_relative_id) {
    let sql = `SELECT Group_concat(m.name) as allergy FROM ehr_allergy e left join m_allergy m on m.allergy_id = e.allergy_id
    where e.user_id = ${IN_user_id} and e.relative_id = ${IN_relative_id}
    group by e.user_id and e.relative_id`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let userAllergies;
      console.log(res);
      if (res.rows.length > 0) {
        userAllergies = res.rows.item(0).allergy;
      }
      return userAllergies;
    });
  }

  getUserCurrentMedication(IN_user_id, IN_relative_id) {
    let sql = `SELECT Group_concat(m.name) as current_medication FROM ehr_current_medication e left join m_medication m on m.medication_id = e.medication_id
    where user_id = ${IN_user_id} and relative_id = ${IN_relative_id}
    group by e.user_id and e.relative_id;`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let userCurrentMedication;
      console.log(res);
      if (res.rows.length > 0) {
        userCurrentMedication = res.rows.item(0).current_medication;
      }
      return userCurrentMedication;
    });
  }

  getUserPastMedication(IN_user_id, IN_relative_id) {
    let sql = `SELECT Group_concat(m.name) as past_medication FROM ehr_past_medication e left join m_medication m on m.medication_id = e.medication_id
    where user_id = ${IN_user_id} and relative_id = ${IN_relative_id}
    group by e.user_id and e.relative_id;`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let userPastMedication;
      console.log(res);
      if (res.rows.length > 0) {
        userPastMedication = res.rows.item(0).past_medication;
      }
      return userPastMedication;
    });
  }

  getUserSurgeries(IN_user_id, IN_relative_id) {
    let sql = `SELECT Group_concat(m.name) as surgery FROM ehr_surgery e left join m_surgery m on m.surgery_id = e.surgery_id
    where user_id = ${IN_user_id} and relative_id = ${IN_relative_id}
    group by e.user_id and e.relative_id;`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let userSurgeries;
      console.log(res);
      if (res.rows.length > 0) {
        userSurgeries = res.rows.item(0).surgery;
      }
      return userSurgeries;
    });
  }

  getUserInjuries(IN_user_id, IN_relative_id) {
    let sql = `SELECT Group_concat(m.name)  as injury FROM ehr_injury e left join m_injury m on m.injury_id = e.injury_id
    where user_id = ${IN_user_id} and relative_id = ${IN_relative_id}
    group by e.user_id and e.relative_id;`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let userInjuries;
      console.log(res);
      if (res.rows.length > 0) {
        userInjuries = res.rows.item(0).injury;
      }
      return userInjuries;
    });
  }

  getUserChronics(IN_user_id, IN_relative_id) {
    let sql = `SELECT Group_concat(m.name) as chronic FROM ehr_chronic e left join m_chronic m on m.chronic_id = e.disease_id
    where user_id = ${IN_user_id} and relative_id = ${IN_relative_id}
    group by e.user_id and e.relative_id ;`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let userChronics;
      console.log(res);
      if (res.rows.length > 0) {
        userChronics = res.rows.item(0).chronic;
      }
      return userChronics;
    });
  }

  getUserLifeStyles(IN_user_id, IN_relative_id) {
    let sql = `SELECT e.user_id,e.relative_id, ms.name as 'smoking',ma.name 'alcohol',me.name as 'exercise' ,
    mac.name as 'activity',mp.name as 'profession'  , Group_concat(mf.name) as food_name FROM ehr_lifestyle e
   left join m_smoking ms on ms.smoking_id=e.smoking_id
   left join m_alcohol ma on ma.alcohol_id=e.alcohol_id
   left join m_exercise me on me.exercise_id=e.excercise_id
   left join m_activity_level mac on mac.activity_level_id=e.activity_level_id
   left join m_profession mp on mp.profession_id=e.profession_id
   left join ehr_lifestyle_food l on e.user_id = l.user_id and l.relative_id and e.user_id
   left join m_food mf on mf.food_id = l.food_id
   where e.user_id = ${IN_user_id} and e.relative_id = ${IN_relative_id}
   group by e.user_id and e.relative_id;`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let userLifeStyles = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          userLifeStyles.push({
            smoking: res.rows.item(i).smoking,
            alcohol: res.rows.item(i).alcohol,
            exercise: res.rows.item(i).exercise,
            activityLevel: res.rows.item(i).activity,
            profession: res.rows.item(i).profession,
            foodPreferences: res.rows.item(i).food_name,
          });
        }
      }
      return userLifeStyles;
    });
  }

  getUserFamilyHistories(IN_user_id, IN_relative_id) {
    let sql = `SELECT m.name as relation_name , Group_concat(md.name) as disease_name FROM ehr_family_history e left join m_relation m on m.relation_id = e.relation_id
    left join m_disease md on md.disease_id = e.disease_id
    where user_id = ${IN_user_id} and relative_id = ${IN_relative_id}
    group by e.relation_id;`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let userFamilyHistories = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          userFamilyHistories.push({
            relationName: res.rows.item(i).relation_name,
            diseaseName: res.rows.item(i).disease_name,
          });
        }
      }
      return userFamilyHistories;
    });
  }

  getUserFiles(IN_user_id, IN_relative_id) {
    let sql = `
    SELECT * FROM ehr_file e
    left join m_file_type m on m.file_type_id = e.file_type_id
    where e.user_id = ${IN_user_id} and e.relative_id = ${IN_relative_id};`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let userFiles = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          userFiles.push({
            fileId: res.rows.item(i).file_id,
            imageUrl: res.rows.item(i).file_blob,
            fileName: res.rows.item(i).name,
            date: res.rows.item(i).file_date,
          });
        }
      }
      return userFiles;
    });
  }

  getUserFileImage(IN_file_id) {
    let sql = `SELECT * FROM ehr_file e
    where file_id = ${IN_file_id};`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let fileImage;
      console.log(res);
      if (res.rows.length > 0) {
        fileImage = res.rows.item(0).file_blob;
      }
      return fileImage;
    });
  }

  getUserPreviousConsultations(IN_doctor_id, IN_user_id, IN_relative_id) {
    let sql = `
    SELECT d.user_id,du.name as user_name,d.relative_id ,r.relative_name ,d.appointment_at,dc.name as doctor_name,m.name as mode FROM d_appointment d
left join d_user du on du.user_id=d.user_id
left join d_doctor dc on dc.id = d.doctor_id
left join m_mode m on d.mode_id = m.mode_id
left join du_relative r on d.relative_id = r.relative_id and d.user_id = r.user_id
where d.doctor_id= ${IN_doctor_id} and d.user_id = ${IN_user_id} and d.relative_id = ${IN_relative_id} and d.appointment_status=1;`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let userPreviousConsultations = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          var displayName;
          if (res.rows.item(i).relative_id == 0) {
            displayName = res.rows.item(i).user_name;
          } else {
            displayName = res.rows.item(i).relative_name;
          }
          userPreviousConsultations.push({
            userId: res.rows.item(i).user_id,
            relativeId: res.rows.item(i).relative_id,
            displayName: displayName,
            appointmentAt: res.rows.item(i).appointment_at,
            doctorName: res.rows.item(i).doctor_name,
            byName: res.rows.item(i).user_name,
            mode: res.rows.item(i).mode,
            photo: res.rows.item(i).photo,
          });
        }
      }
      return userPreviousConsultations;
    });
  }
  getTodayUpcomingConsultations(IN_doctor_id) {
    let sql = `
    SELECT d.user_id,du.name as user_name,d.relative_id ,r.relative_name ,d.appointment_at,dc.name as doctor_name,m.name as mode , p.photo FROM d_appointment d
left join d_user du on du.user_id=d.user_id
left join d_doctor dc on dc.id = d.doctor_id
left join m_mode m on d.mode_id = m.mode_id
left join du_relative r on d.relative_id = r.relative_id and d.user_id = r.user_id
left join du_photo p on d.relative_id = p.relative_id and d.user_id = p.user_id
where doctor_id= ${IN_doctor_id} and appointment_status=0 and date(appointment_at)=date(now());`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let todayUpcomingConsultations = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          var displayName;
          if (res.rows.item(i).relative_id == 0) {
            displayName = res.rows.item(i).user_name;
          } else {
            displayName = res.rows.item(i).relative_name;
          }
          todayUpcomingConsultations.push({
            userId: res.rows.item(i).user_id,
            relativeId: res.rows.item(i).relative_id,
            displayName: displayName,
            appointmentAt: res.rows.item(i).appointment_at,
            doctorName: res.rows.item(i).doctor_name,
            byName: res.rows.item(i).user_name,
            mode: res.rows.item(i).mode,
            photo: res.rows.item(i).photo,
          });
        }
      }
      return todayUpcomingConsultations;
    });
  }

  getTodayCompletedConsultations(IN_doctor_id) {
    let sql = `
    SELECT d.user_id,du.name as user_name,d.relative_id ,r.relative_name ,d.appointment_at,dc.name as doctor_name,m.name as mode , p.photo FROM d_appointment d
left join d_user du on du.user_id=d.user_id
left join d_doctor dc on dc.id = d.doctor_id
left join m_mode m on d.mode_id = m.mode_id
left join du_relative r on d.relative_id = r.relative_id and d.user_id = r.user_id
left join du_photo p on d.relative_id = p.relative_id and d.user_id = p.user_id
where doctor_id= ${IN_doctor_id} and appointment_status=1 and date(appointment_at)=date(now());`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let todayCompletedConsultations = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          var displayName;
          if (res.rows.item(i).relative_id == 0) {
            displayName = res.rows.item(i).user_name;
          } else {
            displayName = res.rows.item(i).relative_name;
          }
          todayCompletedConsultations.push({
            userId: res.rows.item(i).user_id,
            relativeId: res.rows.item(i).relative_id,
            displayName: displayName,
            appointmentAt: res.rows.item(i).appointment_at,
            doctorName: res.rows.item(i).doctor_name,
            byName: res.rows.item(i).user_name,
            mode: res.rows.item(i).mode,
            photo: res.rows.item(i).photo,
          });
        }
      }
      return todayCompletedConsultations;
    });
  }

  getAppointmentDetails(IN_appointment_id) {
    let sql = `
    SELECT d.user_id,du.name as user_name,d.relative_id ,r.relative_name ,d.appointment_at,dc.name as doctor_name,m.name as mode ,d.main_complaint FROM d_appointment d
    left join d_user du on du.user_id=d.user_id
    left join d_doctor dc on dc.id = d.doctor_id
    left join m_mode m on d.mode_id = m.mode_id
    left join du_relative r on d.relative_id = r.relative_id and d.user_id = r.user_id
    where d.appointment_id= ${IN_appointment_id} and d.appointment_status=0 `;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let appointmentDetails = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          var displayName;
          if (res.rows.item(i).relative_id == 0) {
            displayName = res.rows.item(i).user_name;
          } else {
            displayName = res.rows.item(i).relative_name;
          }

          this.commonService.currentUserId = res.rows.item(i).user_id;
          this.commonService.currentRelativeId = res.rows.item(i).relative_id;
          appointmentDetails.push({
            userId: res.rows.item(i).user_id,
            relativeId: res.rows.item(i).relative_id,
            displayName: `For ${displayName}`,
            appointmentAt: res.rows.item(i).appointment_at,
            doctorName: ` Dr ${res.rows.item(i).doctor_name}`,
            byName: `by ${res.rows.item(i).user_name}`,
            mode: res.rows.item(i).mode,
            mainComplaint: res.rows.item(i).main_complaint,
          });
        }
      }
      return appointmentDetails;
    });
  }

  getAppointmentComplaintDetails(IN_appointment_id) {
    let sql = `
    SELECT case when is_recurring=1 then 'yes' else 'no' end as recurring ,recurring_freq,m.name as severity
 ,complaint_description FROM da_complaint_detail d
left join m_severity m on m.severity_id = d.severity_id
where d.appointment_id= ${IN_appointment_id};`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let complaintDetails = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          complaintDetails.push({
            recurring: res.rows.item(i).recurring,
            recurring_freq: res.rows.item(i).recurring_freq,
            complaint_description: res.rows.item(i).complaint_description,
          });
        }
      }
      return complaintDetails;
    });
  }

  getDiagnosisData(IN_appointment_id) {
    let sql = `
    SELECT da.advice,da.review_date  , dd.* , m.* FROM d_appointment da
left join da_diagnosis dd on da.appointment_id = dd.appointment_id
left join m_diagnosis m on m.diagnosis_id = dd.diagnosis_id
where da.appointment_id= ${IN_appointment_id};`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let diagnosisData = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          diagnosisData.push({
            name: res.rows.item(i).name,
            diagnosis_id: res.rows.item(i).diagnosis_id,
            advice: res.rows.item(i).advice,
            review_date: res.rows.item(i).review_date,
          });
        }
      }
      return diagnosisData;
    });
  }

  getPrescriptionData(IN_appointment_id) {
    let sql = `
    SELECT dp.* , m.name as drug_name FROM da_prescription dp
left join m_drugs m on m.drug_id = dp.drug_id where appointment_id = ${IN_appointment_id}`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let precriptionData = [];
      this.commonService.currentDrugs = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          this.commonService.currentDrugs.push(res.rows.item(i).drug_id);
          precriptionData.push({
            drug_name: res.rows.item(i).drug_name,
            drug_id: res.rows.item(i).drug_id,
            no_of_days: res.rows.item(i).no_of_days,
          });
        }
      }
      return precriptionData;
    });
  }

  getDiagnosisMasters() {
    let sql = `
    SELECT *  FROM m_diagnosis where is_active =1`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let diagnosisMasters = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          diagnosisMasters.push({
            id: res.rows.item(i).id,
            name: res.rows.item(i).name,
          });
        }
      }
      return diagnosisMasters;
    });
  }

  getPotenciesMasters() {
    let sql = `
    SELECT * FROM m_potency where is_active = 1;`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let potenciesMasters = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          potenciesMasters.push({
            id: res.rows.item(i).id,
            name: res.rows.item(i).name,
          });
        }
      }
      return potenciesMasters;
    });
  }

  getPrecriptionMasters() {
    let sql = `
    SELECT * , 'drugs' as 'master_type' FROM m_drugs  where is_active =1
    union
    SELECT * , 'scale' as 'master_type' FROM m_scale  where is_active = 1
    union
    SELECT * , 'instruction' as 'master_type' FROM m_instruction where is_active = 1;`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let prescriptionMasters = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          prescriptionMasters.push({
            id: res.rows.item(i).id,
            name: res.rows.item(i).name,
            master_type: res.rows.item(i).master_type,
          });
        }
      }
      return prescriptionMasters;
    });
  }

  getDrugDetail(
    IN_appointment_id,
    IN_user_id,
    IN_relative_id,
    IN_doctor_id,
    IN_drug_id
  ) {
    let sql = `
    SELECT * FROM da_prescription
    where appointment_id = ${IN_appointment_id} and  
    user_id = ${IN_user_id} and  relative_id = ${IN_relative_id} 
    and  doctor_id= ${IN_doctor_id} and  drug_id = ${IN_drug_id};`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let drugDetails = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          drugDetails.push({
            drug_id: res.rows.item(i).drug_id,
            scale_id: res.rows.item(i).scale_id,
            potency_id: res.rows.item(i).potency_id,
            instruction_id: res.rows.item(i).instruction_id,
            no_of_days: res.rows.item(i).no_of_days,
          });
        }
      }
      return drugDetails;
    });
  }

  getDoctorProfileMasters() {
    let sql = `
    SELECT * ,'specialisation' as 'master_type' FROM m_specialisation where is_active =1
     union
     select *, 'gender' as'master_type'  from m_gender where is_active =1
     union
     SELECT * , 'qualification' as 'master_type' FROM m_qualification where is_active =1
     union
     SELECT * , 'certification' as 'master_type' FROM m_certification where is_active =1
     union
     SELECT * , 'award' as 'master_type' FROM m_award where is_active =1;`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let doctorProfileMasters = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          doctorProfileMasters.push({
            id: res.rows.item(i).id,
            name: res.rows.item(i).name,
            master_type: res.rows.item(i).master_type,
          });
        }
      }
      return doctorProfileMasters;
    });
  }

  getDoctorClinics(IN_doctor_id) {
    let sql = `SELECT * FROM dd_clinic c left join ddc_timing t on
    t.clinic_id = c.clinic_id and t.doctor_id = c.doctor_id where c.doctor_id = ${IN_doctor_id};`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let doctorClinics = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          doctorClinics.push({
            week_days: res.rows.item(i).week_days,
            clinic_name: res.rows.item(i).clinic_name,
            from_time: res.rows.item(i).from_time,
            to_time: res.rows.item(i).to_time,
            walkin_fee: res.rows.item(i).walkin_fee,
          });
        }
      }
      return doctorClinics;
    });
  }

  getDoctorProfessional(IN_doctor_id) {
    let sql = `
    SELECT * FROM dd_professional  where doctor_id = ${IN_doctor_id};`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let doctorProfessional = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          doctorProfessional.push({
            specialisation: res.rows.item(i).specialisation,
            experience: res.rows.item(i).experience,
            qualifications: res.rows.item(i).qualifications,
            certifications: res.rows.item(i).certifications,
          });
        }
      }
      return doctorProfessional;
    });
  }

  getDoctorModes(IN_doctor_id) {
    let sql = `
    SELECT * FROM dd_mode d left join
m_mode m on m.mode_id = d.mode_id where d.doctor_id = ${IN_doctor_id};`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let doctorModes = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          doctorModes.push({
            icon: res.rows.item(i).icon,
            mode_id: res.rows.item(i).mode_id,
            name: res.rows.item(i).name,
            price_per_min: res.rows.item(i).price_per_min,
            minimum_min: res.rows.item(i).minimum_min,
          });
        }
      }
      return doctorModes;
    });
  }

  getDoctorPersonalDetails(IN_doctor_id) {
    let sql = `
    SELECT d.* , p.photo FROM d_doctor d
    left join dd_photo  p on d.id = p.doctor_id where d.id = ${IN_doctor_id};`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let doctorPersonalDetails = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          doctorPersonalDetails.push({
            photo: res.rows.item(i).photo,
            name: res.rows.item(i).name,
            phone: res.rows.item(i).phone,
            email: res.rows.item(i).email,
            gender_id: res.rows.item(i).gender_id,
          });
        }
      }
      return doctorPersonalDetails;
    });
  }
  getGenderMasters() {
    let sql = `
    select *, 'gender' as'master_type'  from m_gender where is_active =1;`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let genderMasters = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          genderMasters.push({
            id: res.rows.item(i).gender_id,
            name: res.rows.item(i).name,
          });
        }
      }
      return genderMasters;
    });
  }

  getClinicDetails(IN_doctor_id, IN_clinic_id) {
    let sql = `SELECT * FROM dd_clinic c left join ddc_timing t on
    t.clinic_id = c.clinic_id and t.doctor_id = c.doctor_id where c.doctor_id = ${IN_doctor_id} and c.clinic_id = ${IN_clinic_id};`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let clinicDetails = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          clinicDetails.push({
            week_days: res.rows.item(i).week_days,
            clinic_name: res.rows.item(i).clinic_name,
            from_time: res.rows.item(i).from_time,
            to_time: res.rows.item(i).to_time,
            walkin_fee: res.rows.item(i).walkin_fee,
          });
        }
      }
      return clinicDetails;
    });
  }

  getModeDetails(IN_doctor_id, IN_mode_id) {
    let sql = `
    SELECT * FROM dd_mode d
    left join m_mode m on d.mode_id = m.mode_id
    where d.doctor_id = ${IN_doctor_id} and d.mode_id = ${IN_mode_id};`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let doctorModes = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          doctorModes.push({
            icon: res.rows.item(i).icon,
            mode_id: res.rows.item(i).mode_id,
            name: res.rows.item(i).name,
            price_per_min: res.rows.item(i).price_per_min,
            minimum_min: res.rows.item(i).minimum_min,
          });
        }
      }
      return doctorModes;
    });
  }

  getSlotConsultantMasters(IN_doctorId) {
    let sql = `
    SELECT name AS colOne, username AS colTwo, '' AS colThree, '' AS colFour,'doctorDetails' AS  master_type FROM d_doctor where id= ${IN_doctorId}
    UNION
    SELECT m.mode_id AS colOne, m.name AS colTwo, dm.minimum_min AS colThree, dm.price_per_min AS colFour,
    'modes' AS  master_type FROM m_mode m LEFT JOIN dd_mode dm ON m.mode_id = dm.mode_id where dm.doctor_id= ${IN_doctorId}
     UNION
     SELECT clinic_id AS colOne, week_days AS colTwo, from_time AS colThree, to_time AS colFour,
     'doctorSlotDetails' AS  master_type FROM ddc_timing where doctor_id= ${IN_doctorId};`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let slotConsultantMasters = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          slotConsultantMasters.push({
            colOne: res.rows.item(i).colOne,
            colTwo: res.rows.item(i).colTwo,
            colThree: res.rows.item(i).colThree,
            colFour: res.rows.item(i).colFour,
            master_type: res.rows.item(i).master_type,
          });
        }
      }
      return slotConsultantMasters;
    });
  }
  getSlotAppointmentAt(IN_doctorId) {
    let sql = `
    SELECT appointment_at FROM d_appointment WHERE doctor_id = ${IN_doctorId} AND appointment_status = 0;;`;

    return this.dbObject.executeSql(sql, []).then((res) => {
      let slotAppointmentAt = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          slotAppointmentAt.push({
            appointment_at: res.rows.item(i).appointment_at,
          });
        }
      }
      return slotAppointmentAt;
    });
  }
}
