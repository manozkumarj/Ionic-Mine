import { Component, OnInit } from "@angular/core";
import { ActionSheetController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { CommonService } from "src/app/services/common.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { LoadingController } from "@ionic/angular";
import { DatabaseService } from 'src/app/services/database.service';
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
    private utilities: UtilitiesService,
    private loadingController : LoadingController,
    private db : DatabaseService
  ) {}

  ngOnInit() {
    

    this.activatedRoute.params.subscribe(params => {
      console.log(params);
     // this.loadVitals(params["userId"], params["relativeId"]);
      this.commonService.currentUserId = params["userId"];
      this.commonService.currentRelativeId = params["relativeId"];
    });
    this.loadVitalsFromSqlLite();
  }

  async loadVitals(userId, relativeId) {
    console.log(userId, relativeId);
    
    const loading = await this.loadingController
        .create({
          message: "loading...",
          translucent: true,
        })
        .then((a) => {
          a.present().then(async (res) => {
    this.apiService.getVitals(userId, relativeId).subscribe(data => {
      a.dismiss();
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
    });
    });
  }

  async loadVitalsFromSqlLite() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getUserVitals(this.commonService.currentUserId , this.commonService.currentRelativeId)
            .then((res: any[]) => {
              
              console.log(res);
              this.vitals =[];
              this.vitals= res;
            })
            .catch((error) => {
              this.utilities.sqlLiteErrorTrigger( "loadVitalsFromSqlLite" , error);
              this.commonService.presentToast("Something went wrong", "toastError");
              console.error(
                
                  JSON.stringify(error)
              );
              
            });
          a.dismiss();
        });
      });
  }

}
