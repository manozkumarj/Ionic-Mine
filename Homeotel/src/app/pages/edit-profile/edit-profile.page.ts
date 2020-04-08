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

  date = new Date();
  currentYear = this.date.getFullYear();

  selectedFeet = "-NA-";
  selectedInches = "-NA-";
  selectedWeight = "-NA-";
  selectedDob = "-NA-";

  feetValue: number = 0;
  inchesValue: number = 0;
  weightValue: number = 0;

  dobYearValue: number = 0;
  dobMonthValue: number = 0;
  dobDateValue: number = 0;

  // Master data
  m_bloodGroup: any[] = [];
  m_maritaStatus: any[] = [];
  m_gender: any[] = [];

  feetOptions: any[] = [];
  inchesOptions: any[] = [];
  weightOptions: any[] = [];
  dobDateOptions: any[] = [];
  dobMonthOptions: any[] = [];
  dobYearOptions: any[] = [];

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
      // Generating Weight options
      for (let i = 40; i <= 150; i++) {
        this.weightOptions.push({ description: i.toString() });
      }
      this.selectWeight();
      console.log("WeightOptions are below");
      console.log(this.weightOptions);

      this.weightValue = this.utilities.profilePageDetails["weight"];

      console.log(this.weightValue);
    } else if (paramEight) {
      console.log("paramEight");
      this.title = `${paramEight} of 9`;
      this.backwardLink = `/edit-profile/1/2/3/4/5/6/7`;
      this.forwardLink = `/edit-profile/1/2/3/4/5/6/7/8/9`;
      this.question = "Please select your height";
      this.currentQuestion = "eight";
      this.columnName = "height";
      this.inputField = this.utilities.profilePageDetails["height"];

      let splitHeightValue = this.inputField.split(".");
      this.feetValue = +splitHeightValue[0];
      this.inchesValue = +splitHeightValue[1];

      // Generating Feet options
      for (let i = 0; i <= 10; i++) {
        this.feetOptions.push({ description: i.toString() });
      }
      // Generating Inches options
      for (let i = 0; i <= 11; i++) {
        this.inchesOptions.push({ description: i.toString() });
      }
      this.selectHeight();

      console.log("feetOptions are below");
      console.log(this.feetOptions);
      console.log("inchesOptions are below");
      console.log(this.inchesOptions);

      console.log(this.feetValue + " - " + this.inchesValue);
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

      console.log(this.inputField);

      let splitDobValue = this.inputField.split("-");
      let yearValue = +splitDobValue[0];
      let monthValue = +splitDobValue[1];
      let dateValue = +splitDobValue[2];

      // Generating DOB date options
      for (let i = 1; i <= 31; i++) {
        this.dobDateOptions.push({ description: i.toString() });
      }
      // Generating DOB month options
      for (let i = 1; i <= 12; i++) {
        this.dobMonthOptions.push({ description: i.toString() });
      }
      // Generating DOB year options
      let j = 0;
      for (let i = this.currentYear; i >= this.currentYear - 100; i--) {
        this.dobYearOptions.push({ description: i.toString(), id: j });
        j++;
      }

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
      this.selectDob();

      console.log(
        this.dobYearValue +
          " - " +
          this.dobMonthValue +
          " - " +
          this.dobDateValue
      );
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

  ngOnInit() {
    console.log("this.inputField is -> " + this.inputField);
  }

  selectDob() {
    this.selector
      .show({
        title: "Select Date of birth (YYYY-MM-DD)",
        items: [this.dobYearOptions, this.dobMonthOptions, this.dobDateOptions],
        positiveButtonText: "Done",
        negativeButtonText: "Cancel",
        theme: "dark",
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

          this.selectedDob = y + m + d;
        },
        (err) => console.log("Error: ", err)
      );
  }

  selectHeight() {
    this.selector
      .show({
        title: "Select Feet & Inches",
        items: [this.feetOptions, this.inchesOptions],
        positiveButtonText: "Done",
        negativeButtonText: "Cancel",
        theme: "dark",
        wrapWheelText: true,
        defaultItems: [
          //the number '2'
          {
            index: 0,
            value: this.feetOptions[this.feetValue].description,
          },
          {
            index: 1,
            value: this.inchesOptions[this.inchesValue].description,
          },
        ],
      })
      .then(
        (result) => {
          console.log("Selected Feet value is --> " + result[0].description);
          console.log("Selected Inches value is --> " + result[1].description);
          console.log(result[0].description + " at index: " + result[0].index);
          console.log(result[1].description + " at index: " + result[1].index);
          this.feetValue = result[0].index;
          this.selectedFeet = result[0].description;

          this.inchesValue = result[1].index;
          this.selectedInches = result[1].description;
        },
        (err) => console.log("Error: ", err)
      );
  }

  selectWeight() {
    this.selector
      .show({
        title: "Select Weight",
        items: [this.weightOptions],
        positiveButtonText: "Done",
        negativeButtonText: "Cancel",
        theme: "dark",
        wrapWheelText: true,
        defaultItems: [
          //the number '2'
          {
            index: 0,
            value: this.weightOptions[this.weightValue].description,
          },
        ],
      })
      .then(
        (result) => {
          console.log("Selected Weight value is --> " + result[0].description);
          console.log(result[0].description + " at index: " + result[0].index);
          this.weightValue = result[0].index;
          this.selectedWeight = result[0].description;
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
