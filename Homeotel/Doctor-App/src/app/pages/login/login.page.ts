import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { CommonService } from "src/app/services/common.service";
import { ApiService } from "src/app/services/api.service";
import { ToastController } from "@ionic/angular";
import { UtilitiesService } from "src/app/services/utilities.service";
import { LoadingController } from "@ionic/angular";
import { DatabaseService } from "src/app/services/database.service";
import { AuthService } from "src/app/services/auth.service";

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
  flag = 0;

  formsDivHeight = "215px";

  loginLeftValue;
  registerLeftValue;
  btnLeftValue;

  focusedForm = "login";

  constructor(
    private router: Router,
    public commonService: CommonService,
    public auth: AuthService,
    private apiService: ApiService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private db: DatabaseService,
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

  async submit() {
    console.log(this.registrationForm.value);
    let focused;

    if (this.focusedForm == "login") {
      focused = "login";
      if (this.userName.value == null || this.password.value == null) {
        this.commonService.presentToast("Please enter details", "toastError");
        return;
      }

      const loading = await this.loadingController
        .create({
          message: "Please wait...",
          translucent: true,
        })
        .then((a) => {
          a.present().then(async (res) => {
            this.apiService
              .login(this.userName.value, this.password.value)
              .subscribe((data) => {
                a.dismiss();
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
                    this.auth.isLoggedIn = true;
                    this.commonService.currentDoctorId = userData[0]["id"];
                    this.commonService.currentDoctorName = userData[0]["name"];

                    if (userData[0]["photo"]) {
                      this.commonService.currentDoctorPhoto =
                        userData[0]["photo"];
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
          });
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
      const loading = await this.loadingController
        .create({
          message: "Please wait...",
          translucent: true,
        })
        .then((a) => {
          a.present().then(async (res) => {
            this.apiService
              .register(
                this.regUserName.value,
                this.regEmail.value,
                this.regPassword.value
              )
              .subscribe((data) => {
                console.log("Returned from Backend");
                console.log(data);
                a.dismiss();
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
                  // d_doctor related
                  let res = data[0][0];
                  if (res["query"]) {
                    let receivedQuery = res["query"];
                    console.log(receivedQuery);

                    this.db
                      .crudOperations(receivedQuery)
                      .then((res) => {
                        a.dismiss();
                        console.log("signup details saved successfully");
                      })
                      .catch((error) => {
                        this.utilities.sqlLiteErrorTrigger(
                          "login * register",
                          error
                        );
                        a.dismiss();
                        console.error(
                          "Error -> signup crudOperations function returned error." +
                            JSON.stringify(error)
                        );
                      });
                  } else {
                    a.dismiss();
                    this.utilities.sqlLiteErrorTrigger(
                      "login * register",
                      "Query property is not received from backend SP"
                    );
                    console.log(
                      "Query property is not received from backend SP"
                    );
                  }

                  // dd_mode related
                  if (data[0][0]["query1"]) {
                    let receivedQuery1 = data[0][0]["query1"];
                    console.log(receivedQuery1);

                    this.db
                      .crudOperations(receivedQuery1)
                      .then((res) => {
                        a.dismiss();
                        console.log("signup details saved successfully");
                      })
                      .catch((error) => {
                        this.utilities.sqlLiteErrorTrigger(
                          "login * register",
                          error
                        );
                        a.dismiss();
                        console.error(
                          "Error -> signup crudOperations function returned error." +
                            JSON.stringify(error)
                        );
                      });
                  } else {
                    a.dismiss();
                    this.utilities.sqlLiteErrorTrigger(
                      "login * register",
                      "Query1 property is not received from backend SP"
                    );
                    console.log(
                      "Query1 property is not received from backend SP"
                    );
                  }

                  this.commonService.presentToast(
                    "registered successfully.please login",
                    "toastSuccess"
                  );
                  this.login();
                  this.registrationForm.reset();
                }
              });
          });
        });
    }
    console.log("submit() triggered - focused form is -> " + focused);
  }
}
