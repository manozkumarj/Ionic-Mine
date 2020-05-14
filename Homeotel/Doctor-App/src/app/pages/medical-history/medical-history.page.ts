import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: "app-medical-history",
  templateUrl: "./medical-history.page.html",
  styleUrls: ["./medical-history.page.scss"]
})
export class MedicalHistoryPage implements OnInit {
  allergies;
  currentMedication;
  pastMedication;
  surgeries;
  injuries;
  chronics: any;
  familyHistories=[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    public commonService: CommonService,
    private utilities: UtilitiesService
  ) {}
  ngOnInit() {
    

    this.activatedRoute.params.subscribe(params => {
      this.loadMedicalHistory(params["userId"], params["relativeId"]);
    });
  }

  loadMedicalHistory(userId, relativeId) {
    console.log(userId, relativeId);
    this.apiService.getMedicalHistory(userId, relativeId).subscribe(data => {
      if (this.utilities.isInvalidApiResponseData(data)) {
        console.log(data);
        this.commonService.presentToast("Something went wrong", "toastError");
      } else {
        console.log(data);
if(data[0].length>0){

  this.allergies = data[0][0].allergy;
}
if(data[1].length >0){

  this.currentMedication = data[1][0].current_medication;
}

if(data[2].length >0){

  this.pastMedication = data[2][0].past_medication;
}

if(data[3].length >0){

  this.surgeries = data[3][0].surgery;
}
if(data[4].length >0){

  this.injuries = data[4][0].injury;
}

if(data[5].length >0){

  this.chronics = data[5][0].chronic;
}

if(data[6].length >0){

  data[6].forEach(data=>{
    this.familyHistories.push({
      relationName : data.relation_name,
      diseaseName : data.disease_name
    })
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
