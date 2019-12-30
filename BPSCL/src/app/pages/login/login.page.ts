import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { DatabaseService } from "src/app/services/database.service";
import { Router } from "@angular/router";
import { StorageService } from "./../../services/storage.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  admins: any[] = [];
  loginForm: FormGroup;

  constructor(
    private db: DatabaseService,
    private router: Router,
    private storageService: StorageService
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    this.db
      .getUsers()
      .then(users => {
        this.admins = users;
        console.log("Total No. of users = " + users.length);
        console.log("Total users are ==> " + JSON.stringify(users));
      })
      .catch(error => {
        console.error("Database Error " + JSON.stringify(error));
      });
  }

  onSubmit(values) {
    let username = this.loginForm.get("username").value;
    let password = this.loginForm.get("password").value;
    console.log("Login form is submitted, below are the values");
    console.log(values);

    if (!username || username == null) {
      alert("Please enter Username");
      return false;
    }
    if (!password || password == null) {
      alert("Please enter Password");
      return false;
    }

    this.db
      .login(username, password)
      .then(res => {
        if (res.length > 0) {
          let userDetails = res[0];
          console.log(
            "User exist & the user details -> " + JSON.stringify(userDetails)
          );
          console.log("Storable userId -> " + userDetails["userId"]);
          this.storageService
            .setObject("userDetails", {
              firstName: userDetails["firstName"],
              lastName: userDetails["lastName"],
              fullName:
                userDetails["firstName"] + " " + userDetails["lastName"],
              userId: userDetails["userId"],
              roleId: userDetails["roleId"],
              deviceId: userDetails["deviceId"],
              vanId: userDetails["vanId"]
            })
            .then(data => {
              console.log("User details are stored in localStorage -> " + data);
            })
            .catch(error => {
              console.error(
                "User details are not stored in localStorage -> " + error
              );
            });
          this.router.navigate(["/session-selection"]);
        } else {
          console.warn("User didn't exist -> " + res);
        }
      })
      .catch(error => {
        console.error(
          "Error -> onSubmit() function returned error." + JSON.stringify(error)
        );
      });
  }
}
