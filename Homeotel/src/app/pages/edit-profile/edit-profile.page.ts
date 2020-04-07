import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ApiService } from "src/app/services/api.service";
import { WheelSelector } from "@ionic-native/wheel-selector/ngx";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.page.html",
  styleUrls: ["./edit-profile.page.scss"],
})
export class EditProfilePage implements OnInit {
  inputField = "";
  columnName = "";
  title;
  backwardLink;
  forwardLink;
  question;
  currentQuestion;

  selectedSystolic = "-NA-";
  selectedDiastolic = "-NA-";

  systolicValue: number = 0;
  diastolicValue: number = 0;

  // Master data
  m_bloodGroup: any[] = [];
  m_maritaStatus: any[] = [];
  m_gender: any[] = [];

  systolicOptions = [
    { description: "1" },
    { description: "2" },
    { description: "3" },
    { description: "4" },
    { description: "5" },
    { description: "6" },
    { description: "7" },
    { description: "8" },
    { description: "9" },
    { description: "10" },
  ];

  diastolicOptions = [
    { description: "1" },
    { description: "2" },
    { description: "3" },
    { description: "4" },
    { description: "5" },
    { description: "6" },
    { description: "7" },
    { description: "8" },
    { description: "9" },
    { description: "10" },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private utilities: UtilitiesService,
    private selector: WheelSelector
  ) {
    this.currentQuestion = null;
    let paramOne = parseInt(this.activatedRoute.snapshot.paramMap.get("one"));
    let paramTwo = parseInt(this.activatedRoute.snapshot.paramMap.get("two"));
    let paramThree = parseInt(
      this.activatedRoute.snapshot.paramMap.get("three")
    );
    let paramFour = parseInt(this.activatedRoute.snapshot.paramMap.get("four"));
    let paramFive = parseInt(this.activatedRoute.snapshot.paramMap.get("five"));
    let paramSix = parseInt(this.activatedRoute.snapshot.paramMap.get("six"));
    let paramSeven = parseInt(
      this.activatedRoute.snapshot.paramMap.get("seven")
    );
    let paramEight = parseInt(
      this.activatedRoute.snapshot.paramMap.get("eight")
    );
    let paramNine = parseInt(this.activatedRoute.snapshot.paramMap.get("nine"));

    if (paramNine) {
      console.log("paramNine");
      this.title = `${paramNine} of 9`;
      this.backwardLink = `/edit-profile/1/2/3/4/5/6/7/8`;
      this.forwardLink = `/profile`;
      this.question = "Please select your weight";
      this.currentQuestion = "nine";
      this.columnName = "weight";
      this.inputField = this.utilities.profilePageDetails["weight"];
    } else if (paramEight) {
      console.log("paramEight");
      this.title = `${paramEight} of 9`;
      this.backwardLink = `/edit-profile/1/2/3/4/5/6/7`;
      this.forwardLink = `/edit-profile/1/2/3/4/5/6/7/8/9`;
      this.question = "Please select your height";
      this.currentQuestion = "eight";
      this.columnName = "height";
      this.inputField = this.utilities.profilePageDetails["height"];
    } else if (paramSeven) {
      console.log("paramSeven");
      this.title = `${paramSeven} of 9`;
      this.backwardLink = `/edit-profile/1/2/3/4/5/6`;
      this.forwardLink = `/edit-profile/1/2/3/4/5/6/7/8`;
      this.question = "Please select your marital status";
      this.currentQuestion = "seven";
      this.columnName = "marital_status_id";
      this.inputField = this.utilities.profilePageDetails["marital_status_id"];
    } else if (paramSix) {
      console.log("paramSix");
      this.title = `${paramSix} of 9`;
      this.backwardLink = `/edit-profile/1/2/3/4/5`;
      this.forwardLink = `/edit-profile/1/2/3/4/5/6/7`;
      this.question = "Please select your blood group";
      this.currentQuestion = "six";
      this.columnName = "blood_group_id";
      this.inputField = this.utilities.profilePageDetails["blood_group_id"];
    } else if (paramFive) {
      console.log("paramFive");
      this.title = `${paramFive} of 9`;
      this.backwardLink = `/edit-profile/1/2/3/4`;
      this.forwardLink = `/edit-profile/1/2/3/4/5/6`;
      this.question = "Please select your Date of birth";
      this.currentQuestion = "five";
      this.columnName = "dob";
      this.inputField = this.utilities.profilePageDetails["dob"];
    } else if (paramFour) {
      console.log("paramFour");
      this.title = `${paramFour} of 9`;
      this.backwardLink = `/edit-profile/1/2/3`;
      this.forwardLink = `/edit-profile/1/2/3/4/5`;
      this.question = "Please select your gender";
      this.currentQuestion = "four";
      this.columnName = "gender_id";
      this.inputField = this.utilities.profilePageDetails["gender_id"];
    } else if (paramThree) {
      console.log("paramThree");
      this.title = `${paramThree} of 9`;
      this.backwardLink = `/edit-profile/1/2`;
      this.forwardLink = `/edit-profile/1/2/3/4`;
      this.question = "Please enter your email ID";
      this.currentQuestion = "three";
      this.columnName = "email";
      this.inputField = this.utilities.profilePageDetails["email"];
    } else if (paramTwo) {
      console.log("paramTwo");
      this.title = `${paramTwo} of 9`;
      this.backwardLink = `/edit-profile/1`;
      this.forwardLink = `/edit-profile/1/2/3`;
      this.currentQuestion = "two";
      this.question = "Please enter your phone number";
      this.columnName = "phone";
      this.inputField = this.utilities.profilePageDetails["phone"];
    } else if (paramOne) {
      console.log("paramOne");
      this.title = `${paramOne} of 9`;
      this.backwardLink = `/profile`;
      this.forwardLink = `/edit-profile/1/2`;
      this.question = "Please enter your name";
      this.currentQuestion = "one";
      this.columnName = "name";
      this.inputField = this.utilities.profilePageDetails["name"];
    }
    this.m_bloodGroup = this.utilities.bookAppointmentDoctorDetails[
      "m_bloodGroup"
    ];
    this.m_maritaStatus = this.utilities.bookAppointmentDoctorDetails[
      "m_maritaStatus"
    ];
    this.m_gender = this.utilities.bookAppointmentDoctorDetails["m_gender"];
  }

  ngOnInit() {}

  selectSystolic() {
    this.selector
      .show({
        title: "Select systolic",
        items: [this.systolicOptions],
        positiveButtonText: "Done",
        negativeButtonText: "Cancel",
        theme: "dark",
        wrapWheelText: true,
        defaultItems: [
          //the number '2'
          {
            index: 0,
            value: this.systolicOptions[this.systolicValue].description,
          },
        ],
      })
      .then(
        (result) => {
          console.log(
            "Selected Systolic value is --> " + result[0].description
          );
          console.log(result[0].description + " at index: " + result[0].index);
          this.systolicValue = result[0].index;
          this.selectedSystolic = result[0].description;
        },
        (err) => console.log("Error: ", err)
      );
  }

  selectDiastolic() {
    this.selector
      .show({
        title: "Select diastolic",
        items: [this.diastolicOptions],
        positiveButtonText: "Done",
        negativeButtonText: "Cancel",
        theme: "dark",
        wrapWheelText: true,
        defaultItems: [
          //the number '2'
          {
            index: 0,
            value: this.diastolicOptions[this.diastolicValue].description,
          },
        ],
      })
      .then(
        (result) => {
          console.log(
            "Selected Diastolic value is --> " + result[0].description
          );
          console.log(result[0].description + " at index: " + result[0].index);
          this.diastolicValue = result[0].index;
          this.selectedDiastolic = result[0].description;
        },
        (err) => console.log("Error: ", err)
      );
  }

  answered = (value?) => {
    console.log("answered -> " + this.currentQuestion);

    if (!value) {
      value = this.inputField.trim();
    }

    if (value) {
      console.log(
        "this.columnName -> " + this.columnName + " & value -> " + value
      );

      this.apiService
        .updateUserProfileDetails(this.columnName, value)
        .subscribe((data) => {
          console.log("Returned from Backend");
          console.log(JSON.stringify(data));
          if (this.utilities.isInvalidApiResponseData(data)) {
            console.log("Returned Error");
            console.log(data[0][0]);
            if (data[0][0]["error"]) {
              console.log("Something went wrong");
            }
          } else {
            console.log("Returned Success");
            this.router.navigate([this.forwardLink]);
          }
        });
    } else {
      alert("Please provide value");
    }
  };
}
