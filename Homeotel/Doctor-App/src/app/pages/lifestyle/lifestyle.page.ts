import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { CommonService } from "src/app/services/common.service";
import { UtilitiesService } from "src/app/services/utilities.service";

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
    private utilities: UtilitiesService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.loadLifeStyle(params["userId"], params["relativeId"]);
    });
  }

  loadLifeStyle(userId, relativeId) {
    console.log(userId, relativeId);
    this.apiService.getLifeStyle(userId, relativeId).subscribe(data => {
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
  }
}
