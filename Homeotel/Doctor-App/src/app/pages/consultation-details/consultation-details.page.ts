import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-consultation-details",
  templateUrl: "./consultation-details.page.html",
  styleUrls: ["./consultation-details.page.scss"]
})
export class ConsultationDetailsPage implements OnInit {
  selectedPerson;

  constructor() {}

  ngOnInit() {}

  person(id) {
    console.log("Selected person ID -> " + id);
    this.selectedPerson = id;
  }
}
