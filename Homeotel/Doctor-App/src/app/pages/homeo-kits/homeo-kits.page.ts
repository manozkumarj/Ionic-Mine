import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonService } from "../../services/common.service";
import { ApiService } from "src/app/services/api.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { LoadingController } from "@ionic/angular";
import { DatabaseService } from 'src/app/services/database.service';

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
    private utilities: UtilitiesService,
    private loadingController : LoadingController,
    private db : DatabaseService
  ) {}

  ngOnInit() {
    //this.loadHomeoKits();

  }

  ionViewWillEnter(){
 // this.loadHomeoKits();
 // this.loadOrders();
 this.loadHomeoKitsFromSqlLite();
 this.loadHomeoOrdersFromSqlLite();

  }

  async loadHomeoKits() {
    
    const loading = await this.loadingController
        .create({
          message: "loading...",
          translucent: true,
        })
        .then((a) => {
          a.present().then(async (res) => {
    this.apiService
      .getHomeoKits(this.commonService.currentDoctorId)
      .subscribe(data => {
        a.dismiss();
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
      });
      });
  }
  togglingTabs(tab) {
    this.selectedTab = tab;
  }

  async loadHomeoKitsFromSqlLite() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getDoctorHomeoKits(this.commonService.currentDoctorId)
            .then((res: any[]) => {
              
              console.log(res);
              this.homeoKits =[];
              this.homeoKits= res;
            })
            .catch((error) => {
              this.utilities.sqlLiteErrorTrigger( "loadHomeoKitsFromSqlLite" , error);
              this.commonService.presentToast("Something went wrong", "toastError");
              console.error(
                
                  JSON.stringify(error)
              );
              
            });
          a.dismiss();
        });
      });
  }
  async loadHomeoOrdersFromSqlLite() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getDoctorHomeoOrders(this.commonService.currentDoctorId)
            .then((res: any[]) => {
              
              console.log(res);
              this.homeoOrders =[];
              this.homeoOrders= res;
            })
            .catch((error) => {
              this.utilities.sqlLiteErrorTrigger( "loadHomeoOrdersFromSqlLite" , error);
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
