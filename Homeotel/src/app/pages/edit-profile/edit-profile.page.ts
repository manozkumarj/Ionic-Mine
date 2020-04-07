import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.page.html",
  styleUrls: ["./edit-profile.page.scss"],
})
export class EditProfilePage implements OnInit {
  title;
  backwardLink;
  forwardLink;
  question;
  currentQuestion;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private utilities: UtilitiesService
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
    } else if (paramEight) {
      console.log("paramEight");
      this.title = `${paramEight} of 9`;
      this.backwardLink = `/edit-profile/1/2/3/4/5/6/7`;
      this.forwardLink = `/edit-profile/1/2/3/4/5/6/7/8/9`;
      this.question = "Please select your height";
      this.currentQuestion = "eight";
    } else if (paramSeven) {
      console.log("paramSeven");
      this.title = `${paramSeven} of 9`;
      this.backwardLink = `/edit-profile/1/2/3/4/5/6`;
      this.forwardLink = `/edit-profile/1/2/3/4/5/6/7/8`;
      this.question = "Please select your marital status";
      this.currentQuestion = "seven";
    } else if (paramSix) {
      console.log("paramSix");
      this.title = `${paramSix} of 9`;
      this.backwardLink = `/edit-profile/1/2/3/4/5`;
      this.forwardLink = `/edit-profile/1/2/3/4/5/6/7`;
      this.question = "Please select your blood group";
      this.currentQuestion = "six";
    } else if (paramFive) {
      console.log("paramFive");
      this.title = `${paramFive} of 9`;
      this.backwardLink = `/edit-profile/1/2/3/4`;
      this.forwardLink = `/edit-profile/1/2/3/4/5/6`;
      this.question = "Please select your Date of birth";
      this.currentQuestion = "five";
    } else if (paramFour) {
      console.log("paramFour");
      this.title = `${paramFour} of 9`;
      this.backwardLink = `/edit-profile/1/2/3`;
      this.forwardLink = `/edit-profile/1/2/3/4/5`;
      this.question = "Please select your gender";
      this.currentQuestion = "four";
    } else if (paramThree) {
      console.log("paramThree");
      this.title = `${paramThree} of 9`;
      this.backwardLink = `/edit-profile/1/2`;
      this.forwardLink = `/edit-profile/1/2/3/4`;
      this.question = "Please enter your email ID";
      this.currentQuestion = "three";
    } else if (paramTwo) {
      console.log("paramTwo");
      this.title = `${paramTwo} of 9`;
      this.backwardLink = `/edit-profile/1`;
      this.forwardLink = `/edit-profile/1/2/3`;
      this.currentQuestion = "two";
      this.question = "Please enter your phone number";
    } else if (paramOne) {
      console.log("paramOne");
      this.title = `${paramOne} of 9`;
      this.backwardLink = `/profile`;
      this.forwardLink = `/edit-profile/1/2`;
      this.question = "Please enter your name";
      this.currentQuestion = "one";
    }
  }

  ngOnInit() {}

  answered = () => {
    console.log("answered -> " + this.currentQuestion);
    this.router.navigate([this.forwardLink]);
  };
}
