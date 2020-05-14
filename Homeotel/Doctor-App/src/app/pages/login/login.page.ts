import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { CommonService } from "src/app/services/common.service";
import { ApiService } from "src/app/services/api.service";
import { ToastController } from "@ionic/angular";
import { UtilitiesService } from "src/app/services/utilities.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  userName;
  password;
  registrationForm: FormGroup;
  regUserName;
  regEmail;
  regPassword;
  flag =0;

  formsDivHeight = "215px";

  loginLeftValue;
  registerLeftValue;
  btnLeftValue;

  focusedForm = "login";

  constructor(
    private router: Router,
    public commonService: CommonService,
    private apiService: ApiService,
    private toastController: ToastController,
    private utilities: UtilitiesService
  ) {}

  ngOnInit() {
    this.createLoginControls();
    this.createLoginForm();
    this.createRegisterControls();
    this.createRegisterForm();
  }

  createLoginControls() {
    this.userName = new FormControl();
    this.password = new FormControl();
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      userName: this.userName,
      password: this.password,
    });
  }

  createRegisterControls() {
    this.regUserName = new FormControl();
    this.regEmail = new FormControl();
    this.regPassword = new FormControl();
  }

  createRegisterForm() {
    this.registrationForm = new FormGroup({
      regUserName: this.regUserName,
      regEmail: this.regEmail,
      regPassword: this.regPassword,
    });
  }
  register() {
    this.flag = 1;
    this.formsDivHeight = "315px";
    this.loginLeftValue = "-400px";
    this.registerLeftValue = "25px";
    this.btnLeftValue = "110px";

    this.focusedForm = "register";
    console.log("register() triggered");
  }

  login() {
    this.flag = 0;
    this.formsDivHeight = "215px";
    this.loginLeftValue = "25px";
    this.registerLeftValue = "450px";
    this.btnLeftValue = "0px";

    this.focusedForm = "login";
    console.log("login() triggered");
  }

  submit() {
    console.log(this.registrationForm.value);
    let focused;

    if (this.focusedForm == "login") {
      focused = "login";
      if (this.userName.value == null || this.password.value == null) {
        this.commonService.presentToast("Please enter details", "toastError");
        return;
      }
      this.apiService
        .login(this.userName.value, this.password.value)
        .subscribe((data) => {
          if (this.utilities.isInvalidApiResponseData(data)) {
            this.commonService.presentToast(
              "Something went wrong",
              "toastError"
            );
          } else {
            let userData = data[0];
            console.log(userData);
            if (userData.length == 0) {
              this.commonService.presentToast(
                "Invalid username or password.please try again",
                "toastError"
              );
            } else {
              console.log(userData);
              this.commonService.currentDoctorId = userData[0]["id"];
              this.commonService.currentDoctorName = userData[0]["name"];

              if (userData[0]["photo"]) {
                this.commonService.currentDoctorPhoto = userData[0]["photo"];
              }

              console.log(this.commonService.currentDoctorId);
              this.commonService.presentToast(
                "logged succesfully",
                "toastSuccess"
              );
              this.router.navigate(["/home"]);
              this.loginForm.reset();
            }
          }
        });
    } else {
      focused = "register";
      if (
        this.regEmail.value == null ||
        this.regPassword.value == null ||
        this.regUserName.value == null
      ) {
        this.commonService.presentToast("Please enter details", "toastError");
        return;
      }
      this.apiService
        .register(
          this.regUserName.value,
          this.regEmail.value,
          this.regPassword.value
        )
        .subscribe((data) => {
          if (this.utilities.isInvalidApiResponseData(data)) {
            if (data[0][0]["error"].toString().includes("username")) {
              this.commonService.presentToast(
                "user name already exits .please login",
                "toastError"
              );
              this.login();
            } else {
              console.log(data);
              this.commonService.presentToast(
                "Something went wrong",
                "toastError"
              );
            }
          } else {
            this.commonService.presentToast(
              "registered successfully.please login",
              "toastSuccess"
            );
            this.login();
            this.registrationForm.reset();
          }
        });
    }
    console.log("submit() triggered - focused form is -> " + focused);
  }
}
