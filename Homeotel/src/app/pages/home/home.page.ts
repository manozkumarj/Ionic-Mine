import { Component, OnInit } from "@angular/core";
import { CommonService } from "./../../services/common.service";
import { ApiService } from "src/app/services/api.service";
import { UtilitiesService } from "src/app/services/utilities.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  allAppointments: any[] = [];

  constructor(
    private commonService: CommonService,
    private apiService: ApiService,
    private utilities: UtilitiesService
  ) {
    this.getAppointments();
  }

  getAppointments() {
    this.apiService.getAppointments().subscribe((data) => {
      console.log("Returned from Backend");
      console.log(data);
      console.log(data[0]);
      if (this.utilities.isInvalidApiResponseData(data)) {
        console.log("Returned Error");
      } else {
        if (
          typeof data != "undefined" &&
          typeof data[0] != "undefined" &&
          typeof data[0][0] != "undefined"
        ) {
          this.allAppointments = data[0];
          console.log("Appointments found");
        } else {
          console.log("Backend returned error");
        }
      }
    });
  }

  ngOnInit() {}

  search() {
    console.log("Clicked on Search");
  }
}
