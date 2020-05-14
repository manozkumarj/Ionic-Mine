import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { ToastController } from "@ionic/angular";
import { ApiService } from "./../../services/api.service";
import { UtilitiesService } from "./../../services/utilities.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  registerForm: FormGroup;
  loginForm: FormGroup;

  formsDivHeight = "215px";

  loginLeftValue;
  registerLeftValue;
  btnLeftValue;

  focusedForm = "login";
  toastErrorMsg;
  toastSuccessMsg;

  constructor(
    private router: Router,
    public auth: AuthService,
    private apiService: ApiService,
    public utilities: UtilitiesService,
    private toastController: ToastController
  ) {
    this.registerForm = new FormGroup({
      username: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });

    this.loginForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
    this.auth.isLoggedIn = false;
  }

  async presentToastSuccess() {
    const toast = await this.toastController.create({
      message: this.toastSuccessMsg,
      duration: 2000,
      cssClass: "toast-success",
      animated: true,
    });
    toast.present();
  }

  async presentToastWarning() {
    const toast = await this.toastController.create({
      message: this.toastErrorMsg,
      duration: 2000,
      cssClass: "toast-error",
      animated: true,
    });
    toast.present();
  }

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
      username: "",
      email: "",
      password: "",
    });
  }

  resetLoginFormValues() {
    this.loginForm.patchValue({
      username: "",
      password: "",
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
    let password = this.registerForm.get("password").value.trim();

    if (username && email && password) {
      this.apiService
        .registerUser(username, email, password)
        .subscribe((data) => {
          console.log("Returned from Backend");
          // console.log(JSON.stringify(data));
          if (this.utilities.isInvalidApiResponseData(data)) {
            console.log("Returned Error");
            // console.log(data[0][0]);
            if (data[0][0]["error"].includes(username)) {
              this.toastErrorMsg = "Username already exist";
            } else if (data[0][0]["error"].includes(email)) {
              this.toastErrorMsg = "Email already exist";
            } else {
              this.toastErrorMsg = "Something went wrong";
            }
            this.presentToastWarning();
          } else {
            console.log("Returned Success");
            this.toastSuccessMsg = "Success, you can login now.";
            this.presentToastSuccess();
            this.loginTab();
            this.resetRegisterFormValues();
          }
        });
    } else {
      this.toastErrorMsg = "Please enter username, email, and password.";
      this.presentToastWarning();
    }
  }

  login() {
    console.log("About Login");
    console.log(this.loginForm.value);
    let username = this.loginForm.get("username").value.trim();
    let password = this.loginForm.get("password").value.trim();

    username = "manoj";
    password = "manoj";

    if (username && password) {
      this.apiService.loginUser(username, password).subscribe((data) => {
        console.log("Returned from Backend");
        // console.log(JSON.stringify(data));
        if (
          typeof data != "undefined" &&
          typeof data[0] != "undefined" &&
          typeof data[0][0] != "undefined"
        ) {
          if (this.utilities.isInvalidApiResponseData(data)) {
            console.log("Returned Error");
            this.presentToastWarning();
          } else {
            let res = data[0][0];
            this.auth.isLoggedIn = true;
            console.log("Returned Success");
            this.toastSuccessMsg = "Login Success.";
            this.presentToastSuccess();
            this.utilities.isLoggedId = true;
            this.utilities.userId = res["user_id"];
            this.utilities.currentUserDetails["userName"] = res["name"]
              ? res["name"]
              : res["username"];
            this.utilities.currentUserDetails["photo"] = res["photo"];
            this.router.navigate(["/home"]);
            this.resetLoginFormValues();
          }
        } else {
          console.log("Returned from Backend");
          this.toastErrorMsg =
            "Invalid username or password entered. Please check and try again.";
          this.presentToastWarning();
        }
      });
    } else {
      this.toastErrorMsg = "Please enter username and password.";
      this.presentToastWarning();
    }
  }
}
