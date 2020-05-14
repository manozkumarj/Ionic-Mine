import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.page.html',
  styleUrls: ['./prescription.page.scss'],
})
export class PrescriptionPage implements OnInit {

  
  currentUserId;
  currentRelativeId;
  prescriptions =[]
  constructor(private activatedRoute : ActivatedRoute , 
    public commonService: CommonService,
    private apiService: ApiService,
    private utilities: UtilitiesService,
    private router : Router,
    public actionSheetController: ActionSheetController,) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
     this.loadPrecription();
  }


  loadPrecription() {
    this.apiService
      .getPrecription(
        this.commonService.currentAppointmentId
      )
      .subscribe((data) => {
        if (this.utilities.isInvalidApiResponseData(data)) {
          console.log(data);
          this.commonService.presentToast("Something went wrong", "toastError");
        } else {
          console.log(data);
          this.prescriptions =[];
          this.commonService.currentDrugs =[];
          data[0].forEach(data=>{
            this.commonService.currentDrugs.push(data.drug_id);
            this.prescriptions.push(data);
          
          });

           
            
          console.log(this.commonService.currentDrugs)  ;
          
        }
      });
  }

  openMenu() {
   
    let actionSheet = this.actionSheetController
      .create({
        cssClass: "action-sheets-basic-page",
        buttons: [
          {
            text: "Edit",
            handler: () => {
              console.log("Edit clicked");
            }
          },
          {
            text: "Delete",
            handler: () => {
              console.log("Delte clicked");
              
            }
          },
          {
            text: "Close",
            role: "cancel",
            handler: () => {
              console.log("Cancel clicked");
            }
          }
        ]
      })
      .then(ac => ac.present());
  }

  editDrug(drugId){
 this.commonService.currentDrugId = drugId;
 this.router.navigate(['/edit-prescription/1/2']);
  }
}

