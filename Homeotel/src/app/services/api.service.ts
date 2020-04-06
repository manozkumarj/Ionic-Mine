import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UtilitiesService } from "./utilities.service";

@Injectable()
export class ApiService {
  apiUrl = "http://localhost:8088";
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
}
