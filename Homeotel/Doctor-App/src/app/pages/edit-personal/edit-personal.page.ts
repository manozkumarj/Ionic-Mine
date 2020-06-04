import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { CommonService } from "src/app/services/common.service";
import { WheelSelector } from "@ionic-native/wheel-selector/ngx";
import { DatabaseService } from "src/app/services/database.service";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-edit-personal",
  templateUrl: "./edit-personal.page.html",
  styleUrls: ["./edit-personal.page.scss"],
})
export class EditPersonalPage implements OnInit {
  title;
  backwardLink;
  forwardLink;
  currentQuestion;
  question;
  inputField = "";
  columnName;
  genderField;
  years = [];
  months = [];
  dates = [];
  selectedYear;
  selectedMonth;
  selectedDate;
  date = new Date();
  currentYear = this.date.getFullYear();

  dobYearValue: number = 0;
  dobMonthValue: number = 0;
  dobDateValue: number = 0;

  dobDateOptions: any[] = [];
  dobMonthOptions: any[] = [];
  dobYearOptions: any[] = [];

  selectedDob = "-NA-";

  constructor(
    private selector: WheelSelector,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    public commonService: CommonService,
    private utilities: UtilitiesService,
    private db: DatabaseService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    //this.loadDates();
  }

  ionViewWillEnter() {
    this.activatedRoute.params.subscribe((params) => {
      this.CurrentUrl(params["questionNumber"]);
      this.title = `${params["questionNumber"]} of 5`;
    });
    // this.updateData();
    this.updateDataFromSqlLite();
  }

  CurrentUrl(questionNumber) {
    switch (+questionNumber) {
      case 1:
        console.log("1");
        this.backwardLink = `/doctor-personal`;
        this.currentQuestion = "one";
        this.forwardLink = "/edit-personal/1/2";
        this.columnName = "name";
        this.question = "Please enter your name";
        this.inputField = this.commonService.doctorPersonal["name"];
        break;
      case 2:
        this.backwardLink = `/edit-personal/1`;
        this.forwardLink = "/edit-personal/1/2/3";
        this.currentQuestion = "two";
        this.columnName = "phone";
        this.question = "please enter your phone number";
        this.inputField = this.commonService.doctorPersonal["phone"];

        break;
      case 3:
        console.log("3");

        this.backwardLink = `/edit-personal/1/2`;
        this.forwardLink = "/edit-personal/1/2/3/4";
        this.currentQuestion = "three";
        this.question = "please enter your email address";
        this.columnName = "email";
        this.inputField = this.commonService.doctorPersonal["email"];

        break;
      case 4:
        console.log("4");
        this.backwardLink = `/edit-personal/1/2/3`;
        this.forwardLink = `/edit-personal/1/2/3/4/5`;
        this.currentQuestion = "four";
        this.question = "please select Gender";
        this.columnName = "gender_id";
        this.inputField = this.commonService.doctorPersonal["gender_id"];

        break;
      case 5:
        console.log("5");
        this.backwardLink = `/edit-personal/1/2/3/4`;
        this.currentQuestion = "five";
        this.question = "please select Date of birth";
        this.forwardLink = `/doctor-personal`;
        this.columnName = "dob";
        var tempDate;
        tempDate = `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}`;
        console.log(tempDate);
        var date = this.commonService.doctorPersonal["dob"]
          ? this.commonService.doctorPersonal["dob"]
          : tempDate;

        // Generating DOB date options
        for (let i = 1; i <= 30; i++) {
          this.dobDateOptions.push({ description: i.toString() });
        }
        // Generating DOB month options
        for (let i = 1; i <= 11; i++) {
          this.dobMonthOptions.push({ description: i.toString() });
        }
        // Generating DOB year options
        let j = 0;
        for (let i = this.currentYear; i >= this.currentYear - 100; i--) {
          this.dobYearOptions.push({ description: i.toString(), id: j });
          j++;
        }
        let splitDobValue = date.split("-");
        let yearValue = +splitDobValue[0];
        let monthValue = +splitDobValue[1];
        let dateValue = +splitDobValue[2];

        this.dobYearValue = this.dobYearOptions.findIndex(
          (year) => year["description"] == yearValue
        );
        console.log("yearIndex -> " + this.dobYearValue);

        this.dobMonthValue = this.dobMonthOptions.findIndex(
          (year) => year["description"] == monthValue
        );
        console.log("monthIndex -> " + this.dobMonthValue);

        this.dobDateValue = this.dobDateOptions.findIndex(
          (year) => year["description"] == dateValue
        );
        console.log("dateIndex -> " + this.dobDateValue);

        console.log("dobDateOptions are below");
        console.log(this.dobDateOptions);
        console.log("dobMonthOptions are below");
        console.log(this.dobMonthOptions);
        console.log("dobYearOptions are below");
        console.log(this.dobYearOptions);

        this.selectedDob = this.inputField =
          this.dobYearValue +
          "-" +
          this.dobMonthValue +
          "-" +
          this.dobDateValue;

        this.selectedDob = this.commonService.doctorPersonal["dob"];

        this.selectDob();

        console.log(
          this.dobYearValue +
            " - " +
            this.dobMonthValue +
            " - " +
            this.dobDateValue
        );

        // this.setDates(date);
        break;
    }
  }

  // setDates(date){
  //   if(date){
  //     this.selectedYear = date.split('-')[0];
  //     this.selectedMonth = date.split('-')[1];
  //     this.selectedDate = date.split('-')[2];
  //     console.log(typeof(this.selectedYear))
  //     console.log(this.selectedMonth)
  //     console.log(this.selectedDate)
  //   }
  // }

  selectDob() {
    this.selector
      .show({
        title: "Select Date of birth (YYYY-MM-DD)",
        items: [this.dobYearOptions, this.dobMonthOptions, this.dobDateOptions],
        positiveButtonText: "Done",
        negativeButtonText: "Cancel",
        theme: "light",
        wrapWheelText: true,
        defaultItems: [
          //the number '2'
          {
            index: 0,
            value: this.dobYearOptions[this.dobYearValue].description,
          },
          {
            index: 1,
            value: this.dobMonthOptions[this.dobMonthValue].description,
          },
          {
            index: 2,
            value: this.dobDateOptions[this.dobDateValue].description,
          },
        ],
      })
      .then(
        (result) => {
          console.log("Selected Feet value is --> " + result[0].description);
          console.log("Selected Inches value is --> " + result[1].description);
          console.log("Selected Inches value is --> " + result[2].description);

          console.log(result[0].description + " at index: " + result[0].index);
          console.log(result[1].description + " at index: " + result[1].index);
          console.log(result[2].description + " at index: " + result[2].index);

          this.dobYearValue = result[0].index;
          let y = result[0].description;

          this.dobMonthValue = result[1].index;
          let m = result[1].description;

          this.dobDateValue = result[2].index;
          let d = result[2].description;

          this.selectedDob = this.inputField = y + "-" + m + "-" + d;
        },
        (err) => console.log("Error: ", err)
      );
  }

  // loadDates(){
  //     this.years =[];
  //     this.months =[];
  //     this.dates =[];
  //   var currentYear = new Date().getFullYear();
  //     for(var i= (currentYear-20); i> (currentYear-100) ; i--){
  //       this.years.push(i.toString());
  //     }
  //     for(var i= 1; i<=12 ; i++){
  //       this.months.push(("0" +i.toString() ).slice(-2));
  //     }
  //     for(var i= 1; i<=31 ; i++){
  //       this.dates.push(("0" +i.toString() ).slice(-2));
  //     }

  // }
  genderChanged(id) {
    this.inputField = id;
    // this.genderField = id;
    this.submit();
    this.router.navigate([this.forwardLink]);
  }

  async submit() {
    var columnValue;

    columnValue = this.inputField;
    console.log(columnValue);
    if (columnValue) {
      const loading = await this.loadingController
        .create({
          message: "Loading...",
          translucent: true,
        })
        .then((a) => {
          a.present().then(async (res) => {
            this.apiService
              .updateProfileDetails(
                this.commonService.currentDoctorId,
                this.columnName,
                columnValue
              )
              .subscribe((data) => {
                console.log("Returned from Backend");
                console.log(JSON.stringify(data));
                if (this.utilities.isInvalidApiResponseData(data)) {
                  a.dismiss();
                  console.log("Returned Error");
                  console.log(data[0][0]);
                  if (data[0][0]["error"]) {
                    console.log("Something went wrong");
                  }
                } else {
                  console.log("Returned Success");
                  let res = data[0][0];
                  if (data[0][0]["query"]) {
                    let receivedQuery = res["query"];
                    console.log(receivedQuery);
                    this.db
                      .crudOperations(receivedQuery)
                      .then((res) => {
                        a.dismiss();
                        this.updateDataFromSqlLite();
                        this.router.navigate([this.forwardLink]);
                        this.commonService.presentToast(
                          "data Updated successfully",
                          "toastSuccess"
                        );
                      })
                      .catch((error) => {
                        this.utilities.sqlLiteErrorTrigger("submit", error);
                        this.commonService.presentToast(
                          "Something went wrong",
                          "toastError"
                        );
                        a.dismiss();
                        console.error(JSON.stringify(error));
                      });
                  } else {
                    this.commonService.presentToast(
                      "Something went wrong",
                      "toastError"
                    );
                  }
                }
              });
          });
        });
    } else {
      alert("Please provide value");
    }
  }

  updateData() {
    this.apiService
      .getProfile(this.commonService.currentDoctorId)
      .subscribe((data) => {
        if (this.utilities.isInvalidApiResponseData(data)) {
          console.log(data);
          this.commonService.presentToast("Something went wrong", "toastError");
        } else {
          console.log(data);

          this.commonService.doctorPersonal = data[0][0];
          this.commonService.currentDoctorName = data[0][0]["name"];
          console.log(this.commonService.currentDoctorName);
        }
      });
  }

  async updateDataFromSqlLite() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getDoctorPersonalDetails(this.commonService.currentDoctorId)
            .then((res: any[]) => {
              console.log(res);
              if (res) {
                this.commonService.currentDoctorPhoto = res["photo"];

                this.commonService.doctorPersonal = res;

                this.commonService.currentDoctorName = res[0][0]["name"];
              }
            })
            .catch((error) => {
              this.utilities.sqlLiteErrorTrigger(
                "updateDataFromSqlLite",
                error
              );
              this.commonService.presentToast(
                "Something went wrong",
                "toastError"
              );
              console.error(JSON.stringify(error));
            });
          a.dismiss();
        });
      });
  }
}
