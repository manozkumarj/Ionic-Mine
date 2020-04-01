import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonService } from "../../services/common.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-homeo-kits",
  templateUrl: "./homeo-kits.page.html",
  styleUrls: ["./homeo-kits.page.scss"]
})
export class HomeoKitsPage implements OnInit {
  doctorId;
  homeokits: any[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private apiService: ApiService,
    private utilities: UtilitiesService
  ) {
    this.doctorId = parseInt(
      this.activatedRoute.snapshot.paramMap.get("doctor-id")
    );
    console.log("this.doctorId -> " + this.doctorId);
    if (this.doctorId) {
      this.getCurrentDoctorsHomeokits(this.doctorId);
    }
  }

  ngOnInit() {}

  getCurrentDoctorsHomeokits(doctorId) {
    this.apiService.getCurrentDoctorsHomeokits(doctorId).subscribe(data => {
      console.log("Returned from Backend");
      console.log(JSON.stringify(data[0]));
      if (this.utilities.isInvalidApiResponseData(data)) {
        console.log("Returned Error");
      } else {
        if (
          typeof data != "undefined" &&
          typeof data[0] != "undefined" &&
          typeof data[0][0] != "undefined"
        ) {
          console.log("Has homeokits");
          this.homeokits = data[0];
        } else {
          console.log("No homeokits");
        }
      }
    });
  }

  buyKit = cost => {
    console.log("Selected kit cost is -> " + cost);
    this.commonService.selectedHomeKitCost = cost;
    this.router.navigate(["/payment-gateways"]);
  };
}
