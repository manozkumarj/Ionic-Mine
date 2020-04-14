import { Component, OnInit } from "@angular/core";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ApiService } from "src/app/services/api.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-edit-lifestyle",
  templateUrl: "./edit-lifestyle.page.html",
  styleUrls: ["./edit-lifestyle.page.scss"],
})
export class EditLifestylePage implements OnInit {
  title;
  options: any[] = [];

  currentItemValue;
  columnName = "";
  backwardLink;
  forwardLink;
  question;
  currentQuestion;

  masterDataTag;

  constructor(
    private activatedRoute: ActivatedRoute,
    private utilities: UtilitiesService,
    private apiService: ApiService,
    private router: Router
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

    console.log("this.utilities.lifestylePageState-selectedLifestyle is below");
    console.log(this.utilities.lifestylePageState["selectedLifestyle"]);

    let value = this.utilities.lifestylePageState["selectedLifestyle"]["value"];

    if (paramSeven) {
      console.log("paramSeven");
      this.title = `${paramSeven} of 7`;
      this.backwardLink = `/edit-lifestyle/1/2/3/4/5/6`;
      this.forwardLink = `/lifestyle`;
      this.question = "Heat preference";
      this.currentQuestion = "seven";
      this.masterDataTag = "m_heat";
      this.currentItemValue = this.utilities.lifestylePageState["heatId"];
    } else if (paramSix) {
      console.log("paramSix");
      this.title = `${paramSix} of 7`;
      this.backwardLink = `/edit-lifestyle/1/2/3/4/5`;
      this.forwardLink = `/edit-lifestyle/1/2/3/4/5/6/7`;
      this.question = "Food preference";
      this.currentQuestion = "six";
      this.masterDataTag = "m_food";
      this.currentItemValue = this.utilities.lifestylePageState["foodId"];
    } else if (paramFive) {
      console.log("paramFive");
      this.title = `${paramFive} of 7`;
      this.backwardLink = `/edit-lifestyle/1/2/3/4`;
      this.forwardLink = `/edit-lifestyle/1/2/3/4/5/6`;
      this.question = "Profession";
      this.currentQuestion = "five";
      this.masterDataTag = "m_profession";
      this.currentItemValue = this.utilities.lifestylePageState["professionId"];
    } else if (paramFour) {
      console.log("paramFour");
      this.title = `${paramFour} of 7`;
      this.backwardLink = `/edit-lifestyle/1/2/3`;
      this.forwardLink = `/edit-lifestyle/1/2/3/4/5`;
      this.question = "Activity level";
      this.currentQuestion = "four";
      this.masterDataTag = "m_activity";
      this.currentItemValue = this.utilities.lifestylePageState["activityId"];
    } else if (paramThree) {
      console.log("paramThree");
      this.title = `${paramThree} of 7`;
      this.backwardLink = `/edit-lifestyle/1/2`;
      this.forwardLink = `/edit-lifestyle/1/2/3/4`;
      this.question = "Excercise";
      this.currentQuestion = "three";
      this.masterDataTag = "m_excercise";
      this.currentItemValue = this.utilities.lifestylePageState["excerciseId"];
    } else if (paramTwo) {
      console.log("paramTwo");
      this.title = `${paramTwo} of 7`;
      this.backwardLink = `/edit-lifestyle/1`;
      this.forwardLink = `/edit-lifestyle/1/2/3`;
      this.question = "Alcohol";
      this.currentQuestion = "two";
      this.masterDataTag = "m_alcohol";
      this.currentItemValue = this.utilities.lifestylePageState["alcoholId"];
    } else if (paramOne) {
      console.log("paramOne");
      this.title = `${paramOne} of 7`;
      this.backwardLink = `/lifestyle`;
      this.forwardLink = `/edit-lifestyle/1/2`;
      this.question = "Smoking";
      this.currentQuestion = "one";
      this.masterDataTag = "m_smoking";
      this.currentItemValue = this.utilities.lifestylePageState["smokingId"];
    }

    let currentMasters = this.utilities.lifestylePageState[this.masterDataTag];
    console.log("Current master data is below");
    console.log(currentMasters);

    this.options = currentMasters;
    this.currentItemValue = value;
  }

  ngOnInit() {}

  answered = (value) => {
    console.log("answered -> " + this.currentQuestion);
    this.router.navigate([this.forwardLink]);
  };
}
