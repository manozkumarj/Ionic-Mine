import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { LoadingController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-doctor-consultation-modes',
  templateUrl: './doctor-consultation-modes.page.html',
  styleUrls: ['./doctor-consultation-modes.page.scss'],
})
export class DoctorConsultationModesPage implements OnInit {

  videoConsultations =[];
  audioConsultations =[];
  chatConsultations =[];
  physicalVisits =[];

  constructor(
    public commonService: CommonService,
    private apiService: ApiService,
    private utilities: UtilitiesService,
    private loadingController : LoadingController,
    private db : DatabaseService
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter(){
   // this.loadModes()
    this.loadModesFromSqlLite()
  }

  async loadModesFromSqlLite() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getDoctorModes(this.commonService.currentDoctorId)
            .then((res: any[]) => {
              
              console.log(res);
              if(res.length >0){
                res.forEach(data => {
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
            })
            .catch((error) => {
              this.utilities.sqlLiteErrorTrigger( "loadModesFromSqlLite" , error);
              this.commonService.presentToast("Something went wrong", "toastError");
              console.error(
                
                  JSON.stringify(error)
              );
              
            });
          a.dismiss();
        });
      });
  }
  loadModes() {
    this.apiService
      .getProfile(this.commonService.currentDoctorId)
      .subscribe(data => {
        if (this.utilities.isInvalidApiResponseData(data)) {
          console.log(data);
          this.commonService.presentToast("Something went wrong", "toastError");
        } else {
          console.log(data);
          this.resetData()

        console.log(typeof(data[3]))
          data[3].forEach(data => {
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

        
          this.commonService.presentToast(
            "data loaded successfully",
            "toastSuccess"
          );
        }
      });
  }

  resetData(){
   this. videoConsultations =[];
   this. audioConsultations =[];
   this. chatConsultations =[];
   this. physicalVisits =[];
  }

}
