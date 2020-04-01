import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { NavParams } from "@ionic/angular";
import { ModalController } from "@ionic/angular";
import { CommonService } from "../../services/common.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.page.html",
  styleUrls: ["./modal.page.scss"]
})
export class ModalPage implements OnInit {
  action;
  uuid;
  doctorDetails: any[] = [];

  constructor(
    public modalCtrl: ModalController,
    navParams: NavParams,
    private commonService: CommonService,
    private router: Router,
    private apiService: ApiService,
    private utilities: UtilitiesService
  ) {
    // componentProps can also be accessed at construction time using NavParams
    console.log(navParams.get("action"));
    this.action = navParams.get("action");
    if (this.action == "findDoctor") {
      this.uuid = navParams.get("searchableDoctorUuid");
      this.findDoctor(this.uuid);
    }
  }

  ngOnInit() {}

  findDoctor(uuid) {
    this.apiService.findDoctor(uuid).subscribe(data => {
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
          console.log("Doctor found");
          this.doctorDetails = data[0];
          console.log(this.doctorDetails);
        } else {
          console.log("No doctor found");
        }
      }
    });
  }

  addDoctor = doctorId => {
    console.log("doctorId -> " + doctorId);
    this.commonService.foundDoctor = true;
    this.onCancel();
  };

  onCancel = (isRedirect = false) => {
    this.modalCtrl.dismiss("cancel");
    if (isRedirect) {
      this.router.navigate(["/home"]);
    }
  };

  selectConsultation = consultationType => {
    console.log("consultationType -> " + consultationType);
    this.onCancel();
    this.router.navigate(["/slot-selection"]);
  };
}
