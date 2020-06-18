import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonService } from "../../services/common.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ApiService } from "src/app/services/api.service";
import { LoadingController } from "@ionic/angular";
import { DatabaseService } from "src/app/services/database.service";

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
    private db: DatabaseService,
    private loadingController: LoadingController,
    public utilities: UtilitiesService
  ) {
    if (this.activatedRoute.snapshot.paramMap.get("doctor-id")) {
      this.doctorId = parseInt(
        this.activatedRoute.snapshot.paramMap.get("doctor-id")
      );
      console.log("Need to show specific doctor's Homeokits");
      console.log("this.doctorId -> " + this.doctorId);
      if (this.doctorId) {
        // this.getCurrentDoctorsHomeokits(this.doctorId);
        this.loadCurrentDoctorsHomeokits(this.utilities.userId, this.doctorId);
        this.loadOrderedKits(this.utilities.userId, this.doctorId);
      }
    } else {
      console.log("Need to show all Homeokits");
      // this.getCurrentDoctorsHomeokits(0);
      this.loadCurrentDoctorsHomeokits(this.utilities.userId, 0);
      this.loadOrderedKits(this.utilities.userId, 0);
    }
  }

  ngOnInit() {}

  togglingTabs(tab) {
    this.selectedTab = tab;
  }

  async loadCurrentDoctorsHomeokits(userId, doctorId) {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getDoctorsKits(userId, doctorId)
            .then((res: any[]) => {
              console.log("loadCurrentDoctorsHomeokits are below");
              console.log(res);
              this.homeokits = res;
            })
            .catch((error) => {
              this.utilities.sqliteErrorDisplayer(
                "homeo-kits * loadCurrentDoctorsHomeokits",
                error
              );
              this.utilities.presentToastWarning("Something went wrong");
              console.error(
                "Error -> loadCurrentDoctorsHomeokits() function returned error." +
                  JSON.stringify(error)
              );
            });
          a.dismiss();
        });
      });
  }

  async loadOrderedKits(userId, doctorId) {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getOrderedKits(userId, doctorId)
            .then((res: any[]) => {
              console.log("loadOrderedKits are below");
              console.log(res);
              this.orderedHomeokits = res;
            })
            .catch((error) => {
              this.utilities.sqliteErrorDisplayer(
                "homeo-kits * loadOrderedKits",
                error
              );
              this.utilities.presentToastWarning("Something went wrong");
              console.error(
                "Error -> loadOrderedKits() function returned error." +
                  JSON.stringify(error)
              );
            });
          a.dismiss();
        });
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
