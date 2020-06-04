import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { CommonService } from "src/app/services/common.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { LoadingController } from "@ionic/angular";
import { DatabaseService } from 'src/app/services/database.service';
@Component({
  selector: "app-help-center",
  templateUrl: "./help-center.page.html",
  styleUrls: ["./help-center.page.scss"]
})
export class HelpCenterPage implements OnInit {
  helpCenters=[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    public commonService: CommonService,
    private utilities: UtilitiesService,
    private loadingController : LoadingController,
    private db : DatabaseService
  ) {}

  ngOnInit() {
   // this.loadMasters();
   this.loadMastersFromSqlLite();
  }

  async loadMasters() {
    
    const loading = await this.loadingController
        .create({
          message: "loading...",
          translucent: true,
        })
        .then((a) => {
          a.present().then(async (res) => {
    this.apiService.getIssueMaster().subscribe(data => {
      a.dismiss();
      if (this.utilities.isInvalidApiResponseData(data)) {
        console.log(data);
        this.commonService.presentToast("Something went wrong", "toastError");
      } else {
        console.log(data);
        data[0].forEach(data=>{
          this.helpCenters.push(data);
        })
        this.commonService.presentToast(
          "data loaded successfully",
          "toastSuccess"
        );
      }
    });
    });
    });
  }
  async loadMastersFromSqlLite() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getIssues()
            .then((res: any[]) => {
              
              console.log(res);
              this.helpCenters =[];
              this.helpCenters= res;
            })
            .catch((error) => {
              this.utilities.sqlLiteErrorTrigger( "loadMastersFromSqlLite" , error);
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

