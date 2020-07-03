import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { ToastController } from "@ionic/angular";
import { ApiService } from "./../../services/api.service";
import { UtilitiesService } from "./../../services/utilities.service";
import { Platform } from "@ionic/angular";
import { LoadingController } from "@ionic/angular";
import { DatabaseService } from "src/app/services/database.service";
import { CommonService } from "src/app/services/common.service";
import { Auth } from "aws-amplify";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { BroadcastChannel } from 'broadcast-channel';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  faArrowRight = faArrowRight;
  backButtonSubscription;
  registerForm: FormGroup;
  loginForm: FormGroup;
  verificationForm: FormGroup;

  formsDivHeight = "215px";

  loginLeftValue;
  registerLeftValue;
  btnLeftValue;

  focusedForm = "login";
  toastErrorMsg;
  toastSuccessMsg;

  verifiableEmail = null; // "manojkumarzoltglobal@gmail.com"; // 550103
  showVerificationForm = false;

  constructor(
    private router: Router,
    public auth: AuthService,
    private db: DatabaseService,
    private apiService: ApiService,
    public utilities: UtilitiesService,
    private commonService: CommonService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private platform: Platform
  ) {
    //temp
    const channel = new BroadcastChannel('foobar');    
    channel.onmessage = msg => console.dir(msg);

    this.registerForm = new FormGroup({
      username: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });

    this.loginForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });

    this.verificationForm = new FormGroup({
      verificationCode: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
    this.auth.isLoggedIn = false;
  }

  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      navigator["app"].exitApp();
    });
  }

  showLoginForm() {
    this.showVerificationForm = false;
  }

  ionViewWillEnter() {
    this.auth.isLoggedIn = false;
    clearInterval(this.commonService.loadAppointmentsInterval);
    clearInterval(this.commonService.alertShowableInterval);
    // this.confirm();
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
    this.formsDivHeight = "280px";
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

  async register() {
    const channel = new BroadcastChannel('foobar');        
    channel.postMessage('register is clicked in tab 2');

    let username = this.registerForm.get("username").value.trim();
    let email = username;
    let password = this.registerForm.get("password").value.trim();

    if (username && email && password) {
      this.verifiableEmail = email;
      const loading = await this.loadingController
        .create({
          message: "Please wait...",
          translucent: true,
        })
        .then((a) => {
          a.present().then(async (res) => {
            try {
              const user = await Auth.signUp({
                username,
                password,
                // attributes: {
                //   username, // == email          // optional
                //   //phone_number,   // optional - E.164 number convention
                //   // other custom attributes
                // },
              });
              console.log({ user });
              if (user) {
                // let userRes = user.user.userConfirmed;
                this.showVerificationForm = true;
                this.utilities.presentToastSuccess(
                  "Registration successful, Please verify your email with the code which was sent to your email Id."
                );
                this.resetRegisterFormValues();
                this.resetLoginFormValues();
              }
            } catch (error) {
              console.log("error signing up:", error);
              this.utilities.presentToastWarning(error.message);
              this.showVerificationForm = false;
            }
            a.dismiss();
          });
        });
    } else {
      this.utilities.presentToastWarning("Please enter Email and Password.");
    }
  }

  async login() {
    let username = this.loginForm.get("username").value.trim();
    let password = this.loginForm.get("password").value.trim();
    // username = "maheshkumarj1432@gmail.com";
    // password = "Zolt123$";
    console.log(username);
    console.log(password);

    if (username && password) {
      this.verifiableEmail = username;
      let errorsCount = 0;
      const loading = await this.loadingController
        .create({
          message: "Please wait...",
          translucent: true,
        })
        .then((a) => {
          a.present().then(async (res) => {
            try {
              const user = await Auth.signIn(username, password);
              console.log({ user });
              let userRes = user;
              let receivedToken =
                userRes.signInUserSession.accessToken.jwtToken;
              if (userRes.signInUserSession.accessToken.jwtToken) {
                // this.utilities.presentToastSuccess("Login successful");
                // let userRes = user;
                if (userRes.signInUserSession.accessToken.jwtToken) {
                  // this.utilities.presentToastSuccess("Login successful");
                  console.log("receivedToken -> " + receivedToken);
                  this.utilities.jwt = receivedToken;

                  if (this.utilities.isHybridApp) {
                    let letGetUserByEmail = await this.db
                      .getUserByEmail(username)
                      .then(async (res: any[]) => {
                        console.log(
                          "Received getUserByEmail details are below -> "
                        );
                        console.log(res);
                        let userDetails = res;
                        if (userDetails.length > 0) {
                          let userId = userDetails[0]["user_id"];
                          a.dismiss();
                          this.proceedToLogin(username, password);
                        } else {
                          this.proceedToRegister(username, password);
                        }

                        console.log("errorsCount --> " + errorsCount);
                      })
                      .catch((error) => {
                        this.utilities.sqliteErrorDisplayer(
                          "login * getUserByEmail",
                          error
                        );
                        a.dismiss();
                        this.utilities.presentToastWarning(
                          "Something went wrong"
                        );
                        console.error(
                          "Error -> getUserByEmail() function returned error." +
                          JSON.stringify(error)
                        );
                      });
                  } else {
                    a.dismiss();
                    this.proceedToLogin(username, password);
                  }
                }
              } else {
                this.utilities.presentToastWarning("Something went wrong.");
                this.utilities.sqliteErrorDisplayer(
                  "login * login",
                  "Token not found"
                );
              }
            } catch (error) {
              console.log("error signing in", error);
              if (error.code == "UserNotConfirmedException") {
                this.utilities.presentToastWarning(
                  "Please verify your email with the code which was sent to your email Id."
                );
                this.showVerificationForm = true;
              } else if (error.code == "NotAuthorizedException") {
                this.utilities.presentToastWarning(
                  "Incorrect Username or Password."
                );
              } else {
                this.utilities.presentToastWarning(
                  "Something went wrong, please contact Admin."
                );
              }
              a.dismiss();
            }
          });
        });
    } else {
      this.utilities.presentToastWarning("Please enter Email and Password.");
    }
  }

  // proceedToRegister
  async proceedToRegister(username, password) {
    const loading = await this.loadingController
      .create({
        message: "Please wait...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          let letSignup = await this.apiService
            .registerUser(username, username, password)
            .subscribe((data) => {
              console.log("Returned from Backend");
              console.log(data);
              if (this.utilities.isInvalidApiResponseData(data)) {
                console.log("Returned Error");
                // console.log(data[0][0]);
                if (data[0][0]["error"].includes(username)) {
                  this.toastErrorMsg = "Email already exist";
                  this.utilities.presentToastWarning(
                    "This user's data already imported to SQLite in other device, please import in this devices as well if you want to continue"
                  );
                } else {
                  this.toastErrorMsg = "Something went wrong";
                }
                // this.presentToastWarning();
                a.dismiss();
                return false;
              } else {
                console.log("Returned Success");

                if (this.utilities.isHybridApp) {
                  let res = data[0][0];
                  if (res["query"]) {
                    let receivedQuery = res["query"];
                    console.log(receivedQuery);

                    this.db
                      .crudOperations(receivedQuery)
                      .then((res) => {
                        console.log("signup details saved successfully");
                        a.dismiss();
                        this.proceedToLogin(username, password);
                        return true;
                      })
                      .catch((error) => {
                        this.utilities.sqliteErrorDisplayer(
                          "login * register",
                          error
                        );
                        console.error(
                          "Error -> signup crudOperations function returned error." +
                            JSON.stringify(error)
                        );
                        return false;
                      });
                  } else {
                    a.dismiss();
                    this.utilities.sqliteErrorDisplayer(
                      "login * register",
                      "Query property is not received from backend SP"
                    );
                    console.log(
                      "Query property is not received from backend SP"
                    );
                    return false;
                  }
                } else {
                  a.dismiss();
                  this.proceedToLogin(username, password);
                  return true;
                }
              }
            });
        });
      });
  }

  // proceedToLogin
  async proceedToLogin(username, password) {
    const loading = await this.loadingController
      .create({
        message: "Please wait...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.apiService.loginUser(username, password).subscribe((data) => {
            console.log("Returned from Backend");
            console.log(data);
            if (typeof data != "undefined" && typeof data[0] != "undefined") {
              if (this.utilities.isInvalidApiResponseData(data)) {
                console.log("Returned Error");
                // this.presentToastWarning();
              } else {
                let res = data[0][0];
                this.auth.isLoggedIn = true;
                console.log("Returned Success");
                // this.utilities.presentToastSuccess(
                //   "Login Success."
                // );                
                this.utilities.userId = res["user_id"];
                this.utilities.currentUserDetails["userName"] = res["name"]
                  ? res["name"]
                  : res["username"];
                this.utilities.currentUserDetails["photo"] = res["photo"];

                if (this.utilities.isHybridApp) {
                  this.commonService.loadAppointmentsFromSqlite();

                  this.commonService.loadAppointmentsInterval = setInterval(
                    () => this.commonService.loadAppointmentsFromSqlite(),
                    this.commonService.appointmentsLoadingInterval
                  );
                } else {
                  this.commonService.loadAppointmentsFromServer();

                  this.commonService.loadAppointmentsInterval = setInterval(
                    () => this.commonService.loadAppointmentsFromServer(),
                    this.commonService.appointmentsLoadingInterval
                  );
                }

                this.router.navigate(["/home"]);
                this.resetLoginFormValues();
                this.resetRegisterFormValues();
                a.dismiss();
              }
            } else {
              a.dismiss();
              this.proceedToRegister(username, password);
            }
          });
        });
      });
  }

  //aws code
  async confirm() {
    console.clear();
    let email = this.verifiableEmail.toString();
    let enteredCode = this.verificationForm
      .get("verificationCode")
      .value.toString();

    console.log(email + " -- " + enteredCode);

    if (email && enteredCode) {
      const loading = await this.loadingController
        .create({
          message: "Please wait...",
          translucent: true,
        })
        .then((a) => {
          a.present().then(async (res) => {
            try {
              let res = await Auth.confirmSignUp(email, enteredCode);
              console.log(res);
              if (res) {
                this.utilities.presentToastSuccess(
                  "Email verification successful, please login now."
                );
                this.showVerificationForm = false;
                this.loginTab();
                this.verificationForm.patchValue({
                  verificationCode: "",
                });
              }
            } catch (error) {
              console.log("error confirming sign up", error);
              this.utilities.presentToastWarning(error.message);
            }
            a.dismiss();
          });
        });
    } else {
      this.utilities.presentToastWarning("Please enter Verification code.");
    }
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
}
