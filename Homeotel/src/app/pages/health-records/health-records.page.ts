import { Component, OnInit } from "@angular/core";
import { UtilitiesService } from "src/app/services/utilities.service";
import { Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-health-records",
  templateUrl: "./health-records.page.html",
  styleUrls: ["./health-records.page.scss"],
})
export class HealthRecordsPage implements OnInit {
  healthRecords;

  selectedPerson = 1;

  userRelatives: any[] = [];

  constructor(
    private router: Router,
    public utilities: UtilitiesService,
    private apiService: ApiService
  ) {
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
    this.getUserRelatives();
  }

  ngOnInit() {}

  getUserRelatives() {
    this.apiService.getUserRelatives().subscribe((data) => {
      console.log("Returned from Backend");
      console.log(data);
      if (this.utilities.isInvalidApiResponseData(data)) {
        console.log("Returned Error");
      } else {
        if (typeof data != "undefined" && typeof data[0] != "undefined") {
          this.userRelatives = data[0];
        }
      }
    });
  }

  person(id) {
    console.log("Selected person ID -> " + id);
    if (id == 0) {
      this.router.navigate(["/add-relative/home"]);
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
