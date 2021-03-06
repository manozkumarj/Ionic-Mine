import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { CommonService } from "src/app/services/common.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { LoadingController } from "@ionic/angular";
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: "app-lifestyle",
  templateUrl: "./lifestyle.page.html",
  styleUrls: ["./lifestyle.page.scss"]
})
export class LifestylePage implements OnInit {
  smoking;
  alcohol;
  exercise;
  activityLevel;
  profession;
  foodPreferences;
  lifeStyles =[];
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
     // this.loadLifeStyle(params["userId"], params["relativeId"]);
      this.commonService.currentUserId = params["userId"];
      this.commonService.currentRelativeId =   params["relativeId"];
    });
    this.loadLifeStylesFromSqlLite()
  }

 async  loadLifeStyle(userId, relativeId) {
    console.log(userId, relativeId);
    
    const loading = await this.loadingController
        .create({
          message: "loading...",
          translucent: true,
        })
        .then((a) => {
          a.present().then(async (res) => {
    this.apiService.getLifeStyle(userId, relativeId).subscribe(data => {
      a.dismiss()
      if (this.utilities.isInvalidApiResponseData(data)) {
        console.log(data);
        this.commonService.presentToast("Something went wrong", "toastError");
      } else {
        console.log(data);

        data[0].forEach(data => {

          this.lifeStyles.push({
            smoking : data.smoking,
            alcohol :data.alcohol,
            exercise :data.exercise,
            activityLevel : data.activity,
            profession : data.profession,
            foodPreferences : data.food_name

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


  async loadLifeStylesFromSqlLite() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getUserLifeStyles(this.commonService.currentUserId , this.commonService.currentRelativeId)
            .then((res: any[]) => {
              
              console.log(res);
              this.lifeStyles =[];
              this.lifeStyles= res;
            })
            .catch((error) => {
              this.utilities.sqlLiteErrorTrigger( "loadLifeStylesFromSqlLite" , error);
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
