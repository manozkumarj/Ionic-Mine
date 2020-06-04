import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { CommonService } from "src/app/services/common.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { LoadingController } from "@ionic/angular";
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: "app-doctor-professional",
  templateUrl: "./doctor-professional.page.html",
  styleUrls: ["./doctor-professional.page.scss"],
})
export class DoctorProfessionalPage implements OnInit {
  profilePhoto = "assets/images/milinda.jpg";
  specialisation = "Select";
  experience = "Enter";
  qualification= "Select";
  certification= "Select";
  award= "Select";
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    public commonService: CommonService,
    private utilities: UtilitiesService,
    private loadingController : LoadingController,
    private db : DatabaseService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
   // this.loadMasters();
   this.loadMastersFromSqlLite();
   this.loadProfessionalFromSqlLite();
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
            .getPrecriptionMasters()
            .then((res: any[]) => {
              
              console.log(res);
              this.resetMasters();
              res.forEach((data) => {
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
  }
  async loadProfile() {
    
    const loading = await this.loadingController
        .create({
          message: "loading...",
          translucent: true,
        })
        .then((a) => {
          a.present().then(async (res) => {
    this.apiService
      .getProfile(this.commonService.currentDoctorId)
      .subscribe((data) => {
        a.dismiss();
        if (this.utilities.isInvalidApiResponseData(data)) {
          console.log(data);
          this.commonService.presentToast("Something went wrong", "toastError");
        } else {
          
         
          if(data[1].length >0){
            this.loadSpecialisation(data[1][0]["specialisation"]);
            this.loadExperience(data[1][0]["experience"]);
            this.loadQualifications(data[1][0]["qualifications"]);
            this.loadCertifications(data[1][0]["certifications"]);
            this.loadAwards(data[1][0]["awards"]);
          
            
          }
          

          this.commonService.presentToast(
            "data loaded successfully",
            "toastSuccess"
          );
        }
      });
      });
      });
  }

  loadSpecialisation(data) {
    if (data) {
      var specialisationIds = [];
      specialisationIds = data.split(",");
      console.log(specialisationIds);
      var specialisationNames = [];
      specialisationIds.forEach((specialisationId) => {
        specialisationNames.push(
          this.commonService.specialisations.find(
            (data) => data.id == +specialisationId
          )["name"]
        );

        console.log(specialisationId);
      });
      this.specialisation = specialisationNames.toString();
      console.log(this.specialisation);
    } else {
      this.specialisation = "Select";
    }
  }


  loadExperience(data){

    if(data){
      this.experience = `${data.toString()}  years`;
    }

    else{
      this.experience="Enter"
    }

  }

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
    } else {
      this.qualification = "Select";
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
    } else {
      this.certification = "Select";
    }
  }


  loadAwards(data) {
    if (data) {
      
      var awardIds = [];
      awardIds = data.split(",");
      console.log(awardIds);
      var awardNames = [];
      awardIds.forEach((awardId) => {
        awardNames.push(
          this.commonService.awards.find(
            (data) => data.id == +awardId
          )["name"]
        );

        
      });
      this.award = awardNames.toString();
      console.log(this.certification);
    } else {
      this.award = "Select";
    }
  }


  async loadProfessionalFromSqlLite() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getDoctorProfessional(this.commonService.currentDoctorId)
            .then((res: any[]) => {
              
              console.log(res);
              if(res.length >0){
                this.loadSpecialisation(res["specialisation"]);
                this.loadExperience(res["experience"]);
                this.loadQualifications(res["qualifications"]);
                this.loadCertifications(res["certifications"]);
               
              
                
              
             }
            })
            .catch((error) => {
              this.utilities.sqlLiteErrorTrigger( "loadProfessionalFromSqlLite" , error);
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
