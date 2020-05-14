import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-completed-consultation-details',
  templateUrl: './completed-consultation-details.page.html',
  styleUrls: ['./completed-consultation-details.page.scss'],
})
export class CompletedConsultationDetailsPage implements OnInit {
    consultantDetails =[];
    complaints =[];
    complaintDetails =[];
    diagnosis =[];
    prescriptions =[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    public commonService: CommonService,
    private utilities: UtilitiesService
  ) {}

  ngOnInit() {
    

    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.loadData(params["userId"], params["relativeId"]);
    });
  }

  loadData(userId, relativeId) {
    console.log(userId, relativeId);
    this.apiService.getConsultationDetails( this.commonService.currentDoctorId ,userId, relativeId).subscribe(data => {
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
          this.consultantDetails.push({
            userId: data.user_id,
            relativeId : data.relative_id,
            displayName: displayName,
            appointmentAt: data.appointment_at,
            doctorName: data.doctor_name,
            byName : `by ${data.user_name}`,
            mode: data.mode  
          })
        });

        data[1].forEach(data=>{
          this.complaints.push(data);
        });

        data[2].forEach(data=>{
          this.complaintDetails.push(data);
        })
        data[3].forEach(data=>{
          this.diagnosis.push(data);
        })
        data[4].forEach(data=>{
          this.prescriptions.push(data);
        })
        
        

        this.commonService.presentToast(
          "data loaded successfully",
          "toastSuccess"
        );
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
}
