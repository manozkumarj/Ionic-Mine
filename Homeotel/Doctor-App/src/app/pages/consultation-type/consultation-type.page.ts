import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { FormControl, FormGroup } from '@angular/forms';

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
    private router : Router) { }

  ngOnInit() {

    this.createControls();
    this.createForm()
    this.activatedRoute.params.subscribe(params=>{
      this.fetchConsultationTypeData(params["id"]);
      this.loadConsultationData(params["id"]);
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
  save(){
    console.log(this.modeForm.value);
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
        this.router.navigate(["doctor-consultation-modes"]);
        this.commonService.presentToast(
          "clinic Details saved successfully",
          "toastSuccess"
        );
      }
    });

  }
}
