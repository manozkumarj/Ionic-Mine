import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { SQLitePorter } from "@ionic-native/sqlite-porter/ngx";
import { Platform } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  dbObject: SQLiteObject;

  database_name: string = "bpscl_dev.db";

  table_users: string = "du_User";
  table_genders: string = "mp_Gender";
  table_ageUnits: string = "mp_AgeUnit";
  table_ageCategories: string = "mp_AgeCategory";
  table_religions: string = "mp_Religion";
  table_castes: string = "mp_Community";
  table_states: string = "m_State";
  table_districts: string = "m_District";
  table_mandals: string = "m_Mandal";
  table_villages: string = "m_Village";
  table_servicePoints: string = "mv_ServicePoint";
  table_sessionTypes: string = "mu_SessionType";
  table_sessionPeriod: string = "mu_SessionPeriod";
  table_saveSessionDetails: string = "du_Attendance";
  table_servicePointLog: string = "du_ServicePointLog";
  table_admins: string = "mv_VanDeviceApprove";
  table_beneficiaries: string = "dp_Registration";
  table_visits: string = "du_Visit";

  stateId: number = 21;
  status = {
    inActive: 0,
    active: 1
  };

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
      return this.sqlite
        .create({
          name: this.database_name,
          location: "default"
        })
        .then(async (db: SQLiteObject) => {
          this.dbObject = await db;
          console.log(
            "database - constructor - Success -> " + JSON.stringify(db)
          );
          return true;
        })
        .catch(error => {
          console.warn(
            "database - constructor - Error -> " + JSON.stringify(error)
          );
          return false;
        });
    });
  }

  seedSql() {
    return this.http
      .get("assets/sql.sql", { responseType: "text" })
      .toPromise()
      .then(sql => {
        this.sqlitePorter
          .importSqlToDb(this.dbObject, sql)
          .then(async res => {
            let getRes = await res;
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
    return this.createDb().then(async res => {
      let data = await res;
      let sql = "SELECT name FROM sqlite_master WHERE type='table' AND name=?";
      return this.dbObject
        .executeSql(sql, [this.table_users])
        .then(res => {
          console.log(
            "database - checkTable - Success -> " + JSON.stringify(res)
          );
          if (res.rows.length <= 0) {
            this.seedSql().then(async res => {
              let data = await res;
              return true;
            });
          }
        })
        .catch(error => {
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
      .then(res => {
        console.log(
          "database - insertItem - Success -> " + JSON.stringify(res)
        );
        return true;
      })
      .catch(error => {
        console.warn(
          "database - insertItem - Error -> " + JSON.stringify(error)
        );
        return false;
      });
  }

  getItems() {
    let sql = "SELECT * FROM myfreakytable";
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

  getTables() {
    let sql = "SELECT name FROM sqlite_master WHERE type ='table'";
    return this.dbObject.executeSql(sql, []).then(data => {
      let tables = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          tables.push({
            tableName: data.rows.item(i).name
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
      .then(res => {
        console.log(
          "database - deleteItem - Success -> " + JSON.stringify(res)
        );
        return true;
      })
      .catch(error => {
        console.warn(
          "database - deleteItem - Error -> " + JSON.stringify(error)
        );
        return false;
      });
  }
  // -------------------------- For reference - ends  --------------------------

  // -------------------------- BPSCL Queries - starts  -------------------------- //
  getStates() {
    let sql = `SELECT stateId, stateName, stateCode FROM ${this.table_states} WHERE isActive = ${this.status.active}`;
    return this.dbObject.executeSql(sql, []).then(data => {
      let states = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          states.push({
            stateId: data.rows.item(i).stateId,
            stateName: data.rows.item(i).stateName,
            stateCode: data.rows.item(i).stateCode
          });
        }
      }
      return states;
    });
  }

  getGenders() {
    let sql = `SELECT genderId, gender FROM ${this.table_genders} WHERE isActive = ${this.status.active}`;
    return this.dbObject.executeSql(sql, []).then(data => {
      let genders = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          genders.push({
            genderId: data.rows.item(i).genderId,
            gender: data.rows.item(i).gender
          });
        }
      }
      return genders;
    });
  }

  getAgeUnits() {
    let sql = `SELECT ageUnitId, ageUnitName FROM ${this.table_ageUnits} WHERE isActive = ${this.status.active}`;
    return this.dbObject.executeSql(sql, []).then(data => {
      let ageUnits = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          ageUnits.push({
            ageUnitId: data.rows.item(i).ageUnitId,
            ageUnitName: data.rows.item(i).ageUnitName
          });
        }
      }
      return ageUnits;
    });
  }

  getAgeCategories() {
    let sql = `SELECT ageCategoryId, ageCategoryName FROM ${this.table_ageCategories} WHERE isActive = ${this.status.active}`;
    return this.dbObject.executeSql(sql, []).then(data => {
      let ageCategories = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          ageCategories.push({
            ageCategoryId: data.rows.item(i).ageCategoryId,
            ageCategoryName: data.rows.item(i).ageCategoryName
          });
        }
      }
      return ageCategories;
    });
  }

  getReligions() {
    let sql = `SELECT religionId, religionName FROM ${this.table_religions} WHERE isActive = ${this.status.active}`;
    return this.dbObject.executeSql(sql, []).then(data => {
      let religions = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          religions.push({
            religionId: data.rows.item(i).religionId,
            religionName: data.rows.item(i).religionName
          });
        }
      }
      return religions;
    });
  }

  getCastes() {
    let sql = `SELECT communityId, communityName FROM ${this.table_castes} WHERE isActive = ${this.status.active}`;
    return this.dbObject.executeSql(sql, []).then(data => {
      let communities = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          communities.push({
            communityId: data.rows.item(i).communityId,
            communityName: data.rows.item(i).communityName
          });
        }
      }
      return communities;
    });
  }

  getDistricts(stateId = this.stateId) {
    let sql = `SELECT stateId, districtId, districtName, districtCode FROM ${this.table_districts} WHERE stateId = ? AND isActive = ?`;
    return this.dbObject
      .executeSql(sql, [stateId, this.status.active])
      .then(data => {
        let districts = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            districts.push({
              stateId: data.rows.item(i).stateId,
              districtId: data.rows.item(i).districtId,
              districtName: data.rows.item(i).districtName,
              districtCode: data.rows.item(i).districtCode
            });
          }
        }
        return districts;
      });
  }

  getMandals(stateId, districtId) {
    let sql = `SELECT stateId, districtId, mandalId, mandalName, mandalCode FROM ${this.table_mandals} WHERE stateId = ? AND districtId = ? AND isActive = ?`;
    return this.dbObject
      .executeSql(sql, [stateId, districtId, this.status.active])
      .then(data => {
        let mandals = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            mandals.push({
              stateId: data.rows.item(i).stateId,
              districtId: data.rows.item(i).districtId,
              mandalName: data.rows.item(i).mandalName,
              mandalId: data.rows.item(i).mandalId
            });
          }
        }
        return mandals;
      });
  }

  getVillages(stateId, districtId, mandalId) {
    let sql = `SELECT stateId, districtId, mandalId, villageId, villageName, villageCode FROM ${this.table_villages} WHERE stateId = ? AND districtId = ? AND mandalId = ? AND isActive = ?`;
    return this.dbObject
      .executeSql(sql, [stateId, districtId, mandalId, this.status.active])
      .then(data => {
        let villages = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            villages.push({
              stateId: data.rows.item(i).stateId,
              districtId: data.rows.item(i).districtId,
              mandalId: data.rows.item(i).mandalId,
              villageId: data.rows.item(i).villageId,
              villageName: data.rows.item(i).villageName,
              villageCode: data.rows.item(i).villageCode
            });
          }
        }
        return villages;
      });
  }

  getServicePoints(stateId, districtId, mandalId, villageId) {
    let sql = `SELECT servicePointId, servicePointName, servicePointCode FROM ${this.table_servicePoints} WHERE stateId = ? AND districtId = ? AND mandalId = ? AND villageId = ? AND isActive = ?`;
    return this.dbObject
      .executeSql(sql, [
        stateId,
        districtId,
        mandalId,
        villageId,
        this.status.active
      ])
      .then(data => {
        let servicePoints = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            servicePoints.push({
              servicePointId: data.rows.item(i).servicePointId,
              servicePointName: data.rows.item(i).servicePointName,
              servicePointCode: data.rows.item(i).servicePointCode
            });
          }
        }
        return servicePoints;
      });
  }

  getSessionTypes() {
    let sql = `SELECT sessionTypeId, sessionTypeName FROM ${this.table_sessionTypes} WHERE isActive = ${this.status.active}`;
    return this.dbObject.executeSql(sql, []).then(data => {
      let sessionTypes = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          sessionTypes.push({
            sessionTypeId: data.rows.item(i).sessionTypeId,
            sessionTypeName: data.rows.item(i).sessionTypeName
          });
        }
      }
      return sessionTypes;
    });
  }

  getAdmins() {
    let sql = `SELECT userName, password, registrationNo FROM ${this.table_admins}`;
    return this.dbObject.executeSql(sql, []).then(data => {
      let admins = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          admins.push({
            userName: data.rows.item(i).userName,
            password: data.rows.item(i).password,
            registrationNo: data.rows.item(i).registrationNo
          });
        }
      }
      return admins;
    });
  }

  getUsers() {
    let sql = `SELECT userName, password FROM ${this.table_users}`;
    return this.dbObject.executeSql(sql, []).then(data => {
      let users = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          users.push({
            username: data.rows.item(i).userName,
            password: data.rows.item(i).password
          });
        }
      }
      return users;
    });
  }

  getBeneficiaries() {
    let sql = `SELECT patientId, deviceId, vanId, routeVillageId, servicePointId, compoundPatientId, registrationDate, name, surname, genderId, dob, communityId, religionId, fatherName, spouseName, motherName, aadharNo, mctsId, villageId, mandalId, districtId, stateId, imageUrl, insertedBy, insertedDate, updatedBy, updatedDate, imageUploadStatus, uploadStatus FROM ${this.table_beneficiaries}`;
    return this.dbObject.executeSql(sql, []).then(data => {
      let beneficiaries = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          beneficiaries.push({
            patientId: data.rows.item(i).patientId,
            deviceId: data.rows.item(i).deviceId,
            vanId: data.rows.item(i).vanId,
            routeVillageId: data.rows.item(i).routeVillageId,
            registrationDate: data.rows.item(i).registrationDate,
            servicePointId: data.rows.item(i).servicePointId,
            compoundPatientId: data.rows.item(i).compoundPatientId,
            name: data.rows.item(i).name,
            surname: data.rows.item(i).surname,
            genderId: data.rows.item(i).genderId,
            dob: data.rows.item(i).dob,
            communityId: data.rows.item(i).communityId,
            religionId: data.rows.item(i).religionId,
            fatherName: data.rows.item(i).fatherName,
            spouseName: data.rows.item(i).spouseName,
            motherName: data.rows.item(i).motherName,
            aadharNo: data.rows.item(i).aadharNo,
            mctsId: data.rows.item(i).mctsId,
            villageId: data.rows.item(i).villageId,
            mandalId: data.rows.item(i).mandalId,
            mandalName: data.rows.item(i).mandalName,
            districtId: data.rows.item(i).districtId,
            stateId: data.rows.item(i).stateId,
            imageUrl: data.rows.item(i).imageUrl,
            insertedBy: data.rows.item(i).insertedBy,
            insertedDate: data.rows.item(i).insertedDate,
            updatedBy: data.rows.item(i).updatedBy,
            updatedDate: data.rows.item(i).updatedDate,
            imageUploadStatus: data.rows.item(i).imageUploadStatus,
            uploadStatus: data.rows.item(i).uploadStatus
          });
        }
      }
      return beneficiaries;
    });
  }

  getVisits() {
    let sql = `SELECT patientId, deviceId, vanId, routeVillageId, servicePointId, compoundPatientId, visitCount, visitDate, age, ageTypeId, ageGroupId, contactNo, familyContactNo, economicStatusId, educationStatusId, maritalStatusId, noOfFamilyNumbers, isHandicaped FROM ${this.table_visits}`;
    return this.dbObject.executeSql(sql, []).then(data => {
      let visits = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          visits.push({
            patientId: data.rows.item(i).patientId,
            deviceId: data.rows.item(i).deviceId,
            vanId: data.rows.item(i).vanId,
            routeVillageId: data.rows.item(i).routeVillageId,
            registrationDate: data.rows.item(i).registrationDate,
            servicePointId: data.rows.item(i).servicePointId,
            compoundPatientId: data.rows.item(i).compoundPatientId,
            visitCount: data.rows.item(i).visitCount,
            visitDate: data.rows.item(i).visitDate,
            age: data.rows.item(i).age,
            ageTypeId: data.rows.item(i).ageTypeId,
            ageGroupId: data.rows.item(i).ageGroupId,
            contactNo: data.rows.item(i).contactNo,
            familyContactNo: data.rows.item(i).familyContactNo,
            economicStatusId: data.rows.item(i).economicStatusId,
            educationStatusId: data.rows.item(i).educationStatusId,
            maritalStatusId: data.rows.item(i).maritalStatusId,
            noOfFamilyNumbers: data.rows.item(i).noOfFamilyNumbers,
            isHandicaped: data.rows.item(i).isHandicaped
          });
        }
      }
      return visits;
    });
  }

  login(username, password) {
    let sql = `SELECT firstName, lastName, userId, roleId, deviceId, vanId FROM ${this.table_users} WHERE userName = ? AND password = ? AND isActive = ${this.status.active}`;
    return this.dbObject.executeSql(sql, [username, password]).then(data => {
      let userDetails = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          userDetails.push({
            firstName: data.rows.item(i).firstName,
            lastName: data.rows.item(i).lastName,
            userId: data.rows.item(i).userId,
            roleId: data.rows.item(i).roleId,
            deviceId: data.rows.item(i).deviceId,
            vanId: data.rows.item(i).vanId
          });
        }
      }
      return userDetails;
    });
  }

  getStartingSessionPeriodId(sessionTypeId) {
    let sql = `SELECT sessionPeriodId FROM ${this.table_sessionPeriod} WHERE sessionTypeId = ? AND isActive = ${this.status.active} LIMIT 1`;
    return this.dbObject.executeSql(sql, [sessionTypeId]).then(data => {
      let id: number;
      id = data.rows.item(0).sessionPeriodId;
      return id;
    });
  }

  registerAdmin(data) {
    let sql = `INSERT INTO ${this.table_admins} (username, password, registrationNo, imeiNo, parkingPlace, villageId, mandalId, districtId, stateId, gcmToken, isActive, insertedDate, updatedDate) VALUES (?,?,?,?,?,?,?,?,?,?,?,'datetime()','datetime()')`;
    return this.dbObject
      .executeSql(sql, [
        data.username,
        data.password,
        data.registrationNo,
        data.imeiNo,
        data.parkingPlace,
        data.villageId,
        data.mandalId,
        data.districtId,
        data.stateId,
        data.gcmToken,
        this.status.active
      ])
      .then(res => {
        console.log(
          "database - insertItem - Success -> " + JSON.stringify(res)
        );
        return true;
      })
      .catch(error => {
        console.warn(
          "database - insertItem - Error -> " + JSON.stringify(error)
        );
        return false;
      });
  }

  registerBeneficiary(data) {
    let sql = `INSERT INTO ${this.table_beneficiaries} (patientId, deviceId, vanId, routeVillageId, servicePointId, compoundPatientId, registrationDate, name, surname, genderId, dob, communityId, religionId, fatherName, spouseName, motherName, aadharNo, mctsId, villageId, mandalId, districtId, stateId, imageUrl, insertedBy, insertedDate, updatedBy, updatedDate, imageUploadStatus, uploadStatus) VALUES (?,?,?,?,?,?,'datetime()',?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,'datetime()',?,'datetime()',?,?)`;
    return this.dbObject
      .executeSql(sql, [
        data.patientId,
        data.deviceId,
        data.vanId,
        data.routeVillageId,
        data.servicePointId,
        data.compoundPatientId,
        data.name,
        data.surname,
        data.genderId,
        data.dob,
        data.communityId,
        data.religionId,
        data.fatherName,
        data.spouseName,
        data.motherName,
        data.aadharNo,
        data.mctsId,
        data.villageId,
        data.mandalId,
        data.districtId,
        data.stateId,
        data.imageUrl,
        data.userId,
        data.userId,
        this.status.active,
        this.status.active
      ])
      .then(res => {
        console.log(
          "database - registerBeneficiary() - Success -> " + JSON.stringify(res)
        );
        return true;
      })
      .catch(error => {
        console.warn(
          "database - registerBeneficiary() - Error -> " + JSON.stringify(error)
        );
        return false;
      });
  }

  insertVisit(data) {
    let sql = `INSERT INTO ${this.table_visits} (patientId, visitId, deviceId, vanId, routeVillageId, servicePointId, compoundPatientId, visitCount, visitDate, age, ageTypeId, ageGroupId, contactNo, familyContactNo, economicStatusId, educationStatusId, maritalStatusId, occupationStatusId, serviceProvidedId, pregnancyStatus, benTypeId, noOfFamilyNumbers, isHandicaped, provisonalDiagnosis, impClinicalFindings, insertedBy, insertedDate, updatedBy, updatedDate, uploadStatus) VALUES (?,?,?,?,?,?,?,?,'datetime()',?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,'datetime()',?,'datetime()',?)`;
    return this.dbObject
      .executeSql(sql, [
        data.patientId,
        data.visitId,
        data.deviceId,
        data.vanId,
        data.routeVillageId,
        data.servicePointId,
        data.compoundPatientId,
        data.visitCount,
        data.age,
        data.ageUnit,
        data.ageCategory,
        data.personalNumber,
        data.familyOrRelativeNumber,
        data.economicStatusId,
        data.educationStatusId,
        data.maritalStatusId,
        data.occupationStatusId,
        data.serviceProvidedId,
        data.pregnancyStatus,
        data.benTypeId,
        data.noOfFamilyNumbers,
        data.isHandicaped,
        data.provisonalDiagnosis,
        data.impClinicalFindings,
        data.userId,
        data.userId,
        this.status.active
      ])
      .then(res => {
        console.log(
          "database - insertVisit() - Success -> " + JSON.stringify(res)
        );
        return true;
      })
      .catch(error => {
        console.warn(
          "database - insertVisit() - Error -> " + JSON.stringify(error)
        );
        return false;
      });
  }

  saveSessionDetails(sessionDetails) {
    let sql = `INSERT INTO ${this.table_saveSessionDetails} (userId, sessionPeriodId, sessionTypeId, deviceId, vanId, insertedDate, sessionStart, sessionEnd) VALUES (?,?,?,?,?, 'datetime()','datetime()', 'datetime()')`;
    return this.dbObject
      .executeSql(sql, [
        sessionDetails.userId,
        sessionDetails.sessionPeriodId,
        sessionDetails.sessionTypeId,
        sessionDetails.deviceId,
        sessionDetails.vanId
      ])
      .then(res => {
        console.log(
          "database - saveSessionDetails - Success -> " + JSON.stringify(res)
        );
        return true;
      })
      .catch(error => {
        console.error(
          "database - saveSessionDetails - Error -> " + JSON.stringify(error)
        );
        return false;
      });
  }

  saveServicePointLog(details) {
    let sql = `INSERT INTO ${this.table_servicePointLog} (deviceId, vanId, servicePointId, userId, insertedDate) VALUES (?,?,?,?, 'datetime()')`;
    return this.dbObject
      .executeSql(sql, [
        details.deviceId,
        details.vanId,
        details.servicePointId,
        details.userId
      ])
      .then(res => {
        console.log(
          "database - saveServicePointLog - Success -> " + JSON.stringify(res)
        );
        return true;
      })
      .catch(error => {
        console.error(
          "database - saveServicePointLog - Error -> " + JSON.stringify(error)
        );
        return false;
      });
  }

  // -------------------------- BPSCL Queries - ends  -------------------------- //
}
