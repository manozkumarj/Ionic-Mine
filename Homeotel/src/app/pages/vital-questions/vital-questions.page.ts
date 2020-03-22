import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { WheelSelector } from "@ionic-native/wheel-selector/ngx";

@Component({
  selector: "app-vital-questions",
  templateUrl: "./vital-questions.page.html",
  styleUrls: ["./vital-questions.page.scss"]
})
export class VitalQuestionsPage implements OnInit {
  currentQuestion;

  title;
  backwardLink;
  forwardLink;
  question;

  systolicDiastolicOptions;
  pulseRates;
  respiratoryRates;

  selectedSystolic = "-NA-";
  selectedDiastolic = "-NA-";

  systolicValue: number = 0;
  diastolicValue: number = 0;

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
    { description: "10" }
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
    { description: "10" }
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private selector: WheelSelector
  ) {}

  ngOnInit() {
    this.currentQuestion = null;
    let paramOne = parseInt(this.activatedRoute.snapshot.paramMap.get("one"));
    let paramTwo = parseInt(this.activatedRoute.snapshot.paramMap.get("two"));
    let paramThree = parseInt(
      this.activatedRoute.snapshot.paramMap.get("three")
    );
    let paramFour = parseInt(this.activatedRoute.snapshot.paramMap.get("four"));

    if (paramFour) {
      console.log("paramFour");
      this.title = `${paramFour} of 4`;
      this.backwardLink = `/vital-questions/1/2/3`;
      this.forwardLink = `/vitals`;
      this.question = "Please enter your blood pressure?";
      this.currentQuestion = "four";
    } else if (paramThree) {
      console.log("paramThree");
      this.title = `${paramThree} of 4`;
      this.backwardLink = `/vital-questions/1/2`;
      this.forwardLink = `/vital-questions/1/2/3/4`;
      this.question = "Please enter your respiratory rate?";
      this.currentQuestion = "three";
    } else if (paramTwo) {
      console.log("paramTwo");
      this.title = `${paramTwo} of 4`;
      this.backwardLink = `/vital-questions/1`;
      this.forwardLink = `/vital-questions/1/2/3`;
      this.question = "Please enter your pulse rate?";
      this.currentQuestion = "two";
    } else if (paramOne) {
      console.log("paramOne");
      this.title = `${paramOne} of 4`;
      this.backwardLink = `/vitals`;
      this.forwardLink = `/vital-questions/1/2`;
      this.question = "Please enter your temperature?";
      this.currentQuestion = "one";
    }

    this.systolicDiastolicOptions = [
      {
        id: 1,
        systolic: 115,
        distolic: 78
      },
      {
        id: 2,
        systolic: 116,
        distolic: 79
      },
      {
        id: 3,
        systolic: 117,
        distolic: 80
      },
      {
        id: 4,
        systolic: 118,
        distolic: 81
      },
      {
        id: 5,
        systolic: 119,
        distolic: 82
      },
      {
        id: 6,
        systolic: 120,
        distolic: 83
      },
      {
        id: 7,
        systolic: 121,
        distolic: 84
      }
    ];

    this.pulseRates = [
      {
        id: 1,
        pulseRate: 79
      },
      {
        id: 2,
        pulseRate: 81
      },
      {
        id: 3,
        pulseRate: 82
      },
      {
        id: 4,
        pulseRate: 83
      },
      {
        id: 5,
        pulseRate: 84
      },
      {
        id: 6,
        pulseRate: 85
      }
    ];

    this.respiratoryRates = [
      {
        id: 1,
        respiratoryRate: 15
      },
      {
        id: 2,
        respiratoryRate: 16
      },
      {
        id: 3,
        respiratoryRate: 17
      },
      {
        id: 4,
        respiratoryRate: 18
      },
      {
        id: 5,
        respiratoryRate: 19
      },
      {
        id: 6,
        respiratoryRate: 20
      },
      {
        id: 6,
        respiratoryRate: 21
      }
    ];
  }

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
            value: this.systolicOptions[this.systolicValue].description
          }
        ]
      })
      .then(
        result => {
          console.log(
            "Selected Systolic value is --> " + result[0].description
          );
          console.log(result[0].description + " at index: " + result[0].index);
          this.systolicValue = result[0].index;
          this.selectedSystolic = result[0].description;
        },
        err => console.log("Error: ", err)
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
            value: this.diastolicOptions[this.diastolicValue].description
          }
        ]
      })
      .then(
        result => {
          console.log(
            "Selected Diastolic value is --> " + result[0].description
          );
          console.log(result[0].description + " at index: " + result[0].index);
          this.diastolicValue = result[0].index;
          this.selectedDiastolic = result[0].description;
        },
        err => console.log("Error: ", err)
      );
  }
}
