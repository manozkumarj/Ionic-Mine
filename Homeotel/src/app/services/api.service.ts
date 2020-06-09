import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UtilitiesService } from "./utilities.service";

@Injectable()
export class ApiService {
  // apiUrl = "http://192.168.0.4:8123";
  // apiUrl = "http://192.168.43.22:8123";
  // apiUrl = "http://localhost:8123";
  // apiUrl = "http://175.101.1.227:8123";
  apiUrl = "https://f8uqreqtkf.execute-api.ap-south-1.amazonaws.com/beta/user";

  constructor(private http: HttpClient, private utilities: UtilitiesService) {}

  // get node id from APi
  getNodeDetails() {
    var path = "/node_details";
    return this.http.get(this.apiUrl + path);
  }

  // Register user
  registerUser(username, email, password) {
    console.log("username -> " + username);

    var body = {
      access_token: "tele-homeo",
      request_type: "USER_REGISTER",
      userName: username,
      email,
      password,
    };
    return this.http.post(this.apiUrl, body);
  }

  // Login user
  loginUser(username, password) {
    var body = {
      access_token: "tele-homeo",
      request_type: "USER_LOGIN",
      userName: username,
      password: password,
    };
    return this.http.post(this.apiUrl, body);
  }

  // Fetching current user related doctors
  getProfileDetails() {
    var body = {
      access_token: "tele-homeo",
      request_type: "USER_DETAILS_GET",
      userId: this.utilities.userId,
    };
    return this.http.post(this.apiUrl, body);
  }

  // Fetching current user related doctors
  getCurrentUserDoctors() {
    var body = {
      access_token: "tele-homeo",
      request_type: "USER_DOCTORS_GET",
      userId: this.utilities.userId,
    };
    return this.http.post(this.apiUrl, body);
  }

  // Searching doctor with UUID
  findDoctor(uuid) {
    var body = {
      access_token: "tele-homeo",
      request_type: "USER_DOCTOR_SEARCH",
      userId: this.utilities.userId,
      uuid: uuid,
    };
    return this.http.post(this.apiUrl, body);
  }

  // getting doctor's homeokits
  getCurrentDoctorsHomeokits(doctorId) {
    var body = {
      access_token: "tele-homeo",
      request_type: "USER_DOCTOR_KITS_GET",
      userId: this.utilities.userId,
      doctorId: doctorId,
    };
    return this.http.post(this.apiUrl, body);
  }

  // getting user's appointments
  getAppointments() {
    var body = {
      access_token: "tele-homeo",
      request_type: "USER_APPOINTMENTS_GET",
      userId: this.utilities.userId,
    };
    return this.http.post(this.apiUrl, body);
  }

  // adding doctor to user
  addDoctor(doctorId) {
    var body = {
      access_token: "tele-homeo",
      request_type: "USER_DOCTORS_ADD",
      userId: this.utilities.userId,
      doctorId,
    };
    return this.http.post(this.apiUrl, body);
  }

  // Purchasing homeokit
  purchaseHomeokit(doctorId, kitId, price) {
    var body = {
      access_token: "tele-homeo",
      request_type: "USER_PURCHASE_KIT",
      userId: this.utilities.userId,
      doctorId,
      kitId,
      price,
    };
    return this.http.post(this.apiUrl, body);
  }

  // Fetch doctor consultant details masters
  getDoctorConsultantDetailsMasters(doctorId) {
    var body = {
      access_token: "tele-homeo",
      request_type: "DOCTOR_CONSULTANT_MASTERS_GET",
      userId: this.utilities.userId,
      doctorId: doctorId,
    };
    return this.http.post(this.apiUrl, body);
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
    var body = {
      access_token: "tele-homeo",
      request_type: "USER_APPOINTMENT_BOOK",
      appointmentId,
      userId: this.utilities.userId,
      doctorId,
      relativeId,
      price,
      dateNtime,
      modeId,
      mainComplaint,
    };
    return this.http.post(this.apiUrl, body);
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
    var body = {
      access_token: "tele-homeo",
      request_type: "USER_UPSERT_COMPLAINT_DETAILS",
      appointmentId,
      userId: this.utilities.userId,
      doctorId,
      relativeId,
      isRecurring,
      recurringFreq,
      severityId,
      complaintDescription,
    };
    return this.http.post(this.apiUrl, body);
  }

  // Update user profile details
  updateUserProfileDetails(columnName, value) {
    var body = {
      access_token: "tele-homeo",
      request_type: "USER_PROFILE_UPDATE",
      userId: this.utilities.userId,
      columnName,
      value,
    };
    return this.http.post(this.apiUrl, body);
  }

  // Update user photo
  upsertUserPhoto(relativeId, photo) {
    var body = {
      access_token: "tele-homeo",
      request_type: "USER_PHOTO_SAVE",
      userId: this.utilities.userId,
      relativeId,
      photo,
    };
    return this.http.post(this.apiUrl, body);
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
    var body = {
      access_token: "tele-homeo",
      request_type: "USER_UPSERT_VITALS",
      userId: this.utilities.userId,
      vitalId,
      relativeId,
      temperature,
      pulserate,
      respiratoryrate,
      bpSystolic,
      bpDiastolic,
    };
    return this.http.post(this.apiUrl, body);
  }

  // Fetching vitals
  getVitals() {
    var body = {
      access_token: "tele-homeo",
      request_type: "USER_VITALS_GET",
      userId: this.utilities.userId,
      relativeId: this.utilities.selectedRelativeId,
    };
    return this.http.post(this.apiUrl, body);
  }

  // Fetching Files
  getFiles() {
    var body = {
      access_token: "tele-homeo",
      request_type: "USER_FILES_GET",
      userId: this.utilities.userId,
      relativeId: this.utilities.selectedRelativeId,
    };
    return this.http.post(this.apiUrl, body);
  }

  // Upserting File details
  upsertFileDetails(fileId, relativeId, fileTypeId, photo) {
    var body = {
      access_token: "tele-homeo",
      request_type: "USER_FILE_UPSERT",
      userId: this.utilities.userId,
      relativeId,
      fileId,
      fileTypeId,
      photo,
    };
    return this.http.post(this.apiUrl, body);
  }

  getIssues() {
    var body = {
      access_token: "tele-homeo",
      request_type: "ISSUE_MASTER_GET",
    };
    return this.http.post(this.apiUrl, body);
  }

  saveIssue(issueTypeId, email, phone, issueDescrption) {
    var body = {
      access_token: "tele-homeo",
      request_type: "USER_ISSUE_SAVE",
      userId: this.utilities.userId,
      issueTypeId: issueTypeId,
      email: email,
      phone: phone,
      issueDescrption: issueDescrption,
    };
    return this.http.post(this.apiUrl, body);
  }

  // Getting medical history details & masters
  getMedicalHistories() {
    var body = {
      access_token: "tele-homeo",
      request_type: "USER_ISSUE_SAVE",
      userId: this.utilities.userId,
      relativeId: this.utilities.selectedRelativeId,
    };
    return this.http.post(this.apiUrl, body);
  }

  // Upserting allergies
  upsertMedicalHistory(
    selectedMedicalHistoryTag,
    relativeId,
    commaSeparatedAllergies,
    insertableAlleryObject
  ) {
    var body = {
      access_token: "tele-homeo",
      request_type: "USER_UPSERT_MEDICAL_HISTORY",
      selectedMedicalHistoryTag,
      userId: this.utilities.userId,
      relativeId,
      commaSeparatedAllergies,
      insertableAlleryObject,
    };
    return this.http.post(this.apiUrl, body);
  }

  // Getting Lifestyle details & masters
  getLifestyles() {
    var body = {
      access_token: "tele-homeo",
      request_type: "LIFESTYLE_MASTERS_AND_DATA_GET",
      userId: this.utilities.userId,
      relativeId: this.utilities.selectedRelativeId,
    };
    return this.http.post(this.apiUrl, body);
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
    var body = {
      access_token: "tele-homeo",
      request_type: "USER_UPSERT_LIFESTYLE",
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
    return this.http.post(this.apiUrl, body);
  }

  // Deleting vital
  deleteVital(vitalId) {
    var body = {
      access_token: "tele-homeo",
      request_type: "USER_VITALS_DELETE",
      vitalId: vitalId,
    };
    return this.http.post(this.apiUrl, body);
  }

  // Deleting file
  deleteFile(fileId) {
    var body = {
      access_token: "tele-homeo",
      request_type: "USER_FILE_DELETE",
      fileId: fileId,
    };
    return this.http.post(this.apiUrl, body);
  }

  // Getting relations medical history details & masters
  getRelationsMedicalHistories() {
    var body = {
      access_token: "tele-homeo",
      request_type: "RELATIONS_MEDICAL_HISTORY_MASTERS_AND_DATA_GET",
      userId: this.utilities.userId,
      relativeId: this.utilities.selectedRelativeId,
    };
    return this.http.post(this.apiUrl, body);
  }

  // Getting relations masters
  getRelationsMasters() {
    var body = {
      access_token: "tele-homeo",
      request_type: "RELATION_MASTERS_GET",
    };
    return this.http.post(this.apiUrl, body);
  }

  // Upserting upsertRelationMedicalHistory
  upsertRelationMedicalHistory(userId, relativeId, relationId, commaSeparated) {
    var body = {
      access_token: "tele-homeo",
      request_type: "USER_UPSERT_RELATION_MEDICAL_HISTORY",
      userId,
      relativeId,
      relationId,
      commaSeparated,
    };
    return this.http.post(this.apiUrl, body);
  }

  // Update user photo
  addUserRelative(relativeName, relationId, photo) {
    var body = {
      access_token: "tele-homeo",
      request_type: "USER_RELATIVE_ADD",
      userId: this.utilities.userId,
      relativeName,
      relationId,
      photo,
    };
    return this.http.post(this.apiUrl, body);
  }

  // Getting user's relatives
  getUserRelatives() {
    var body = {
      access_token: "tele-homeo",
      request_type: "USER_RELATIVES_GET",
      userId: this.utilities.userId,
    };
    return this.http.post(this.apiUrl, body);
  }

  cancelAppointment(appointmentId) {
    var body = {
      access_token: "tele-homeo",
      request_type: "USER_APPOINTMENT_CANCEL",
      appointmentId: appointmentId,
    };
    return this.http.post(this.apiUrl, body);
  }

  getDoctorMasters() {
    var body = {
      access_token: "tele-homeo",
      request_type: "DOCTOR_MASTERS_GET",
    };
    return this.http.post(this.apiUrl, body);
  }

  getDoctorProfile(doctorId) {
    var body = {
      access_token: "tele-homeo",
      request_type: "DOCTOR_PROFILE_GET",
      doctorId,
    };
    return this.http.post(this.apiUrl, body);
  }
}
