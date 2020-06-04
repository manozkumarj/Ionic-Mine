import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { LoadingController } from "@ionic/angular";
import { DatabaseService } from 'src/app/services/database.service';

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
    private utilities: UtilitiesService,
    private loadingController : LoadingController,
    private db : DatabaseService
  ) {}
  ngOnInit() {
    

    this.activatedRoute.params.subscribe(params => {
      //this.loadMedicalHistory(params["userId"], params["relativeId"]);
      this.commonService.currentUserId = params["userId"];
      this.commonService.currentRelativeId =  params["relativeId"];
    });

    this.loadAllergiesFromSqlLite();
    this.loadCurrentMedicationFromSqlLite();
    this.loadPastMedicationFromSqlLite();
    this.loadSurgeriesFromSqlLite();
    this.loadInjuriesFromSqlLite();
    this.loadChronicsFromSqlLite();
    this.loadFamilyHistoriesFromSqlLite();
  }

 async  loadMedicalHistory(userId, relativeId) {
    console.log(userId, relativeId);
    
    const loading = await this.loadingController
        .create({
          message: "loading...",
          translucent: true,
        })
        .then((a) => {
          a.present().then(async (res) => {
    this.apiService.getMedicalHistory(userId, relativeId).subscribe(data => {
      a.dismiss();
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
    });
    });
  }


  async loadAllergiesFromSqlLite() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getUserAllergies(this.commonService.currentUserId , this.commonService.currentRelativeId)
            .then((res) => {
              
              console.log(res);
              this.allergies = res;
              
            })
            .catch((error) => {
              this.utilities.sqlLiteErrorTrigger( "loadAllergiesFromSqlLite" , error);
              this.commonService.presentToast("Something went wrong", "toastError");
             
            });
          a.dismiss();
        });
      });
  }

  async loadCurrentMedicationFromSqlLite() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getUserCurrentMedication(this.commonService.currentUserId , this.commonService.currentRelativeId)
            .then((res) => {
              
              console.log(res);
              this.currentMedication = res;
              
            })
            .catch((error) => {
              this.utilities.sqlLiteErrorTrigger( "loadCurrentMedicationFromSqlLite" , error);
              this.commonService.presentToast("Something went wrong", "toastError");
             
            });
          a.dismiss();
        });
      });
  }



  async loadPastMedicationFromSqlLite() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getUserPastMedication(this.commonService.currentUserId , this.commonService.currentRelativeId)
            .then((res) => {
              
              console.log(res);
              this.pastMedication = res;
              
            })
            .catch((error) => {
              this.utilities.sqlLiteErrorTrigger( "loadPastMedicationFromSqlLite" , error);
              this.commonService.presentToast("Something went wrong", "toastError");
             
            });
          a.dismiss();
        });
      });
  }

  
  async loadSurgeriesFromSqlLite() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getUserSurgeries(this.commonService.currentUserId , this.commonService.currentRelativeId)
            .then((res) => {
              
              console.log(res);
              this.surgeries = res;
              
            })
            .catch((error) => {
              this.utilities.sqlLiteErrorTrigger( "loadSurgeriesFromSqlLite" , error);
              this.commonService.presentToast("Something went wrong", "toastError");
             
            });
          a.dismiss();
        });
      });
  }


  async loadInjuriesFromSqlLite() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getUserInjuries(this.commonService.currentUserId , this.commonService.currentRelativeId)
            .then((res) => {
              
              console.log(res);
              this.injuries = res;
              
            })
            .catch((error) => {
              this.utilities.sqlLiteErrorTrigger( "loadInjuriesFromSqlLite" , error);
              this.commonService.presentToast("Something went wrong", "toastError");
             
            });
          a.dismiss();
        });
      });
  }


  async loadChronicsFromSqlLite() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getUserChronics(this.commonService.currentUserId , this.commonService.currentRelativeId)
            .then((res) => {
              
              console.log(res);
              this.chronics = res;
              
            })
            .catch((error) => {
              this.utilities.sqlLiteErrorTrigger( "loadChronicsFromSqlLite" , error);
              this.commonService.presentToast("Something went wrong", "toastError");
             
            });
          a.dismiss();
        });
      });
  }

  async loadFamilyHistoriesFromSqlLite() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getUserFamilyHistories(this.commonService.currentUserId , this.commonService.currentRelativeId)
            .then((res: any[]) => {
              
              console.log(res);
              this.familyHistories =[];
              this.familyHistories= res;
            })
            .catch((error) => {
              this.utilities.sqlLiteErrorTrigger( "loadFamilyHistoriesFromSqlLite" , error);
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
