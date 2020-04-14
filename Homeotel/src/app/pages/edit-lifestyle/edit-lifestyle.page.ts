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

  currentItemValue = "";
  columnName = "";
  backwardLink;
  forwardLink;
  question;
  currentQuestion;

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

    this.title = this.utilities.lifestylePageState["selectedLifestyle"]["name"];

    let master = this.utilities.lifestylePageState["selectedLifestyle"][
      "masterDataTag"
    ];

    let tag = this.utilities.lifestylePageState["selectedLifestyle"]["tag"];

    let value = this.utilities.lifestylePageState["selectedLifestyle"]["value"];

    let currentMasters = this.utilities.lifestylePageState[master];
    console.log("Current master data is below");
    console.log(currentMasters);

    this.options = currentMasters;

    if (paramSeven) {
      console.log("paramSeven");
      this.title = `${paramSeven} of 7`;
      this.backwardLink = `/edit-profile/1/2/3/4/5/6`;
      this.forwardLink = `/profile`;
      this.question = "Heat preference";
      this.currentQuestion = "seven";
      this.columnName = tag;
      this.currentItemValue = value;
    }
  }

  ngOnInit() {}
}
