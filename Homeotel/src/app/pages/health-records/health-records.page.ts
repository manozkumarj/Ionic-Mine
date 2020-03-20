import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-health-records",
  templateUrl: "./health-records.page.html",
  styleUrls: ["./health-records.page.scss"]
})
export class HealthRecordsPage implements OnInit {
  healthRecords;

  constructor() {
    this.healthRecords = [
      {
        id: 1,
        name: "Vitals",
        redirectUrl: "/vitals"
      },
      {
        id: 3,
        name: "Medical History",
        redirectUrl: "/medical-history"
      },
      {
        id: 4,
        name: "Lifestyle",
        redirectUrl: "/lifestyle"
      },
      {
        id: 5,
        name: "Files",
        redirectUrl: "/files"
      },
      {
        id: 6,
        name: "Previous Consultations",
        redirectUrl: "/previous-consultations"
      }
    ];
  }

  ngOnInit() {}
}
