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
      password
    };
    return this.http.post(this.apiUrl + path, body);
  }

  // Login user
  loginUser(username, password) {
    var path = "/user/login";
    var body = {
      username: username,
      password: password
    };
    return this.http.post(this.apiUrl + path, body);
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
    var path = "/user/doctor-homeokits/" + doctorId;
    return this.http.get(this.apiUrl + path);
  }
}
