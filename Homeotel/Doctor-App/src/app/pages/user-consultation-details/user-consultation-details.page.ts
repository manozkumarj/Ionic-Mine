import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-consultation-details',
  templateUrl: './user-consultation-details.page.html',
  styleUrls: ['./user-consultation-details.page.scss'],
})
export class UserConsultationDetailsPage implements OnInit {
 userPreviousConsultations =[];
  constructor(
    private apiService: ApiService,
    public commonService: CommonService,
    private utilities: UtilitiesService,
    private activatedRoute : ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.loaduserConsultations(params["userId"], params["relativeId"]);
    });
    
  }

  loaduserConsultations(userId , relativeId) {
    this.apiService
      .getUserPreviousConsultations(this.commonService.currentDoctorId , userId , relativeId)
      .subscribe(data => {
        if (this.utilities.isInvalidApiResponseData(data)) {
          console.log(data);
          this.commonService.presentToast("Something went wrong", "toastError");
        } else {
          console.log(data);
          this.userPreviousConsultations = [];
          data[0].forEach(data => {
            var displayName;
            if ( data.relative_id ==0) {
              displayName = data.user_name
            }
            else{
              displayName = data.relative_name
            }
            
            this.userPreviousConsultations.push({
              userId: data.user_id,
              relativeId : data.relative_id,
              displayName: displayName,
              appointmentAt: data.appointment_at,
              doctorName: data.doctor_name,
              byName : data.user_name,
              mode: data.mode,
              photo : data.photo
            });
          });

          console.log(this.userPreviousConsultations);

          this.commonService.presentToast(
            "data loaded successfully",
            "toastSuccess"
          );
        }
      });
  }
}

