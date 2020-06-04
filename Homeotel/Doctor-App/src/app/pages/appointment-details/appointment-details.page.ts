import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { DatabaseService } from 'src/app/services/database.service';


@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.page.html',
  styleUrls: ['./appointment-details.page.scss'],
})
export class AppointmentDetailsPage implements OnInit {

  consultantDetails =[];
    complaints =[];
    complaintDetails =[];
    diagnosis =[];
    prescriptions =[];
    currentUserId ;
    currentRelativeId;
    doctorConsultationModesAndDetails =[];
    doctorSlotDetails =[]


  constructor(
    public modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    public commonService: CommonService,
    private utilities: UtilitiesService,
    private router : Router,
    private alertController: AlertController,
    private loadingController : LoadingController,
    private db : DatabaseService  ) {}
  ngOnInit() {
   
  }

  ionViewWillEnter(){
    //this.loadData()
    this.loadAppointmentDetailsFromSqlLite();
    this.loadComplaintDetailsFromSqlLite();
  }

  loadData() {
    this.apiService.getAppointmentDetails( this.commonService.currentAppointmentId).subscribe(data => {
      if (this.utilities.isInvalidApiResponseData(data)) {
        console.log(data);
        this.commonService.presentToast("Something went wrong", "toastError");
      } else {
        
        this.resetData();
        console.log(data);
        data[0].forEach(data=>{

          var displayName;
            if ( data.relative_id ==0) {
              displayName = data.user_name
            }
            else{
              displayName = data.relative_name
            }

            this.commonService.currentUserId = data.user_id;
            this.commonService.currentRelativeId = data.relative_id;

          this.consultantDetails.push({
            userId: data.user_id,
            relativeId : data.relative_id,
            displayName: `For ${displayName}`,
            appointmentAt: data.appointment_at,
            doctorName: ` Dr ${data.doctor_name}`,
            byName : `by ${data.user_name}`,
            mode: data.mode  ,
            mainComplaint : data.main_complaint
          })
        });

        data[2].forEach(data=>{
          this.complaintDetails.push(data);
        })
   
        
        

        this.commonService.presentToast(
          "data loaded successfully",
          "toastSuccess"
        );
      }
    });23
  }

   async changeSlot() {

    const loading = await this.loadingController
    .create({
      message: "Loading...",
      translucent: true,
    })
    .then((a) => {
      a.present().then(async (res) => {
        this.db
          .getSlotConsultantMasters(this.commonService.currentDoctorId)
          .then((res: any[]) => {
            
            console.log(res);
            if(res.length >0){
                     
let masterData = res;

this.commonService.appointmentDoctorDetails ={};
this.doctorSlotDetails =[];
masterData.forEach((masterRow) => {
  if (masterRow.master_type == "doctorDetails") {

    this.commonService.appointmentDoctorDetails["name"] =
      masterRow.colOne;
    this.commonService.appointmentDoctorDetails["username"] =
      masterRow.colTwo;
  } else if (masterRow.master_type == "modes") {
    this.doctorConsultationModesAndDetails.push({
      id: masterRow.colOne,
      consultationMode: masterRow.colTwo,
      time: masterRow.colThree,
      price: masterRow.colFour,
    });
  } else if (masterRow.master_type == "doctorSlotDetails") {
    this.doctorSlotDetails.push({
      clinicId: masterRow.colOne,
      weekDays: masterRow.colTwo,
      fromTime: masterRow.colThree,
      toTime: masterRow.colFour,
    });

    
  }

  
});
this.commonService.appointmentDoctorDetails["doctorSlotDetails"] = this.doctorSlotDetails;
            
           }
          })
          
          .catch((error) => {
            this.utilities.sqlLiteErrorTrigger( "changeSlot" , error);
            this.commonService.presentToast("Something went wrong", "toastError");
            console.error(
              
                JSON.stringify(error)
            );
            
          });
        a.dismiss();
      });
    });

    const loading1 = await this.loadingController
    .create({
      message: "Loading...",
      translucent: true,
    })
    .then((a) => {
      a.present().then(async (res) => {
        this.db
          .getSlotAppointmentAt(this.commonService.currentDoctorId)
          .then((res: any[]) => {
            
            console.log(res);
            if(res.length >0){
              this.commonService.appointmentDoctorDetails[ "bookedAppointments"] = res;
            
           }
          })
          .catch((error) => {
            this.utilities.sqlLiteErrorTrigger( "changeSlot" , error);
            this.commonService.presentToast("Something went wrong", "toastError");
            console.error(
              
                JSON.stringify(error)
            );
            
          });
        a.dismiss();
      });
    });
    
    
        this.router.navigate(['/slot-selection'])
      
   
  }
  resetData(){
   this.consultantDetails =[];
   this.complaints =[];
   this.complaintDetails =[];
   this.diagnosis =[];
   this.prescriptions =[];
  }

  async cancelAppointment(){
    console.log(this.commonService.currentAppointmentId);
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
    this.apiService
        .cancelAppointment(
          this.commonService.currentAppointmentId
        )
        .subscribe(data => {
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
                      
            this.commonService.presentToast(
              "appointment cancelled successfully",
              "toastSuccess"
            );
            this.router.navigate(["/scheduled-appointments"]);
                    })
                    .catch((error) => {
                      this.utilities.sqlLiteErrorTrigger( "cancelAppointment" , error);
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


  cancelAppointmentAlert() {
    this.alertController
      .create({
        header: "Are you sure?",
        message: "Are you sure to cancel the slot?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
          },
          {
            text: "confirm",
            handler: () => {
              this.cancelAppointment();
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  async loadAppointmentDetailsFromSqlLite() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getAppointmentDetails(this.commonService.currentDoctorId)
            .then((res: any[]) => {
              
              console.log(res);
              this.consultantDetails =[];
              this.consultantDetails= res;
            })
            .catch((error) => {
              this.utilities.sqlLiteErrorTrigger( "loadAppointmentDetailsFromSqlLite" , error);
              this.commonService.presentToast("Something went wrong", "toastError");
              console.error(
                
                  JSON.stringify(error)
              );
              
            });
          a.dismiss();
        });
      });
  }

  async loadComplaintDetailsFromSqlLite() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getAppointmentComplaintDetails(this.commonService.currentDoctorId)
            .then((res: any[]) => {
              
              console.log(res);
              this.complaintDetails =[];
              this.complaintDetails= res;
            })
            .catch((error) => {
              this.utilities.sqlLiteErrorTrigger( "loadComplaintDetailsFromSqlLite" , error);
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