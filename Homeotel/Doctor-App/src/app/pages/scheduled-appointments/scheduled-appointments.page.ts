import { Component, OnInit } from "@angular/core";
import { CommonService } from "src/app/services/common.service";
import { ApiService } from "src/app/services/api.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { Router } from '@angular/router';
import { LoadingController } from "@ionic/angular";
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: "app-scheduled-appointments",
  templateUrl: "./scheduled-appointments.page.html",
  styleUrls: ["./scheduled-appointments.page.scss"]
})
export class ScheduledAppointmentsPage implements OnInit {
  selectedTab = 1;
  upComingConsultations = [];
  previousConsultations = [];

  constructor(
    public commonService: CommonService,
    private router : Router,
    private apiService: ApiService,
    private utilities: UtilitiesService,
    private loadingController : LoadingController,
    private db : DatabaseService
  ) {}

  ngOnInit() {
    //this.loadAppointments();
  }

  ionViewWillEnter() {
    //this.loadAppointments();
    this.loadUpcomingConsultationsFromSqlLite();
    this.loadPreviousConsultationsFromSqlLite();
    
  }

  togglingTabs(tab) {
    this.selectedTab = tab;
  }
 async loadAppointments() {
    const loading = await this.loadingController
        .create({
          message: "loading...",
          translucent: true,
        })
        .then((a) => {
          a.present().then(async (res) => {
    this.apiService
      .getAppointments(this.commonService.currentDoctorId)
      .subscribe(data => {
        a.dismiss();
        if (this.utilities.isInvalidApiResponseData(data)) {
          console.log(data);
          this.commonService.presentToast("Something went wrong", "toastError");
        } else {
          console.log(data);
          this.upComingConsultations = [];
          data[0].forEach(data => {
            var displayName;
            if (data.relative_id == 0) {
              displayName = data.user_name;
            } else {
              displayName = data.relative_name;
            }
            
            this.upComingConsultations.push({
              userId: data.user_id,
              relativeId: data.relative_id,
              displayName: displayName,
              appointmentAt: data.appointment_at,
              appointmentId : data.appointment_id,
              doctorName: data.doctor_name,
              byName : data.user_name,
              mode: data.mode,
              photo : data.photo
            });
          });

          this.previousConsultations = [];
          data[1].forEach(data => {
            var displayName;
            if (data.relative_id == 0) {
              displayName = data.user_name;
            } else {
              displayName = data.relative_name;
            }

            this.previousConsultations.push({
              userId: data.user_id,
              relativeId: data.relative_id,
              displayName: displayName,
              appointmentAt: data.appointment_at,
              doctorName: data.doctor_name,
              byName : data.user_name,
              mode: data.mode,
              photo : data.photo
            });
          });
          console.log(this.upComingConsultations);
          console.log(this.previousConsultations);
          this.commonService.presentToast(
            "data loaded successfully",
            "toastSuccess"
          );
        }
      });
    });
  });
  }

  navigateToAppointmentDetailsPage(currentAppointmentId ,appointmentAt){
    this.commonService.currentAppointmentId = currentAppointmentId;
    this.commonService.selectedAppointmentComplaintDetails["appointment_at"] = appointmentAt;
    this.router.navigate([`/appointment-details/${this.commonService.currentAppointmentId}`])
  }


  
  async loadUpcomingConsultationsFromSqlLite() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getScheduledUpcomingAppointments(this.commonService.currentDoctorId)
            .then((res: any[]) => {
              
              console.log(res);
              this.upComingConsultations =[];
              this.upComingConsultations= res;
            })
            .catch((error) => {
              this.utilities.sqlLiteErrorTrigger( "loadUpcomingConsultationsFromSqlLite" , error);
              this.commonService.presentToast("Something went wrong", "toastError");
              console.error(
                
                  JSON.stringify(error)
              );
              
            });
          a.dismiss();
        });
      });
  }
  
  async loadPreviousConsultationsFromSqlLite() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getScheduledPreviousAppointments(this.commonService.currentDoctorId)
            .then((res: any[]) => {
              
              console.log(res);
              this.previousConsultations =[];
              this.previousConsultations= res;
            })
            .catch((error) => {
              this.utilities.sqlLiteErrorTrigger( "loadPreviousConsultationsFromSqlLite" , error);
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
