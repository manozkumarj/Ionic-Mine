import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { ApiService } from "./../../services/api.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  registerForm: FormGroup;
  loginForm: FormGroup;

  formsDivHeight = "215px";

  loginLeftValue;
  registerLeftValue;
  btnLeftValue;

  focusedForm = "login";

  constructor(
    private router: Router,
    public auth: AuthService,
    private apiService: ApiService
  ) {
    this.registerForm = new FormGroup({
      username: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });

    this.loginForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {}

  registerTab() {
    this.formsDivHeight = "315px";
    this.loginLeftValue = "-400px";
    this.registerLeftValue = "25px";
    this.btnLeftValue = "110px";

    this.focusedForm = "register";
    console.log("register() triggered");
  }

  loginTab() {
    this.formsDivHeight = "215px";
    this.loginLeftValue = "25px";
    this.registerLeftValue = "450px";
    this.btnLeftValue = "0px";

    this.focusedForm = "login";
    console.log("login() triggered");
  }

  resetRegisterFormValues() {
    this.registerForm.patchValue({
      username: null,
      email: null,
      password: null
    });
  }

  resetLoginFormValues() {
    this.registerForm.patchValue({
      username: null,
      password: null
    });
  }

  submit() {
    console.clear();
    // alert("You can only login with Gmail");
    let focused;
    if (this.focusedForm == "login") {
      focused = "login";
      this.login();
      // this.router.navigate(["/home"]);
    } else {
      focused = "register";
      this.register();
      // this.loginTab();
    }
    console.log("submit() triggered - focused form is -> " + focused);
  }

  register() {
    console.log("About register");
    console.log(this.registerForm.value);
    let username = this.registerForm.get("username").value.trim();
    let email = this.registerForm.get("email").value.trim();
    let passord = this.registerForm.get("password").value.trim();

    if (username && email && passord) {
      this.apiService.registerUser(username, email, passord).subscribe(data => {
        console.log("Returned from Backend");
        console.log(JSON.stringify(data));
      });
    }
  }

  login() {
    console.log("About Login");
    console.log(this.loginForm.value);
    let username = this.loginForm.get("username").value.trim();
    let passord = this.loginForm.get("password").value.trim();

    if (username && passord) {
      this.apiService.loginUser(username, passord).subscribe(data => {
        console.log("Returned from Backend");
        console.log(JSON.stringify(data));
      });
    }
  }
}
