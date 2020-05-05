import { Component, OnInit } from "@angular/core";
import { UtilitiesService } from "src/app/services/utilities.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-health-records",
  templateUrl: "./health-records.page.html",
  styleUrls: ["./health-records.page.scss"],
})
export class HealthRecordsPage implements OnInit {
  healthRecords;

  selectedPerson = 1;

  constructor(private router: Router, private utilities: UtilitiesService) {
    this.healthRecords = [
      {
        id: 0,
        name: "Vitals",
        redirectUrl: "/vitals",
      },
      {
        id: 1,
        name: "Medical History",
        redirectUrl: "/medical-history",
      },
      {
        id: 2,
        name: "Lifestyle",
        redirectUrl: "/lifestyle",
      },
      {
        id: 3,
        name: "Files",
        redirectUrl: "/files",
      },
      {
        id: 4,
        name: "Previous Consultations",
        redirectUrl: "/previous-consultations",
      },
    ];
  }

  ngOnInit() {}

  person(id) {
    console.log("Selected person ID -> " + id);
    if (id == 0) {
      this.router.navigate(["/add-relative"]);
    } else {
      this.selectedPerson = id;
    }
  }

  redirector(id) {
    this.utilities.selectedRelativeId = this.selectedPerson;
    console.log("Selected person ID -> " + this.selectedPerson);
    console.log("Selected option -> " + this.healthRecords[id]["name"]);
    this.router.navigate([this.healthRecords[id]["redirectUrl"]]);
  }
}
