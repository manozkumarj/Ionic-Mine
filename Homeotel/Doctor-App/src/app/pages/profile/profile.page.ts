import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  selectedGender = null;
  specialisation =[];
  experience;
  certification;
  qualification;
  clinics =[];
  videoConsultations =[];
  audioConsultations =[];
  chatConsultations =[];
  physicalVisits =[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    public commonService: CommonService,
    private utilities: UtilitiesService
  ) {}

  ngOnInit() {
  //  this.loadMasters()
  }

  ionViewWillEnter(){
    this.loadMasters();
  }
  loadMasters() {
    this.apiService.getMasters().subscribe((data) => {
      if (this.utilities.isInvalidApiResponseData(data)) {
        console.log(data);
        this.commonService.presentToast("Something went wrong", "toastError");
      } else {
        console.log(data);
        this.resetMasters();
        data[0].forEach((data) => {
          if (data.master_type == "specialisation") {
            this.commonService.specialisations.push({
              id: data.id,
              name: data.name,
            });
          }
          else if(data.master_type=="qualification"){
            this.commonService.qualifications.push({
              id: data.id,
              name: data.name,
            });       
          }
      
          else if(data.master_type=="certification"){
            this.commonService.certifications.push({
              id: data.id,
              name: data.name,
            });       
          }
          else if(data.master_type=="award"){
            this.commonService.awards.push({
              id: data.id,
              name: data.name,
            });       
          }
        });
        this.loadProfile();
        this.commonService.presentToast(
          "data loaded successfully",
          "toastSuccess"
        );
      }
    });
  }

  resetMasters(){

    this.commonService.specialisations = [];
    this.commonService.qualifications = [];
    this.commonService.certifications = [];
    this.commonService.awards = [];
    this.clinics =[];
    this. videoConsultations =[];
    this. audioConsultations =[];
    this. chatConsultations =[];
    this. physicalVisits =[];
  }


  loadProfile() {
    this.apiService
      .getProfile(this.commonService.currentDoctorId)
      .subscribe((data) => {
        if (this.utilities.isInvalidApiResponseData(data)) {
          console.log(data);
          this.commonService.presentToast("Something went wrong", "toastError");
        } else {
          
         
          if(data[1].length >0){
            this.loadSpecialisation(data[1][0]["specialisation"]);
            this.loadExperience(data[1][0]["experience"]);
            this.loadQualifications(data[1][0]["qualifications"]);
            this.loadCertifications(data[1][0]["certifications"]);
           
          
            
          
         }
         if(data[2]){
          this.loadClinics(data[2]);
        }
        if(data[3]){
          
          this.loadModes(data[3]);
        }
         
          
         

          this.commonService.presentToast(
            "data loaded successfully",
            "toastSuccess"
          );
        }
      });
  }


  loadModes(data){
    data.forEach(data => {
     // this.modes.push({data})
     if(data.mode_id ==1){
       this.videoConsultations.push(data);
     }
     else if(data.mode_id ==2){
      this.audioConsultations.push(data);
    }
     else if(data.mode_id ==3){
      this.chatConsultations.push(data);
    }
     else if(data.mode_id ==4){
      this.physicalVisits.push(data);
    }
    });

  
  }
  loadClinics(data){

if(data.length >0){
  var dateIds =[];
    var dateNames =[]
  data.forEach(data=>{
    if(data.week_days){
      dateIds = data.week_days.split(',');
      dateIds.forEach((dateId) => {
        dateNames.push(
          this.commonService.dates.find(
            (data) => data.id == +dateId
          )["day"]
        );
      });
    }
   
    console.log(dateNames);
    this.clinics.push({
      name : data.clinic_name ,
      timings : `${dateNames[0]} - ${dateNames[dateNames.length-1]}  : ${data.from_time} to ${data.to_time} `,
      fees : `In clinic fees : ₹${data.walkin_fee}`
    })
  });
  console.log(this.clinics);
}

  }
  loadSpecialisation(data) {
    if (data) {
      var specialisationIds = [];
      specialisationIds = data.split(",");
      console.log(specialisationIds);
      this.specialisation=[];
      specialisationIds.forEach((specialisationId) => {
        this.specialisation.push(
          this.commonService.specialisations.find(
            (data) => data.id == +specialisationId
          )["name"]
        );

        console.log(specialisationId);
      });
      
      console.log(this.specialisation);
    }
  }

  loadExperience(data){

    if(data){
      this.experience = `${data.toString()}  years experience`;
    }}


    loadQualifications(data) {
      if (data) {
        
        var qualificationIds = [];
        qualificationIds = data.split(",");
        console.log(qualificationIds);
        var qualificationNames = [];
        qualificationIds.forEach((qualificationId) => {
          qualificationNames.push(
            this.commonService.qualifications.find(
              (data) => data.id == +qualificationId
            )["name"]
          );
  
          
        });
        this.qualification = qualificationNames.toString();
        console.log(this.qualification);
      } 
    }
  
    
    loadCertifications(data) {
      if (data) {
        
        var certicationIds = [];
        certicationIds = data.split(",");
        console.log(certicationIds);
        var certificationNames = [];
        certicationIds.forEach((certicationId) => {
          certificationNames.push(
            this.commonService.certifications.find(
              (data) => data.id == +certicationId
            )["name"]
          );
  
          
        });
        this.certification = certificationNames.toString();
        console.log(this.certification);
      } 
    }
  
  









  moreOptions() {
    console.log("Clicked on moreOptions()");
  }

  toggleGender(id) {
    if (id == 1) {
      console.log("Selected gender is -> Male");
    } else {
      console.log("Selected gender is -> Female");
    }
    this.selectedGender = id;
  }

}
