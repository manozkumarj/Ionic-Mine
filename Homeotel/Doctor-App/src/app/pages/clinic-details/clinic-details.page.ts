import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { CommonService } from "src/app/services/common.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { FormGroup, FormControl } from "@angular/forms";
import { DatabaseService } from 'src/app/services/database.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: "app-clinic-details",
  templateUrl: "./clinic-details.page.html",
  styleUrls: ["./clinic-details.page.scss"],
})
export class ClinicDetailsPage implements OnInit {
  clinicForm: FormGroup;
  name;
  address;
  walkinFee;
  fromDate;
  toDate;
  opensAt;
  closesAt;
  clinicId;
  weekDays;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    public commonService: CommonService,
    private utilities: UtilitiesService,
    private db : DatabaseService , 
    private loadingController : LoadingController
  ) {}

  ngOnInit() {
    this.createControls();
    this.createForm();
    this.activatedRoute.params.subscribe(params => {
     
      if (params["id"] && params["id"] != undefined) {
        //this.loadClinicDetail(params["id"]);
        this.loadClinicDetailFromSqlLite(params["id"])
      }
    });
  }

  createControls() {
    this.name = new FormControl();
    this.address = new FormControl();
    this.walkinFee = new FormControl();
    this.fromDate = new FormControl();
    this.toDate = new FormControl();
    this.opensAt = new FormControl();
    this.closesAt = new FormControl();
  }

  createForm() {
    this.clinicForm = new FormGroup({
      name: this.name,
      address: this.address,
      walkinFee: this.walkinFee,
      fromDate: this.fromDate,
      toDate: this.toDate,
      opensAt: this.opensAt,
      closesAt: this.closesAt,
    });
  }


  loadClinicDetail(clinicId){
    console.log(clinicId);
    this.clinicId = clinicId;
    this.apiService
      .getClinicDetail(this.commonService.currentDoctorId, clinicId)
      .subscribe(data => {
        if (this.utilities.isInvalidApiResponseData(data)) {
          console.log(data);
          this.commonService.presentToast("Something went wrong", "toastError");
        } else {
          console.log(data);
          this.setClinicDetail(data[0][0]);
          this.commonService.presentToast(
            "data loaded successfully",
            "toastSuccess"
          );
        }
      });

  }

  setClinicDetail(data){
  console.log(data);
  
  this.name.setValue(data["clinic_name"]);
  this.address.setValue(data["clinic_address"]);
  this.walkinFee.setValue(data["walkin_fee"]);
  this.fromDate.setValue(+data["week_days"].split(',')[0]); 
  this.toDate.setValue(+data["week_days"].split(',')[data["week_days"].split(',').length-1]);
  this.opensAt.setValue(data["from_time"]);
  this.closesAt.setValue(data["to_time"]);

  }
  
  formatingDates(){

    var tempDates =[];
    var fromDateIndex = this.commonService.dates.findIndex((data) => {
      return data.id === this.fromDate.value;
    });

    var toDateIndex = this.commonService.dates.findIndex((data) => {
      return data.id === this.toDate.value;
    });

    if(this.fromDate.value < this.toDate.value){
     
      for(var i = fromDateIndex; i<= toDateIndex ; i++){
      tempDates.push(this.commonService.dates[i]["id"]);
      }
     
    }
    else{
      for(var i = fromDateIndex ; i<= this.commonService.dates.length-1; i++){
        tempDates.push(this.commonService.dates[i]["id"]);
      }

      for(var i=0 ; i<=toDateIndex ; i++){
        tempDates.push(this.commonService.dates[i]["id"]);
      }
    }
    this.weekDays = tempDates.join();
    console.log(this.weekDays)
  }
  async save() {
  
    this.formatingDates()
    
    if (this.fromDate.value == null || this.toDate.value == null) {
      this.commonService.presentToast("Please enter date", "toastError");
      return;
    } else {
      this.formatingDates();
    }
    if (this.clinicId) {
      const loading = await this.loadingController
      .create({
        message: "loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
      this.apiService
        .updateClinic(
          this.commonService.currentDoctorId,
          this.clinicId,
          this.name.value,
          this.address.value,
          this.walkinFee.value,
          this.weekDays,
          this.opensAt.value,
          this.closesAt.value
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
                      this.router.navigate(["/doctor-clinics"]);
                      this.commonService.presentToast(
                        "clinic Details Updated successfully",
                        "toastSuccess"
                      );
                      this.commonService.presentToast(
                        "data Updated successfully",
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
    } else {
      console.log(this.clinicForm.value ,"save")
      const loading = await this.loadingController
      .create({
        message: "loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
      this.apiService
        .saveClinic(
          this.commonService.currentDoctorId,
          this.name.value,
          this.address.value,
          this.walkinFee.value,
          this.weekDays,
          this.opensAt.value,
          this.closesAt.value
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
                      this.router.navigate(["/doctor-clinics"]);
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
  }

  
  async loadClinicDetailFromSqlLite(clinicId) {
    this.clinicId = clinicId;
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getClinicDetails(this.commonService.currentDoctorId , this.clinicId)
            .then((res: any[]) => {
              
              console.log(res);
              if(res.length >0){
                this.setClinicDetail(res);
              
             }
            })
            .catch((error) => {
              this.utilities.sqlLiteErrorTrigger( "loadClinicDetailFromSqlLite" , error);
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
