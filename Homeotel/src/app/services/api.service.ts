import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ApiService {
  apiUrl;
  constructor(private http: HttpClient) {}

  // get node id from APi
  getNodeDetails() {
    var path = "node_details";
    return this.http.get(this.apiUrl + path);
  }

  // Login user
  loginUser(username, password) {
    var path = "user/login";
    var body = {
      username: username,
      password: password
    };
    return this.http.post(this.apiUrl + path, body);
  }

  // Register user
  registerUser(username, email, password) {
    var path = "user/register";
    var body = {
      username,
      email,
      password
    };
    return this.http.post(this.apiUrl + path, body);
  }
}
