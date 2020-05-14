import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonService } from "../../services/common.service";
import { ApiService } from "src/app/services/api.service";
import { UtilitiesService } from "src/app/services/utilities.service";

@Component({
  selector: "app-homeo-kits",
  templateUrl: "./homeo-kits.page.html",
  styleUrls: ["./homeo-kits.page.scss"]
})
export class HomeoKitsPage implements OnInit   {
  selectedTab = 1;
  homeoKits = [];
  homeoOrders =[];

  constructor(
    public commonService: CommonService,
    private apiService: ApiService,
    private utilities: UtilitiesService
  ) {}

  ngOnInit() {
    //this.loadHomeoKits();

  }

  ionViewWillEnter(){
  this.loadHomeoKits();
 // this.loadOrders();

  }

  loadHomeoKits() {
    this.apiService
      .getHomeoKits(this.commonService.currentDoctorId)
      .subscribe(data => {
        if (this.utilities.isInvalidApiResponseData(data)) {
          console.log(data);
          this.commonService.presentToast("Something went wrong", "toastError");
        } else {
          console.log(data);
          this.homeoKits=[];
          data[0].forEach(data => {
            this.homeoKits.push({
              id: data.kit_id,
              name: data.name,
              description: data.description,
              price: data.price,
              photo : data.photo
            });
          });

          this.homeoOrders =[];
          data[1].forEach(data=>{
            this.homeoOrders.push({
              userName : data.user_name,
              kitName : data.kit_name,
              amountPaid : data.amount_paid,
              orderDate : data.created_at ,
              photo : data.photo
            })
          })
         
          this.commonService.presentToast(
            "data loaded successfully",
            "toastSuccess"
          );
        }
      });
  }
  togglingTabs(tab) {
    this.selectedTab = tab;
  }
}
