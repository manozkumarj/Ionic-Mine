import { Component, OnInit } from "@angular/core";
import { ActionSheetController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { CommonService } from "src/app/services/common.service";
import { UtilitiesService } from "src/app/services/utilities.service";

@Component({
  selector: "app-vitals",
  templateUrl: "./vitals.page.html",
  styleUrls: ["./vitals.page.scss"]
})
export class VitalsPage implements OnInit {
  vitals =[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    public commonService: CommonService,
    private utilities: UtilitiesService
  ) {}

  ngOnInit() {
    

    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.loadVitals(params["userId"], params["relativeId"]);
    });
  }

  loadVitals(userId, relativeId) {
    console.log(userId, relativeId);
    this.apiService.getVitals(userId, relativeId).subscribe(data => {
      if (this.utilities.isInvalidApiResponseData(data)) {
        console.log(data);
        this.commonService.presentToast("Something went wrong", "toastError");
      } else {
        console.log(data);
        this.vitals = [];

        data[0].forEach(data => {
          this.vitals.push({
            
        date: data.created_at,
        temparature: data.temperature,
        pulseRate: data.pulse,
        respirationRate: data.resp_rate,
        bloodPressure: `${data.bp_systolic}/${data.bp_diastolic}`
          })
          
        });

        this.commonService.presentToast(
          "data loaded successfully",
          "toastSuccess"
        );
      }
    });
  }
}
