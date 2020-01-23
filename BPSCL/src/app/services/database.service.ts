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
  isDbReady: boolean = false;

  database_name: string = "bpscl_dev14.db";

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
  table_booleans: string = "m_Booleans";
  table_servicePoints: string = "mv_ServicePoint";
  table_sessionTypes: string = "mu_SessionType";
  table_sessionPeriod: string = "mu_SessionPeriod";
  table_attendances: string = "du_Attendance";
  table_servicePointLog: string = "du_ServicePointLog";
  table_admins: string = "mv_VanDeviceApprove";
  table_beneficiaries: string = "dp_Registration";
  table_visits: string = "dp_Visit";
  table_vitals: string = "dp_Vitals";
  table_provisionalDiagnosis: string = "dp_ProvisionalDiagnosis";
  table_dispenses_m: string = "mi_Item";
  table_dispenseType_m: string = "mi_ItemType";
  table_dispenses: string = "dp_ItemDispensation";
  table_referredTo: string = "dp_Referral";
  table_referredTo_m: string = "mp_HospitalList";
  table_beneficiaryTypes: string = "mp_BeneficiaryType";
  table_roles: string = "mu_Role";
  table_reports: string = "ms_Report";
  table_provisionalDiagnosis_m: string = "mp_ProvisionalDiagnosis";
  table_labTests_m: string = "mp_LabTest";
  table_labTests: string = "dp_LabTest";

  stateId: number = 21;
  status = {
    inActive: 2,
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
          console.log("database - createDb - Success -> " + JSON.stringify(db));
          return db;
        })
        .catch(error => {
          console.warn(
            "database - createDb - Error -> " + JSON.stringify(error)
          );
          return false;
        });
    });
  }

  seedSql() {
    return this.http
      .get("assets/BPSCL_21112019_VAN_1.sql", { responseType: "text" })
      .toPromise()
      .then(sql => {
        return this.sqlitePorter
          .importSqlToDb(this.dbObject, sql)
          .then(async res => {
            let getRes = await res;
            console.log("SQL file imported successfully... :)");
            this.isDbReady = true;
            return true;
          })
          .catch(error => {
            console.warn("SQL file import error => " + JSON.stringify(error));
            return false;
          });
      });
  }

  checkTable() {
    return this.createDb().then(async (res: SQLiteObject) => {
      let data = await res;
      let sql = "SELECT name FROM sqlite_master WHERE type='table' AND name=?";
      return data
        .executeSql(sql, [this.table_users])
        .then(res => {
          console.log(
            "database - checkTable - Success -> " + JSON.stringify(res)
          );
          if (res.rows.length <= 0) {
            return this.seedSql().then(async res => {
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
    let sql = `SELECT userId, userName, password FROM ${this.table_users}`;
    return this.dbObject.executeSql(sql, []).then(data => {
      let users = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          users.push({
            userId: data.rows.item(i).userId,
            username: data.rows.item(i).userName,
            password: data.rows.item(i).password
          });
        }
      }
      return users;
    });
  }

  getUserDetails(userId) {
    let sql = `SELECT u.firstName, u.lastName, u.userName, u.password, u.genderId, u.dob, u.fatherName, u.phone, u.address, u.email, u.age, u.ageTypeId, u.doj, u.roleId, u.userImageUrl, r.roleName FROM ${this.table_users} u LEFT JOIN ${this.table_roles} r ON u.roleId = r.roleId WHERE u.userId = ?`;
    return this.dbObject.executeSql(sql, [userId]).then(data => {
      let users = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          users.push({
            firstName: data.rows.item(i).firstName,
            lastName: data.rows.item(i).lastName,
            username: data.rows.item(i).userName,
            password: data.rows.item(i).password,
            genderId: data.rows.item(i).genderId,
            dob: data.rows.item(i).dob,
            fatherName: data.rows.item(i).fatherName,
            phone: data.rows.item(i).phone,
            address: data.rows.item(i).address,
            email: data.rows.item(i).email,
            age: data.rows.item(i).age,
            ageTypeId: data.rows.item(i).ageTypeId,
            doj: data.rows.item(i).doj,
            roleId: data.rows.item(i).roleId,
            userImageUrl: data.rows.item(i).userImageUrl,
            roleName: data.rows.item(i).roleName
          });
        }
      }
      return users;
    });
  }

  getMaxBeneficiaryId(servicePointId) {
    let sql = `SELECT max(patientId) as maxbeneficiaryId FROM ${this.table_beneficiaries} where servicePointId = ${servicePointId}`;
    console.log("Query is -> " + sql);
    return this.dbObject
      .executeSql(sql, [])
      .then(data => {
        let maxbeneficiaryId = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            maxbeneficiaryId.push({
              maxbeneficiaryId: data.rows.item(i).maxbeneficiaryId
            });
          }
        } else {
          return null;
        }
        return maxbeneficiaryId;
      })
      .catch(e => {
        return null;
      });
  }

  getMaxVisitId(servicePointId) {
    let sql = `SELECT max(visitId) as maxVisitId FROM ${this.table_visits} where servicePointId = ${servicePointId}`;
    console.log("Query is -> " + sql);
    return this.dbObject
      .executeSql(sql, [])
      .then(data => {
        let maxVisitId = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            maxVisitId.push({
              maxVisitId: data.rows.item(i).maxVisitId
            });
          }
        } else {
          return null;
        }
        return maxVisitId;
      })
      .catch(e => {
        return null;
      });
  }

  getMaxUserId() {
    let maxVisitId = 1;
    let sql = `SELECT max(userId) as maxUserId FROM ${this.table_users}`;
    console.log("Query is -> " + sql);
    return this.dbObject
      .executeSql(sql, [])
      .then(data => {
        if (data.rows.length > 0) {
          maxVisitId += data.rows.item(0).maxVisitId;
        } else {
          console.warn(
            "database - getMaxUserId() returned empty results - Warning -> " +
            JSON.stringify(data)
          );
        }
        return maxVisitId;
      })
      .catch(error => {
        console.error(
          "database - getMaxUserId() - Error -> " + JSON.stringify(error)
        );
        return 0;
      });
  }

  getMaxAttendanceId() {
    let maxAttendanceId = 1;
    let sql = `SELECT max(attendanceId) as maxAttendanceId FROM ${this.table_attendances}`;
    console.log("Query is -> " + sql);
    return this.dbObject
      .executeSql(sql, [])
      .then(data => {
        if (data.rows.length > 0) {
          maxAttendanceId += data.rows.item(0).maxAttendanceId;
        } else {
          console.warn(
            "database - getMaxAttendanceId() returned empty results - Warning -> " +
            JSON.stringify(data)
          );
        }
        return maxAttendanceId;
      })
      .catch(error => {
        console.error(
          "database - getMaxAttendanceId() - Error -> " + JSON.stringify(error)
        );
        return maxAttendanceId;
      });
  }

  getBeneficiaryDetails(benId) {
    let sql = `SELECT ben.patientId, ben.deviceId, ben.vanId, ben.routeVillageId, ben.servicePointId, ben.compoundPatientId, ben.registrationDate, ben.name, ben.surname, ben.genderId, ben.dob, ben.communityId, ben.religionId, ben.fatherName, ben.spouseName, ben.motherName, ben.aadharNo, ben.mctsId, ben.villageId, ben.mandalId, ben.districtId, ben.stateId, ben.imageUrl, ben.insertedBy, ben.insertedDate, ben.updatedBy, ben.updatedDate, ben.imageUploadStatus, ben.uploadStatus, visit.visitId, visit.visitCount, visit.age, visit.ageTypeId, visit.pregnancyStatus, g.gender, d.districtName, m.mandalName, v.villageName FROM ${this.table_beneficiaries} AS ben LEFT JOIN ${this.table_visits} AS visit ON ben.patientId = visit.patientId LEFT JOIN mp_gender AS g ON ben.genderId = g.genderId LEFT JOIN m_District AS d ON ben.districtId = d.districtId LEFT JOIN m_Mandal AS m ON ben.mandalId = m.mandalId LEFT JOIN m_Village AS v ON ben.villageId = v.villageId WHERE ben.patientId = '${benId}'`;
    return this.dbObject.executeSql(sql, []).then(data => {
      let beneficiaryDetails = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          beneficiaryDetails.push({
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
            districtId: data.rows.item(i).districtId,
            stateId: data.rows.item(i).stateId,
            imageUrl: data.rows.item(i).imageUrl,
            insertedBy: data.rows.item(i).insertedBy,
            insertedDate: data.rows.item(i).insertedDate,
            updatedBy: data.rows.item(i).updatedBy,
            updatedDate: data.rows.item(i).updatedDate,
            imageUploadStatus: data.rows.item(i).imageUploadStatus,
            uploadStatus: data.rows.item(i).uploadStatus,
            visitId: data.rows.item(i).visitId,
            visitCount: data.rows.item(i).visitCount,
            age: data.rows.item(i).age,
            ageTypeId: data.rows.item(i).ageTypeId,
            pregnancyStatus: data.rows.item(i).pregnancyStatus,
            gender: data.rows.item(i).gender,
            districtName: data.rows.item(i).districtName,
            mandalName: data.rows.item(i).mandalName,
            villageName: data.rows.item(i).villageName
          });
        }
      }
      return beneficiaryDetails;
    });
  }

  getBeneficiaries() {
    let sql = `SELECT patientId, name FROM ${this.table_beneficiaries}`;
    return this.dbObject.executeSql(sql, []).then(data => {
      let beneficiaries = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          beneficiaries.push({
            patientId: data.rows.item(i).patientId,
            name: data.rows.item(i).name
          });
        }
      }
      return beneficiaries;
    });
  }

  getDispenses(itemTypeId) {
    let sql = `SELECT itemId, genericName FROM ${this.table_dispenses_m} WHERE itemType = ${itemTypeId} AND isActive = ${this.status.active}`;
    return this.dbObject.executeSql(sql, []).then(data => {
      let dispenses = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          dispenses.push({
            itemId: data.rows.item(i).itemId,
            genericName: data.rows.item(i).genericName
          });
        }
      }
      return dispenses;
    });
  }

  geReferredTos() {
    let sql = `SELECT hospitalId, hospitalName FROM ${this.table_referredTo_m} WHERE isActive = ${this.status.active}`;
    return this.dbObject.executeSql(sql, []).then(data => {
      let hospitals = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          hospitals.push({
            hospitalId: data.rows.item(i).hospitalId,
            hospitalName: data.rows.item(i).hospitalName
          });
        }
      }
      return hospitals;
    });
  }

  getRCHs() {
    let sql = `SELECT beneficiaryTypeId, beneficiaryTypeName FROM ${this.table_beneficiaryTypes} WHERE isActive = ${this.status.active}`;
    return this.dbObject.executeSql(sql, []).then(data => {
      let beneficiaryTypes = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          beneficiaryTypes.push({
            beneficiaryTypeId: data.rows.item(i).beneficiaryTypeId,
            beneficiaryTypeName: data.rows.item(i).beneficiaryTypeName
          });
        }
      }
      return beneficiaryTypes;
    });
  }

  getRoles() {
    let sql = `SELECT roleId, roleName FROM ${this.table_roles} WHERE isActive = ${this.status.active}`;
    return this.dbObject.executeSql(sql, []).then(data => {
      let roles = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          roles.push({
            roleId: data.rows.item(i).roleId,
            roleName: data.rows.item(i).roleName
          });
        }
      }
      return roles;
    });
  }

  getReports() {
    let sql = `SELECT reportId, reportName, reportQuery, noOfArguments FROM ${this.table_reports} WHERE isActive = ${this.status.active}`;
    return this.dbObject.executeSql(sql, []).then(data => {
      let reports = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          reports.push({
            reportId: data.rows.item(i).reportId,
            reportName: data.rows.item(i).reportName,
            reportQuery: data.rows.item(i).reportQuery,
            noOfArguments: data.rows.item(i).noOfArguments
          });
        }
      }
      return reports;
    });
  }

  getProvisionalDiagnoses(category) {
    let sql = `SELECT provisionalDiagnosisId, provisionalDiagnosisName FROM ${this.table_provisionalDiagnosis_m} WHERE category = ${category} AND isActive = ${this.status.active}`;
    return this.dbObject.executeSql(sql, []).then(data => {
      let diagnoses = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          diagnoses.push({
            provisionalDiagnosisId: data.rows.item(i).provisionalDiagnosisId,
            provisionalDiagnosisName: data.rows.item(i).provisionalDiagnosisName
          });
        }
      }
      return diagnoses;
    });
  }

  getLabTests() {
    let sql = `SELECT labTestId, labTestName, validValues, units FROM ${this.table_labTests_m} WHERE isActive = ${this.status.active}`;
    return this.dbObject.executeSql(sql, []).then(data => {
      let labTests = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          labTests.push({
            labTestId: data.rows.item(i).labTestId,
            labTestName: data.rows.item(i).labTestName,
            validValues: data.rows.item(i).validValues,
            units: data.rows.item(i).units
          });
        }
      }
      return labTests;
    });
  }

  getVisits() {
    let sql = `SELECT patientId, visitId, deviceId, vanId, routeVillageId, servicePointId, compoundPatientId, visitCount, visitDate, age, ageTypeId, ageGroupId, contactNo, familyContactNo, economicStatusId, educationStatusId, maritalStatusId, noOfFamilyNumbers, isHandicaped FROM ${this.table_visits}`;
    return this.dbObject.executeSql(sql, []).then(data => {
      let visits = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          visits.push({
            patientId: data.rows.item(i).patientId,
            visitId: data.rows.item(i).visitId,
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

  getBeneficiaryMeasurementsData(patientId) {
    let sql = `SELECT insertedDate,bpSystolic,bpDiastolic,height,weight,bmi,pulseRate,temperature,respiratoryRate FROM ${this.table_vitals} WHERE patientId = ${patientId}`;
    return this.dbObject.executeSql(sql, []).then(data => {
      let measurementsData = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          measurementsData.push({
            insertedDate: data.rows.item(i).insertedDate,
            bp:
              data.rows.item(i).bpSystolic +
              "/" +
              data.rows.item(i).bpDiastolic,
            pulseRate: data.rows.item(i).pulseRate,
            temperature: data.rows.item(i).temperature,
            respiratoryRate: data.rows.item(i).respiratoryRate,
            height: data.rows.item(i).height,
            weight: data.rows.item(i).weight,
            bmi: data.rows.item(i).bmi
          });
        }
      }
      return measurementsData;
    });
  }

  getBeneficiaryDiseasesData(patientId) {
    let sql = `SELECT dp.insertedDate,mpd.provisionalDiagnosisName,dp.provisionalDiagnosisId,hospitalName FROM ${this.table_provisionalDiagnosis} dp INNER JOIN ${this.table_provisionalDiagnosis_m} mpd ON mpd.provisionalDiagnosisId=dp.provisionalDiagnosisId LEFT JOIN ${this.table_referredTo} dpr ON dpr.patientId=dp.patientId and dpr.visitId=dp.visitId LEFT JOIN ${this.table_referredTo_m} ON hospitalId=dpr.referralTypeId WHERE patientId = ${patientId}`;
    return this.dbObject.executeSql(sql, []).then(data => {
      let diseasesData = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          diseasesData.push({
            rowOneData: data.rows.item(i).insertedDate,
            rowTwoData: data.rows.item(i).provisionalDiagnosisName,
            rowThreeData: data.rows.item(i).hospitalName
          });
        }
      }
      return diseasesData;
    });
  }

  getBeneficiaryLabtestData(patientId) {
    let sql = `SELECT dpa.insertedDate,mpa.labTestName,labTestResult,dpa.labTestId FROM ${this.table_labTests} dpa INNER JOIN ${this.table_labTests_m} mpa ON dpa.labTestId=mpa.labTestId WHERE patientId = ${patientId}`;
    return this.dbObject.executeSql(sql, []).then(data => {
      let labtestData = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          labtestData.push({
            rowOneData: data.rows.item(i).insertedDate,
            rowTwoData: data.rows.item(i).labTestName,
            rowThreeData: data.rows.item(i).labTestResult
          });
        }
      }
      return labtestData;
    });
  }

  getBeneficiaryDispensesData(patientId) {
    let sql = `SELECT dpi.insertedDate,dpi.quantityGiven, mit.genericName,dpi.itemId from ${this.table_dispenses} dpi INNER JOIN ${this.table_dispenses_m} mit dpi.itemId = mit.itemId WHERE patientId = ${patientId} AND dpi.insertedDate IN (SELECT dpi.insertedDate FROM ${this.table_dispenses} WHERE patientId = ${patientId})`;
    return this.dbObject.executeSql(sql, []).then(data => {
      let dispensesData = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          dispensesData.push({
            rowOneData: data.rows.item(i).insertedDate,
            rowTwoData: data.rows.item(i).genericName,
            rowThreeData: data.rows.item(i).quantityGiven
          });
        }
      }
      return dispensesData;
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

  getSessionPeriods(sessionTypeId) {
    let sql = `SELECT sessionPeriodId, sessionPeriodName FROM ${this.table_sessionPeriod} WHERE sessionTypeId = ? AND isActive = ${this.status.active}`;
    return this.dbObject.executeSql(sql, [sessionTypeId]).then(data => {
      let sessionPeriods: any[] = [];
      for (var i = 0; i < data.rows.length; i++) {
        sessionPeriods.push({
          sessionPeriodId: data.rows.item(i).sessionPeriodId,
          sessionPeriodName: data.rows.item(i).sessionPeriodName
        });
      }
      return sessionPeriods;
    });
  }

  drugwiseReport(startDate, endDate) {
    let sql = `SELECT se.itemId AS DrugId, genericName AS Drugname, itemTypeName, SUM(quantityGiven) AS Total_Quantity,villageName AS servicePoint FROM ${this.table_dispenses} se LEFT JOIN ${this.table_villages} spm ON spm.villageId=se.servicePointId LEFT JOIN ${this.table_dispenses_m} mi ON mi.itemId=se.itemId LEFT JOIN ${this.table_dispenseType_m} mit ON mit.itemTypeId=se.itemTypeId WHERE se.insertedDate BETWEEN ? AND ? GROUP BY DrugId ORDER BY 2`;
    return this.dbObject.executeSql(sql, [startDate, endDate]).then(data => {
      let drugwiseReports: any[] = [];
      for (var i = 0; i < data.rows.length; i++) {
        drugwiseReports.push({
          DrugId: data.rows.item(i).DrugId,
          Drugname: data.rows.item(i).Drugname,
          Total_Quantity: data.rows.item(i).Total_Quantity,
          servicePoint: data.rows.item(i).servicePoint
        });
      }
      return drugwiseReports;
    });
  }

  beneficiarywiseDrugReport(startDate, endDate) {
    let sql = `SELECT di.patientId, di.visitId, di.itemId, genericName AS DrugName,quantityGiven, ms.servicePointName, di.insertedDate FROM ${this.table_dispenses} di
    LEFT JOIN ${this.table_dispenses_m} mi ON mi.itemId=di.itemId
    LEFT JOIN ${this.table_servicePoints} ms ON ms.servicePointId=di.servicePointId
    WHERE di.insertedDate BETWEEN ? AND ?`;
    return this.dbObject.executeSql(sql, [startDate, endDate]).then(data => {
      let beneficiarywiseDrugReports: any[] = [];
      for (var i = 0; i < data.rows.length; i++) {
        beneficiarywiseDrugReports.push({
          patientId: data.rows.item(i).patientId,
          visitId: data.rows.item(i).visitId,
          itemId: data.rows.item(i).itemId,
          DrugName: data.rows.item(i).DrugName,
          quantityGiven: data.rows.item(i).quantityGiven,
          servicePointName: data.rows.item(i).servicePointName,
          insertedDate: data.rows.item(i).insertedDate
        });
      }
      return beneficiarywiseDrugReports;
    });
  }

  benSummaryReport(startDate, endDate) {
    let sql = `SELECT di.patientId, di.visitId, di.itemId, genericName AS DrugName, quantityGiven, ms.servicePointName, dr.registrationDate, dv.visitDate, dr.name, dr.surname, CASE WHEN dr.genderId=1 THEN "Male" ELSE "Female" end AS GenderType, substr(dv.age||ma.ageUnitName,-10,10) AS Age, height, weight, bmi, respiratoryRate FROM ${this.table_dispenses} di LEFT JOIN ${this.table_dispenses_m} mi ON mi.itemId=di.itemId LEFT JOIN ${this.table_visits} dv ON di.patientId=dv.patientId AND di.visitId=dv.visitId LEFT JOIN ${this.table_beneficiaries} dr ON dr.patientId=dv.patientId LEFT JOIN ${this.table_vitals} dpv ON di.patientId=dpv.patientId AND di.visitId=dpv.visitId LEFT JOIN ${this.table_servicePoints} ms ON ms.servicePointId=di.servicePointId LEFT JOIN ${this.table_ageUnits} ma ON ma.ageUnitId=dv.ageTypeId WHERE di.insertedDate BETWEEN ? AND ?`;
    return this.dbObject.executeSql(sql, [startDate, endDate]).then(data => {
      let benSummaryReports: any[] = [];
      for (var i = 0; i < data.rows.length; i++) {
        benSummaryReports.push({
          patientId: data.rows.item(i).patientId,
          visitId: data.rows.item(i).visitId,
          itemId: data.rows.item(i).itemId,
          DrugName: data.rows.item(i).DrugName,
          quantityGiven: data.rows.item(i).quantityGiven,
          servicePointName: data.rows.item(i).servicePointName,
          registrationDate: data.rows.item(i).registrationDate,
          visitDate: data.rows.item(i).visitDate,
          name: data.rows.item(i).name,
          surname: data.rows.item(i).surname,
          GenderType: data.rows.item(i).GenderType,
          Age: data.rows.item(i).Age,
          height: data.rows.item(i).height,
          weight: data.rows.item(i).weight,
          bmi: data.rows.item(i).bmi,
          respiratoryRate: data.rows.item(i).respiratoryRate,
        });
      }
      return benSummaryReports;
    });
  }

  benVisitReport(startDate, endDate) {
    let sql = `SELECT v.visitId, v.patientId, sp.servicePointName, r.registrationDate, v.visitDate, r.name, r.surname, CASE WHEN r.genderId = 1 THEN "MALE" WHEN r.genderId = 2 THEN "FEMALE" End AS GENDER, v.age, CASE WHEN v.visitDate = r.registrationDate THEN "NEW REG" ELSE "REVISIT" END AS Type FROM ${this.table_visits} v LEFT JOIN ${this.table_servicePoints} sp ON  sp.servicePointId = v.servicePointId LEFT JOIN ${this.table_beneficiaries} r ON r.patientId = v.patientId WHERE v.visitDate BETWEEN ? AND ?`;
    return this.dbObject.executeSql(sql, [startDate, endDate]).then(data => {
      let benVisitReports: any[] = [];
      for (var i = 0; i < data.rows.length; i++) {
        benVisitReports.push({
          visitId: data.rows.item(i).visitId,
          patientId: data.rows.item(i).patientId,
          servicePointName: data.rows.item(i).servicePointName,
          registrationDate: data.rows.item(i).registrationDate,
          visitDate: data.rows.item(i).visitDate,
          name: data.rows.item(i).name,
          surname: data.rows.item(i).surname,
          GENDER: data.rows.item(i).GENDER,
          Age: data.rows.item(i).Age,
          Type: data.rows.item(i).Type
        });
      }
      return benVisitReports;
    });
  }

  findProvisionalDiagnose(
    patientId,
    servicePointId,
    vanId,
    provisionalDiagnosisId,
    visitId
  ) {
    let sql = `SELECT provisionalDiagnosisId FROM ${this.table_provisionalDiagnosis} WHERE patientId = ? AND servicePointId = ? AND vanId = ? AND provisionalDiagnosisId = ? AND visitId = ? LIMIT 1`;
    return this.dbObject
      .executeSql(sql, [
        patientId,
        servicePointId,
        vanId,
        provisionalDiagnosisId,
        visitId
      ])
      .then(data => {
        let provisionalDiagnosis = [];
        provisionalDiagnosisId = data.rows.item(0).provisionalDiagnosisId;
        return provisionalDiagnosis;
      });
  }

  findReferredTo(patientId, servicePointId, vanId, visitId) {
    let sql = `SELECT patientId FROM ${this.table_referredTo} WHERE patientId = ? AND servicePointId = ? AND vanId = ? AND AND visitId = ? LIMIT 1`;
    return this.dbObject
      .executeSql(sql, [patientId, servicePointId, vanId, visitId])
      .then(data => {
        let patientIds = [];
        patientId = data.rows.item(0).patientId;
        return patientIds;
      });
  }

  findDispense(patientId, servicePointId, vanId, itemId, visitId) {
    let sql = `SELECT patientId FROM ${this.table_dispenses} WHERE patientId = ? AND servicePointId = ? AND vanId = ? AND itemId = ? AND visitId = ? LIMIT 1`;
    return this.dbObject
      .executeSql(sql, [patientId, servicePointId, vanId, itemId, visitId])
      .then(data => {
        let patientId = [];
        patientId = data.rows.item(0).patientId;
        return patientId;
      });
  }

  findAttendanceId(data) {
    let attendanceId = 0;
    let sql = `SELECT attendanceId FROM ${this.table_attendances} WHERE sessionPeriodId = ? AND userId = ? AND insertedDate LIKE '%${data.dateYMD}%' LIMIT 1`;
    return this.dbObject
      .executeSql(sql, [data.sessionPeriodId, data.userId])
      .then(data => {
        attendanceId = data.rows.item(0).attendanceId;
        return attendanceId;
      })
      .catch(error => {
        console.warn(
          "database - findAttendanceId - Error -> " + JSON.stringify(error)
        );
        return attendanceId;
      });
  }

  registerAdmin(data) {
    let sql = `INSERT INTO ${this.table_admins} (username, password, registrationNo, imeiNo, parkingPlace, villageId, mandalId, districtId, stateId, gcmToken, isActive, insertedDate, updatedDate) VALUES (?,?,?,?,?,?,?,?,?,?,?,datetime('now'),datetime('now'))`;
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
    let sql = `INSERT INTO ${this.table_beneficiaries} (patientId, deviceId, vanId, routeVillageId, servicePointId, compoundPatientId, registrationDate, name, surname, genderId, dob, communityId, religionId, fatherName, spouseName, motherName, aadharNo, mctsId, villageId, mandalId, districtId, stateId, imageUrl, insertedBy, insertedDate, updatedBy, updatedDate, imageUploadStatus, uploadStatus) VALUES (?,?,?,?,?,?,datetime('now'),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,datetime('now'),?,datetime('now'),?,?)`;
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

  registerStaff(data) {
    let sql = `INSERT INTO ${this.table_users} (userId, firstName, lastName, userName, password, genderId, dob, fatherName, phone, address, email, age, ageTypeId, doj, roleId, userImageUrl, isActive, deviceId, vanId, insertedBy, insertedDate, updatedBy, updatedDate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,datetime('now'),?,datetime('now'))`;
    return this.dbObject
      .executeSql(sql, [
        data.userIdIncrement,
        data.firstName,
        data.lastName,
        data.username,
        data.password,
        data.genderId,
        data.dob,
        data.fatherName,
        data.phone,
        data.address,
        data.email,
        data.age,
        data.ageTypeId,
        data.doj,
        data.roleId,
        data.userImageUrl,
        data.isActive,
        data.deviceId,
        data.vanId,
        data.userId,
        data.userId
      ])
      .then(res => {
        console.log(
          "database - registerStaff() - Success -> " + JSON.stringify(res)
        );
        return true;
      })
      .catch(error => {
        console.warn(
          "database - registerStaff() - Error -> " + JSON.stringify(error)
        );
        return false;
      });
  }

  insertVisit(data) {
    let sql = `INSERT INTO ${this.table_visits} (patientId, visitId, deviceId, vanId, routeVillageId, servicePointId, compoundPatientId, visitCount, visitDate, age, ageTypeId, ageGroupId, contactNo, familyContactNo, economicStatusId, educationStatusId, maritalStatusId, occupationStatusId, serviceProvidedId, pregnancyStatus, benTypeId, noOfFamilyNumbers, isHandicaped, provisionalDiagnosis, impClinicalFindings, insertedBy, insertedDate, updatedBy, updatedDate, uploadStatus) VALUES (?,?,?,?,?,?,?,?,datetime('now'),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,datetime('now'),?,datetime('now'),?)`;
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
        data.isHandicapped,
        data.provisionalDiagnosis,
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

  insertVital(data) {
    let sql = `INSERT INTO ${this.table_vitals} (patientId, visitId, deviceId, vanId, routeVillageId, servicePointId, compoundPatientId, visitCount, height, weight, bmi, pulseRate, temperature, respiratoryRate, bpSystolic, bpDiastolic, doctorBpSystolic, doctorBpDiastolic, muac, hc, insertedBy, insertedDate, updatedBy, updatedDate, uploadStatus) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,datetime('now'),?,datetime('now'),?)`;
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
        data.height,
        data.weight,
        data.bmi,
        data.pulseRate,
        data.temperature,
        data.respiratoryRate,
        data.bpSystolic,
        data.bpDiastolic,
        data.doctorBpSystolic,
        data.doctorBpDiastolic,
        data.muac,
        data.hc,
        data.userId,
        data.userId,
        this.status.active
      ])
      .then(res => {
        console.log(
          "database - insertVital() - Success -> " + JSON.stringify(res)
        );
        return true;
      })
      .catch(error => {
        console.warn(
          "database - insertVital() - Error -> " + JSON.stringify(error)
        );
        return false;
      });
  }

  insertProvisionalDiagnose(data) {
    let sql = `INSERT INTO ${this.table_provisionalDiagnosis} (patientId, visitId, deviceId, vanId, routeVillageId, servicePointId, compoundPatientId, visitCount, provisionalDiagnosisId, provisionalDiagnosisOther, remarks, insertedBy, insertedDate, updatedBy, updatedDate, uploadStatus) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,datetime('now'),?,datetime('now'),?)`;
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
        data.provisionalDiagnosisId,
        data.provisionalDiagnosisOther,
        data.remarks,
        data.userId,
        data.userId,
        this.status.active
      ])
      .then(res => {
        console.log(
          "database - insertProvisionalDiagnose() - Success -> " +
          JSON.stringify(res)
        );
        return true;
      })
      .catch(error => {
        console.warn(
          "database - insertProvisionalDiagnose() - Error -> " +
          JSON.stringify(error)
        );
        return false;
      });
  }

  updateProvisionalDiagnose(data) {
    let sql = `UPDATE ${this.table_provisionalDiagnosis} SET provisionalDiagnosisId = ?, provisionalDiagnosisOther = ?, remarks = ?, updatedBy = ?, updatedDate = datetime('now') WHERE patientId = ? AND servicePointId = ? AND vanId = ? AND provisionalDiagnosisId = ? AND visitId = ?`;
    return this.dbObject
      .executeSql(sql, [
        data.provisionalDiagnosisId,
        data.provisionalDiagnosisOther,
        data.remarks,
        data.userId,
        data.patientId,
        data.servicePointId,
        data.vanId,
        data.visitId
      ])
      .then(res => {
        console.log(
          "database - updateProvisionalDiagnose() - Success -> " +
          JSON.stringify(res)
        );
        return true;
      })
      .catch(error => {
        console.warn(
          "database - updateProvisionalDiagnose() - Error -> " +
          JSON.stringify(error)
        );
        return false;
      });
  }

  insertReferredTo(data) {
    let sql = `INSERT INTO ${this.table_referredTo} (patientId, visitId, deviceId, vanId, routeVillageId, servicePointId, compoundPatientId, visitCount, referralTypeId, otherPhc, remarks, insertedBy, insertedDate, updatedBy, updatedDate, uploadStatus) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,datetime('now'),?,datetime('now'),?)`;
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
        data.referralTypeId,
        data.otherPhc,
        data.remarks,
        data.userId,
        data.userId,
        this.status.active
      ])
      .then(res => {
        console.log(
          "database - insertReferredTo() - Success -> " + JSON.stringify(res)
        );
        return true;
      })
      .catch(error => {
        console.warn(
          "database - insertReferredTo() - Error -> " + JSON.stringify(error)
        );
        return false;
      });
  }

  updateReferredTo(data) {
    let sql = `UPDATE ${this.table_referredTo} SET referralTypeId = ?, otherPhc = ?, remarks = ?, updatedBy = ?, updatedDate = datetime('now') WHERE patientId = ? AND servicePointId = ? AND vanId = ? AND provisionalDiagnosisId = ? AND visitId = ?`;
    return this.dbObject
      .executeSql(sql, [
        data.referralTypeId,
        data.otherPhc,
        data.remarks,
        data.userId,
        data.patientId,
        data.servicePointId,
        data.vanId,
        data.visitId
      ])
      .then(res => {
        console.log(
          "database - updateReferredTo() - Success -> " + JSON.stringify(res)
        );
        return true;
      })
      .catch(error => {
        console.warn(
          "database - updateReferredTo() - Error -> " + JSON.stringify(error)
        );
        return false;
      });
  }

  insertDispense(data) {
    let sql = `INSERT INTO ${this.table_referredTo} (patientId, visitId, deviceId, vanId, routeVillageId, servicePointId, compoundPatientId, visitCount, itemId, itemTypeId, batchNo, brandName, expiryDate, duration, quantityGiven, quantityNeeded, dosage, remarks, insertedBy, insertedDate, updatedBy, updatedDate, uploadStatus) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,datetime('now'),?,datetime('now'),?)`;
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
        data.itemId,
        data.batchNo,
        data.brandName,
        data.expiryDate,
        data.duration,
        data.quantityGiven,
        data.quantityNeeded,
        data.dosage,
        data.remarks,
        data.userId,
        data.userId,
        this.status.active
      ])
      .then(res => {
        console.log(
          "database - insertDispense() - Success -> " + JSON.stringify(res)
        );
        return true;
      })
      .catch(error => {
        console.warn(
          "database - insertDispense() - Error -> " + JSON.stringify(error)
        );
        return false;
      });
  }

  insertAttendance(data) {
    let sql = `INSERT INTO ${this.table_attendances} (attendanceId, userId, sessionPeriodId, sessionTypeId , deviceId,  vanId,  insertedDate, sessionStart, sessionEnd) VALUES (?,?,?,?,?,?,datetime('now'),datetime('now'),datetime('now'))`;
    return this.dbObject
      .executeSql(sql, [
        data.attendanceId,
        data.userId,
        data.sessionPeriodId,
        data.sessionTypeId,
        data.deviceId,
        data.vanId
      ])
      .then(res => {
        console.log(
          "database - insertAttendance() - Success -> " + JSON.stringify(res)
        );
        return true;
      })
      .catch(error => {
        console.warn(
          "database - insertAttendance() - Error -> " + JSON.stringify(error)
        );
        return false;
      });
  }

  updateAttendance(data) {
    let sql = `UPDATE ${this.table_attendances} SET sessionTypeId = ?, vanId = ?, sessionEnd = datetime('now') WHERE sessionPeriodId = ? AND userId = ? AND insertedDate LIKE '%${data.dateYMD}%'`;
    return this.dbObject
      .executeSql(sql, [
        data.sessionTypeId,
        data.vanId,
        data.sessionPeriodId,
        data.userId
      ])
      .then(res => {
        console.log(
          "database - updateAttendance() - Success -> " + JSON.stringify(res)
        );
        return true;
      })
      .catch(error => {
        console.warn(
          "database - updateAttendance() - Error -> " + JSON.stringify(error)
        );
        return false;
      });
  }

  updateDispense(data) {
    let sql = `UPDATE ${this.table_dispenses} SET quantityGiven = ?, remarks = ?, updatedBy = ?, updatedDate = datetime('now') WHERE patientId = ? AND servicePointId = ? AND vanId = ? AND visitId = ?`;
    return this.dbObject
      .executeSql(sql, [
        data.quantityGiven,
        data.remarks,
        data.userId,
        data.patientId,
        data.servicePointId,
        data.vanId,
        data.visitId
      ])
      .then(res => {
        console.log(
          "database - updateDispense() - Success -> " + JSON.stringify(res)
        );
        return true;
      })
      .catch(error => {
        console.warn(
          "database - updateDispense() - Error -> " + JSON.stringify(error)
        );
        return false;
      });
  }

  updateStaff(data) {
    let sql = `UPDATE ${this.table_users} SET firstName = ?, lastName = ?, userName = ?, password = ?, genderId = ?, dob = ?, fatherName = ?, phone = ?, address = ?, email = ?, age = ?, ageTypeId = ?, doj = ?, roleId = ?, userImageUrl = ?, isActive = ?, deviceId = ?, vanId = ?, updatedBy = ?, updatedDate = datetime('now') WHERE userId = ?,`;
    return this.dbObject
      .executeSql(sql, [
        data.firstName,
        data.lastName,
        data.username,
        data.password,
        data.genderId,
        data.dob,
        data.fatherName,
        data.phone,
        data.address,
        data.email,
        data.age,
        data.ageTypeId,
        data.doj,
        data.roleId,
        data.userImageUrl,
        data.isActive,
        data.deviceId,
        data.vanId,
        data.userId,
        data.selectedUserId
      ])
      .then(res => {
        console.log(
          "database - updateStaff() - Success -> " + JSON.stringify(res)
        );
        return true;
      })
      .catch(error => {
        console.warn(
          "database - updateStaff() - Error -> " + JSON.stringify(error)
        );
        return false;
      });
  }

  saveSessionDetails(sessionDetails) {
    let sql = `INSERT INTO ${this.table_attendances} (userId, sessionPeriodId, sessionTypeId, deviceId, vanId, insertedDate, sessionStart, sessionEnd) VALUES (?,?,?,?,?, datetime('now'),datetime('now'), datetime('now'))`;
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
    let sql = `INSERT INTO ${this.table_servicePointLog} (deviceId, vanId, servicePointId, userId, insertedDate) VALUES (?,?,?,?, datetime('now'))`;
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
