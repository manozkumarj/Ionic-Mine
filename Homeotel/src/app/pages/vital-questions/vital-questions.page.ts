import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

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

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

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
}
