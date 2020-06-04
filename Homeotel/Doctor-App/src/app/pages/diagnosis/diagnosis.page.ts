import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonService } from "src/app/services/common.service";
import { ApiService } from "src/app/services/api.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { LoadingController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: "app-diagnosis",
  templateUrl: "./diagnosis.page.html",
  styleUrls: ["./diagnosis.page.scss"],
})
export class DiagnosisPage implements OnInit {

  diagnosis ="Select";
  advice = "Enter";
  reviewDate = "Select"
  diagnosisName: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    public commonService: CommonService,
    private apiService: ApiService,
    private utilities: UtilitiesService,
    private router: Router,
    private loadingController : LoadingController,
    private db : DatabaseService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
     //this.loadData();
     this.loadDiagnosisFromSqlLite();
    
  }

   
  async loadDiagnosisFromSqlLite() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getDiagnosisData(this.commonService.currentAppointmentId)
            .then((res: any[]) => {
              
              console.log(res);
            
              this.diagnosisName = res["name"]
              this.advice = res["advice"];
              this.reviewDate  = res["review_date"];
            })
            .catch((error) => {
              this.utilities.sqlLiteErrorTrigger( "loadDiagnosisFromSqlLite" , error);
              this.commonService.presentToast("Something went wrong", "toastError");
              console.error(
                
                  JSON.stringify(error)
              );
              
            });
          a.dismiss();
        });
      });
  }
 

  loadData() {
    this.apiService
      .getAppointmentDetails(
        this.commonService.currentAppointmentId
      )
      .subscribe((data) => {
        if (this.utilities.isInvalidApiResponseData(data)) {
          console.log(data);
          this.commonService.presentToast("Something went wrong", "toastError");
        } else {
         console.log(data[1]);
          if(data[1].length >0){
            data[1].forEach(data=>{
              this.diagnosisName = data["name"]
              this.advice = data["advice"];
              this.reviewDate  = data["review_date"];
              //this.reviewDate =`${("0" +formatDate.getDate().toString() ).slice(-2)}-${("0" +(formatDate.getMonth()+1).toString()  ).slice(-2)}-${formatDate.getFullYear()}`;
                
            })
           
          }

          this.commonService.presentToast(
            "data loaded successfully",
            "toastSuccess"
          );
        }
      });
  }
}
