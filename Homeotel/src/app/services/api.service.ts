import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UtilitiesService } from "./utilities.service";

@Injectable()
export class ApiService {
  // apiUrl = "http://192.168.43.22:8123";
  apiUrl = "http://localhost:8123";
  // apiUrl = "http://175.101.1.227:8123";
  constructor(private http: HttpClient, private utilities: UtilitiesService) {}

  // get node id from APi
  getNodeDetails() {
    var path = "/node_details";
    return this.http.get(this.apiUrl + path);
  }

  // Register user
  registerUser(username, email, password) {
    console.log("username -> " + username);
    var path = "/user/register";
    var body = {
      username,
      email,
      password,
    };
    return this.http.post(this.apiUrl + path, body);
  }

  // Login user
  loginUser(username, password) {
    var path = "/user/login";
    var body = {
      username: username,
      password: password,
    };
    return this.http.post(this.apiUrl + path, body);
  }

  // Fetching current user related doctors
  getProfileDetails() {
    var path = "/user/user-details/" + this.utilities.userId;
    return this.http.get(this.apiUrl + path);
  }

  // Fetching current user related doctors
  getCurrentUserDoctors() {
    var path = "/user/my-doctors/" + this.utilities.userId;
    return this.http.get(this.apiUrl + path);
  }

  // Searching doctor with UUID
  findDoctor(uuid) {
    var path = "/user/find-doctor/" + uuid;
    return this.http.get(this.apiUrl + path);
  }

  // getting doctor's homeokits
  getCurrentDoctorsHomeokits(doctorId) {
    var path =
      "/user/doctor-homeokits/" + doctorId + "/" + this.utilities.userId;
    return this.http.get(this.apiUrl + path);
  }

  // getting user's appointments
  getAppointments() {
    var path = "/user/appointments/" + this.utilities.userId;
    return this.http.get(this.apiUrl + path);
  }

  // adding doctor to user
  addDoctor(doctorId) {
    var path = "/user/add-doctor";
    var body = {
      userId: this.utilities.userId,
      doctorId,
    };
    return this.http.post(this.apiUrl + path, body);
  }

  // Purchasing homeokit
  purchaseHomeokit(doctorId, kitId, price) {
    var path = "/user/purchase-homeokit";
    var body = {
      userId: this.utilities.userId,
      doctorId,
      kitId,
      price,
    };
    return this.http.post(this.apiUrl + path, body);
  }

  // Fetch doctor consultant details masters
  getDoctorConsultantDetailsMasters(doctorId) {
    var path = "/user/doctor-consultant-details-masters/" + doctorId;
    return this.http.get(this.apiUrl + path);
  }

  // Booking an appointment
  bookAppointment(
    appointmentId,
    doctorId,
    relativeId,
    price,
    dateNtime,
    modeId,
    mainComplaint
  ) {
    var path = "/user/book-appointment";
    var body = {
      appointmentId,
      userId: this.utilities.userId,
      doctorId,
      relativeId,
      price,
      dateNtime,
      modeId,
      mainComplaint,
    };
    return this.http.post(this.apiUrl + path, body);
  }

  // Upserting complaint details
  upsertComplaintDetails(
    appointmentId,
    doctorId,
    relativeId,
    isRecurring,
    recurringFreq,
    severityId,
    complaintDescription
  ) {
    var path = "/user/upsert-complaint-details";
    var body = {
      appointmentId,
      userId: this.utilities.userId,
      doctorId,
      relativeId,
      isRecurring,
      recurringFreq,
      severityId,
      complaintDescription,
    };
    return this.http.post(this.apiUrl + path, body);
  }

  // Update user profile details
  updateUserProfileDetails(columnName, value) {
    var path = "/user/update-profile";
    var body = {
      userId: this.utilities.userId,
      columnName,
      value,
    };
    return this.http.post(this.apiUrl + path, body);
  }

  // Update user photo
  upsertUserPhoto(relativeId, photo) {
    var path = "/user/photo-save";
    var body = {
      userId: this.utilities.userId,
      relativeId,
      photo,
    };
    return this.http.post(this.apiUrl + path, body);
  }

  // Upserting vital details
  upsertVitalDetails(
    vitalId,
    relativeId,
    temperature,
    pulserate,
    respiratoryrate,
    bpSystolic,
    bpDiastolic
  ) {
    var path = "/user/upsert-vital";
    var body = {
      userId: this.utilities.userId,
      vitalId,
      relativeId,
      temperature,
      pulserate,
      respiratoryrate,
      bpSystolic,
      bpDiastolic,
    };
    return this.http.post(this.apiUrl + path, body);
  }

  // Fetching vitals
  getVitals() {
    var path = "/user/get-vitals/" + this.utilities.userId;
    return this.http.get(this.apiUrl + path);
  }

  // Fetching Files
  getFiles() {
    var path = "/user/get-files/" + this.utilities.userId;
    return this.http.get(this.apiUrl + path);
  }

  // Upserting File details
  upsertFileDetails(fileId, relativeId, fileTypeId, photo) {
    var path = "/user/upsert-file";
    var body = {
      userId: this.utilities.userId,
      relativeId,
      fileId,
      fileTypeId,
      photo,
    };
    return this.http.post(this.apiUrl + path, body);
  }

  getIssues() {
    var path = "/user/master/issue";
    return this.http.get(this.apiUrl + path);
  }

  saveIssue(issueTypeId, email, phone, issueDescrption) {
    var path = "/user/issue";

    var body = {
      userId: this.utilities.userId,
      issueTypeId: issueTypeId,
      email: email,
      phone: phone,
      issueDescrption: issueDescrption,
    };
    return this.http.post(this.apiUrl + path, body);
  }

  // Getting medical history details & masters
  getMedicalHistories() {
    var path =
      "/user/medical-history-masters-and-data/" +
      this.utilities.userId +
      "/" +
      this.utilities.selectedRelativeId;
    return this.http.get(this.apiUrl + path);
  }

  // Upserting allergies
  upsertMedicalHistory(
    selectedMedicalHistoryTag,
    relativeId,
    commaSeparatedAllergies,
    insertableAlleryObject
  ) {
    var path = "/user/upsert-medical-history";
    var body = {
      selectedMedicalHistoryTag,
      userId: this.utilities.userId,
      relativeId,
      commaSeparatedAllergies,
      insertableAlleryObject,
    };
    return this.http.post(this.apiUrl + path, body);
  }

  // Getting Lifestyle details & masters
  getLifestyles() {
    var path =
      "/user/lifestyle-masters-and-data/" +
      this.utilities.userId +
      "/" +
      this.utilities.selectedRelativeId;
    return this.http.get(this.apiUrl + path);
  }

  // Upserting lifestyle
  updateUserLifestyleDetails(
    smokingId,
    alcoholId,
    excerciseId,
    activityId,
    professionId,
    foodId,
    heatId
  ) {
    var path = "/user/upsert-lifestyle";
    var body = {
      userId: this.utilities.userId,
      relativeId: this.utilities.selectedRelativeId,
      smokingId,
      alcoholId,
      excerciseId,
      activityId,
      professionId,
      foodId,
      heatId,
    };
    return this.http.post(this.apiUrl + path, body);
  }

  // Deleting vital
  deleteVital(vitalId) {
    var path = "/user/delete-vital/" + vitalId;
    return this.http.get(this.apiUrl + path);
  }

  // Deleting file
  deleteFile(fileId) {
    var path = "/user/delete-file/" + fileId;
    return this.http.get(this.apiUrl + path);
  }

  // Getting relations medical history details & masters
  getRelationsMedicalHistories() {
    var path =
      "/user/relations-medical-history-masters-and-data/" +
      this.utilities.userId +
      "/" +
      this.utilities.selectedRelativeId;
    return this.http.get(this.apiUrl + path);
  }

  // Upserting upsertRelationMedicalHistory
  upsertRelationMedicalHistory(userId, relativeId, relationId, commaSeparated) {
    var path = "/user/upsert-relation-medical-history";
    var body = {
      userId,
      relativeId,
      relationId,
      commaSeparated,
    };
    return this.http.post(this.apiUrl + path, body);
  }
}
