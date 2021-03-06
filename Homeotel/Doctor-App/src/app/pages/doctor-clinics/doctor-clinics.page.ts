import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { DatabaseService } from 'src/app/services/database.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-doctor-clinics',
  templateUrl: './doctor-clinics.page.html',
  styleUrls: ['./doctor-clinics.page.scss'],
})
export class DoctorClinicsPage implements OnInit {

  clinics =[
    // { name :"Homeo Care , Jubliee Hills" , link :"/clinic-details/edit/1"},
    // { name :"Homeo Care , Madhapur" , link :"/clinic-details/edit/1"},
    // { name :"HomeoCare" , link :"/clinic-details/edit/1"}
  ]

  constructor(
    public commonService: CommonService,
    private apiService: ApiService,
    private utilities: UtilitiesService,
    private db : DatabaseService,
    private loadingController : LoadingController
  ) {}


  ngOnInit() {
    
  }

  ionViewWillEnter(){
 // this.loadClinics()
 this.loadClinicsFromSqlLite();
  }


  
  loadClinics() {
    this.apiService
      .getProfile(this.commonService.currentDoctorId)
      .subscribe(data => {
        if (this.utilities.isInvalidApiResponseData(data)) {
          console.log(data);
          this.commonService.presentToast("Something went wrong", "toastError");
        } else {
          console.log(data);
          this.clinics=[];
          
          data[2].forEach(data => {
            this.clinics.push(data);
          });

          console.log(this.clinics);
         
          this.commonService.presentToast(
            "data loaded successfully",
            "toastSuccess"
          );
        }
      });
  }
 
  async loadClinicsFromSqlLite() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getDoctorClinics(this.commonService.currentDoctorId)
            .then((res: any[]) => {
              
              console.log(res);
              if(res.length >0){
                this.clinics = []  ;
                this.clinics = res;
              
             }
            })
            .catch((error) => {
              this.utilities.sqlLiteErrorTrigger( "loadClinicsFromSqlLite" , error);
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
