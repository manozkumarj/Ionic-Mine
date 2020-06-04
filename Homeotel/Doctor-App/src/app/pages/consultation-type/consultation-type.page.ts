import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { FormControl, FormGroup } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-consultation-type',
  templateUrl: './consultation-type.page.html',
  styleUrls: ['./consultation-type.page.scss'],
})
export class ConsultationTypePage implements OnInit {

  consultationType;
  consultationIcon;
  modeId;
  session;
  price;
  modeForm : FormGroup;
  constructor(private activatedRoute : ActivatedRoute , 
    public commonService: CommonService,
    private apiService: ApiService,
    private utilities: UtilitiesService,
    private router : Router,
    private loadingController : LoadingController,
    private db : DatabaseService) { }

  ngOnInit() {

    this.createControls();
    this.createForm()
    this.activatedRoute.params.subscribe(params=>{
      this.fetchConsultationTypeData(params["id"]);
     // this.loadConsultationData(params["id"]);
      this.loadModeDetailsFromSqlLite(params["id"]);
    });
   
  }


  createControls(){
  this.session = new FormControl();
  this.price = new FormControl();
  }

  createForm(){
  this.modeForm = new FormGroup({
    session : this.session,
    price : this.price
  })
  }
  loadConsultationData(modeId) {
    this.modeId = modeId;
    this.apiService
      .getModeDetail(this.commonService.currentDoctorId, modeId)
      .subscribe(data => {
        if (this.utilities.isInvalidApiResponseData(data)) {
          console.log(data);
          this.commonService.presentToast("Something went wrong", "toastError");
        } else {
          console.log(data);
          this.setData(data[0][0])
          this.commonService.presentToast(
            "data loaded successfully",
            "toastSuccess"
          );
        }
      });
  }

setData(data){
  console.log(data);
  this.modeId =data["mode_id"];
  console.log(this.modeId)
  this.consultationType = data["name"];
  this.consultationIcon = data["icon"];
  this.session.setValue(data["minimum_min"]);
  this.price.setValue(data["price_per_min"]);
}
  
  fetchConsultationTypeData(id){

    this.commonService.consultations.forEach(data=>{
      if(id==data.id){
        this.consultationType = data.type;
        this.consultationIcon = data.icon
      }


    })

  }
 async save(){
    console.log(this.modeForm.value);
    const loading = await this.loadingController
    .create({
      message: "Loading...",
      translucent: true,
    })
    .then((a) => {
      a.present().then(async (res) => {
    this.apiService
    .saveMode(
      this.commonService.currentDoctorId,
      this.modeId,
      this.session.value,
      this.price.value
    )
    .subscribe((data) => {
      if (this.utilities.isInvalidApiResponseData(data)) {
        console.log(data);
        this.commonService.presentToast(
          "Something went wrong",
          "toastError"
        );
      } else {
        console.log(data);
        let res = data[0][0];
          if (data[0][0]["query"]) {
            let receivedQuery = res["query"];
            console.log(receivedQuery);
            this.db
                    .crudOperations(receivedQuery)
                    .then((res) => {
                      a.dismiss();
                      this.router.navigate(["doctor-consultation-modes"]);
        this.commonService.presentToast(
          "clinic Details saved successfully",
          "toastSuccess"
        );
                    })
                    .catch((error) => {
                      this.utilities.sqlLiteErrorTrigger( "save" , error);
                      this.commonService.presentToast(
                        "Something went wrong",
                        "toastError"
                      );
                      a.dismiss();
                      console.error(
                          JSON.stringify(error)
                      );
                    });
           
          }
            else{
              this.commonService.presentToast(
                "Something went wrong",
                "toastError"
              );
            }
        
      }
    });
    });
    });

  }

  async loadModeDetailsFromSqlLite(modeId) {
    this.modeId = modeId;
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getModeDetails(this.commonService.currentDoctorId , this.modeId)
            .then((res: any[]) => {
              
              console.log(res);
              if(res.length >0){
                this.setData(res)
                 
              
             }
            })
            .catch((error) => {
              this.utilities.sqlLiteErrorTrigger( "save" , error);
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
