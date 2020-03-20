import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-lifestyle",
  templateUrl: "./lifestyle.page.html",
  styleUrls: ["./lifestyle.page.scss"]
})
export class LifestylePage implements OnInit {
  lifestyles;

  constructor() {}

  ngOnInit() {
    this.lifestyles = [
      {
        id: 1,
        name: "Smooking",
        list: "Rarely"
      },
      {
        id: 2,
        name: "Alcohol",
        list: "On occassions"
      },
      {
        id: 3,
        name: "Excercise",
        list: "Little"
      },
      {
        id: 4,
        name: "Activity level",
        list: "Medium"
      },
      {
        id: 5,
        name: "Proffession",
        list: "White collar"
      },
      {
        id: 6,
        name: "Food preferences",
        list: "Sweets"
      },
      {
        id: 7,
        name: "Heat preferences",
        list: "Cold intolerance"
      }
    ];
  }
}
