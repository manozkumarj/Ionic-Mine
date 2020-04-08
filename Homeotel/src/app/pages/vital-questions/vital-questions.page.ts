import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { WheelSelector } from "@ionic-native/wheel-selector/ngx";

@Component({
  selector: "app-vital-questions",
  templateUrl: "./vital-questions.page.html",
  styleUrls: ["./vital-questions.page.scss"],
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

  selectedTemperature = "0.0";
  selectedSystolic = "-NA-";
  selectedDiastolic = "-NA-";
  selectedPulserate = "-NA-";
  selectedBp = "-NA-";
  selectedRespiratoryrate = "-NA-";

  temperatureValue: number = 0;
  systolicValue: number = 0;
  diastolicValue: number = 0;
  pulserateValue: number = 0;
  respiratoryrateValue: number = 0;

  systolicOptions: any[] = [];
  diastolicOptions: any[] = [];
  temperatureOptions: any[] = [];
  pulserateOptions: any[] = [];
  respiratoryrateOptions: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private selector: WheelSelector
  ) {}

  ngOnInit() {
    console.clear();
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
      // Generating Systolic options
      for (let i = 0; i <= 200; i++) {
        this.systolicOptions.push({ description: i.toString() });
      }
      // Generating Diastolic options
      for (let i = 0; i <= 200; i++) {
        this.diastolicOptions.push({ description: i.toString() });
      }

      console.log("systolicOptions are below");
      console.log(this.systolicOptions);
      console.log("diastolicOptions are below");
      console.log(this.diastolicOptions);
    } else if (paramThree) {
      console.log("paramThree");
      this.title = `${paramThree} of 4`;
      this.backwardLink = `/vital-questions/1/2`;
      this.forwardLink = `/vital-questions/1/2/3/4`;
      this.question = "Please enter your respiratory rate?";
      this.currentQuestion = "three";
      // Generating respiratoryrate options
      for (let i = 0; i <= 200; i++) {
        this.respiratoryrateOptions.push({ description: i.toString() });
      }
      console.log("respiratoryrateOptions are below");
      console.log(this.respiratoryrateOptions);
    } else if (paramTwo) {
      console.log("paramTwo");
      this.title = `${paramTwo} of 4`;
      this.backwardLink = `/vital-questions/1`;
      this.forwardLink = `/vital-questions/1/2/3`;
      this.question = "Please enter your pulse rate?";
      this.currentQuestion = "two";
      // Generating pulserate options
      for (let i = 0; i <= 200; i++) {
        this.pulserateOptions.push({ description: i.toString() });
      }
      console.log("pulserateOptions are below");
      console.log(this.pulserateOptions);
    } else if (paramOne) {
      console.log("paramOne");
      this.title = `${paramOne} of 4`;
      this.backwardLink = `/vitals`;
      this.forwardLink = `/vital-questions/1/2`;
      this.question = "Please enter your temperature?";
      this.currentQuestion = "one";
      // Generating Temperature options
      for (let i = 0; i <= 200; i++) {
        this.temperatureOptions.push({ description: i.toString() });
      }
      console.log("temperatureOptions are below");
      console.log(this.temperatureOptions);
    }
  }

  selectBP() {
    this.selector
      .show({
        title: "Select Systolic & Diastolic",
        items: [this.systolicOptions, this.diastolicOptions],
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
          {
            index: 1,
            value: this.diastolicOptions[this.diastolicValue].description,
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

          console.log(
            "Selected Diastolic value is --> " + result[1].description
          );
          console.log(result[1].description + " at index: " + result[1].index);
          this.diastolicValue = result[1].index;
          this.selectedDiastolic = result[1].description;
        },
        (err) => console.log("Error: ", err)
      );
  }

  selectPulserate() {
    this.selector
      .show({
        title: "Select Pulserate",
        items: [this.pulserateOptions],
        positiveButtonText: "Done",
        negativeButtonText: "Cancel",
        theme: "dark",
        wrapWheelText: true,
        defaultItems: [
          //the number '2'
          {
            index: 0,
            value: this.pulserateOptions[this.diastolicValue].description,
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

  selectTemperature() {
    this.selector
      .show({
        title: "Select Temperature",
        items: [this.temperatureOptions],
        positiveButtonText: "Done",
        negativeButtonText: "Cancel",
        theme: "dark",
        wrapWheelText: true,
        defaultItems: [
          //the number '2'
          {
            index: 0,
            value: this.temperatureOptions[this.temperatureValue].description,
          },
        ],
      })
      .then(
        (result) => {
          console.log(
            "Selected Temperature value is --> " + result[0].description
          );
          console.log(result[0].description + " at index: " + result[0].index);
          this.temperatureValue = result[0].index;
          this.selectedTemperature = result[0].description;
        },
        (err) => console.log("Error: ", err)
      );
  }

  selectRespiratoryrate() {
    this.selector
      .show({
        title: "Select Respiratoryrate",
        items: [this.respiratoryrateOptions],
        positiveButtonText: "Done",
        negativeButtonText: "Cancel",
        theme: "dark",
        wrapWheelText: true,
        defaultItems: [
          //the number '2'
          {
            index: 0,
            value: this.respiratoryrateOptions[this.respiratoryrateValue]
              .description,
          },
        ],
      })
      .then(
        (result) => {
          console.log(
            "Selected Respiratoryrate value is --> " + result[0].description
          );
          console.log(result[0].description + " at index: " + result[0].index);
          this.respiratoryrateValue = result[0].index;
          this.selectedRespiratoryrate = result[0].description;
        },
        (err) => console.log("Error: ", err)
      );
  }
}
