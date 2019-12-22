import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { DatabaseService } from "src/app/services/database.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  admins: any[] = [];
  loginForm: FormGroup;

  constructor(private db: DatabaseService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    this.db
      .getAdmins()
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
    this.db
      .login(username, password)
      .then(data => {
        if (data) {
          console.log("User exist & the user ID is -> " + data);
          // this.router.navigate(["/session-selection"]);
        } else {
          console.log("User didn't exist -> " + data);
        }
      })
      .catch(error => {
        console.error(
          "Error -> onSubmit() function returned error." + JSON.stringify(error)
        );
      });
  }
}
