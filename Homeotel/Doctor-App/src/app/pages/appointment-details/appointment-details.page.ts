import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ModalController, AlertController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';


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
  ) {}
  ngOnInit() {
   
  }

  ionViewWillEnter(){
    this.loadData()
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
    });
  }

  changeSlot() {

    
    this.apiService.getDoctorConsultantDetailsMasters( this.commonService.currentDoctorId).subscribe(data => {
      if (this.utilities.isInvalidApiResponseData(data)) {
        console.log(data);
        this.commonService.presentToast("Something went wrong", "toastError");
      } else {
        
let masterData = data[0];

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
this.commonService.appointmentDoctorDetails[ "bookedAppointments"] = data[1];
        console.log(this.commonService.appointmentDoctorDetails);
        
        this.commonService.presentToast(
          "data loaded successfully",
          "toastSuccess"
        );
        this.router.navigate(['/slot-selection'])
      }
    });
  }
  resetData(){
   this.consultantDetails =[];
   this.complaints =[];
   this.complaintDetails =[];
   this.diagnosis =[];
   this.prescriptions =[];
  }

  cancelAppointment(){
    console.log(this.commonService.currentAppointmentId);
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
            this.commonService.presentToast(
              "appointment cancelled successfully",
              "toastSuccess"
            );
            this.router.navigate(["/scheduled-appointments"]);
           
          }
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
  
}