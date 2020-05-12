import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonService } from "../../services/common.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-homeo-kits",
  templateUrl: "./homeo-kits.page.html",
  styleUrls: ["./homeo-kits.page.scss"],
})
export class HomeoKitsPage implements OnInit {
  doctorId;
  homeokits: any[] = [];
  orderedHomeokits: any[] = [];
  selectedTab = 1;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private apiService: ApiService,
    public utilities: UtilitiesService
  ) {
    if (this.activatedRoute.snapshot.paramMap.get("doctor-id")) {
      this.doctorId = parseInt(
        this.activatedRoute.snapshot.paramMap.get("doctor-id")
      );
      console.log("Need to show specific doctor's Homeokits");
      console.log("this.doctorId -> " + this.doctorId);
      if (this.doctorId) {
        this.getCurrentDoctorsHomeokits(this.doctorId);
      }
    } else {
      console.log("Need to show all Homeokits");
      this.getCurrentDoctorsHomeokits(0);
    }
  }

  ngOnInit() {}

  togglingTabs(tab) {
    this.selectedTab = tab;
  }

  getCurrentDoctorsHomeokits(doctorId) {
    this.apiService.getCurrentDoctorsHomeokits(doctorId).subscribe((data) => {
      console.log("Returned from Backend");
      console.log(data);
      if (this.utilities.isInvalidApiResponseData(data)) {
        console.log("Returned Error");
      } else {
        if (
          typeof data != "undefined" &&
          typeof data[0] != "undefined" &&
          typeof data[0][0] != "undefined"
        ) {
          this.homeokits = data[0];
          if (this.homeokits.length > 0) {
            console.log("Has homeokits - Homeokits showing below");
            console.log(this.homeokits);
          } else {
            console.log("There are no homeokits");
          }

          console.log("***********************************************");

          this.orderedHomeokits = data[1];
          if (this.orderedHomeokits.length > 0) {
            console.log(
              "Has purchased homeokits - purchased Homeokits showing below"
            );
            console.log(this.orderedHomeokits);
          } else {
            console.log("There are no purchased homeokits");
          }
        } else {
          console.log("No homeokits");
        }
      }
    });
  }

  buyKit = (doctorId, kitId, price) => {
    this.utilities.purchasableHomeokitDoctorId = doctorId;
    this.utilities.purchasableHomeokitId = kitId;
    this.utilities.purchasableHomeokitPrice = price;
    this.utilities.isHomeokitPurchaseAction = true;
    this.utilities.isSlotBookingAction = false;
    console.log(
      "Selected kit details -> " + doctorId + " - " + kitId + " - " + price
    );
    this.commonService.selectedHomeKitCost = price;
    this.router.navigate(["/payment-gateways"]);
  };

  getKitPhoto(photoImgData) {
    if (photoImgData) {
      return photoImgData;
    } else {
      return "assets/images/homeokit-1.jpg";
    }
  }
}
