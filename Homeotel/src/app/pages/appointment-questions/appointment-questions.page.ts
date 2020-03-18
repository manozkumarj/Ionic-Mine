import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-appointment-questions',
  templateUrl: './appointment-questions.page.html',
  styleUrls: ['./appointment-questions.page.scss'],
})
export class AppointmentQuestionsPage implements OnInit {

  currentQuestion;

  enteredDescription = null;

  title;
  backwardLink;
  forwardLink;
  question;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentQuestion = null;
    let paramOne = parseInt(this.activatedRoute.snapshot.paramMap.get("one"));
    let paramTwo = parseInt(this.activatedRoute.snapshot.paramMap.get("two"));
    let paramThree = parseInt(this.activatedRoute.snapshot.paramMap.get("three"));
    let paramFour = parseInt(this.activatedRoute.snapshot.paramMap.get("four"));

    if (paramFour) {
      console.log("paramFour");
      this.title = `${paramFour} of 4`;
      this.backwardLink = `/appointment-questions/1/2/3`;
      this.forwardLink = `/appointments`;
      this.question = 'Description of the pain?';
      this.currentQuestion = 'four';
    } else if (paramThree) {
      console.log("paramThree");
      this.title = `${paramThree} of 4`;
      this.backwardLink = `/appointment-questions/1/2`;
      this.forwardLink = `/appointment-questions/1/2/3/4`;
      this.question = 'Aggravated by?';
      this.currentQuestion = 'three';
    } else if (paramTwo) {
      console.log("paramTwo");
      this.title = `${paramTwo} of 4`;
      this.backwardLink = `/appointment-questions/1`;
      this.forwardLink = `/appointment-questions/1/2/3`;
      this.currentQuestion = 'two';
      this.question = 'Recurring every?';
    } else if (paramOne) {
      console.log("paramOne");
      this.title = `${paramOne} of 4`;
      this.backwardLink = `/appointments`;
      this.forwardLink = `/appointment-questions/1/2`;
      this.question = 'Is your complaint recurring?';
      this.currentQuestion = 'one';
    }

  }

  answered = ansId => {
    if (this.currentQuestion == 'four') {
      console.log("enteredDescription -> " + this.enteredDescription);
      this.router.navigate([this.forwardLink]);
    } else {
      console.log("ansId -> " + ansId);
      this.router.navigate([this.forwardLink]);
    }
  }

}
