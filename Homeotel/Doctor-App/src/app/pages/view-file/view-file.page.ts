import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { LoadingController } from "@ionic/angular";
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-view-file',
  templateUrl: './view-file.page.html',
  styleUrls: ['./view-file.page.scss'],
})
export class ViewFilePage implements OnInit {
fileImage;
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    public commonService: CommonService,
    private utilities: UtilitiesService,
    private loadingController : LoadingController,
    private db : DatabaseService
  ) {}

  ngOnInit() {

    this.activatedRoute.params.subscribe(params=>{
     // this.loadFileImage(params["fileId"]);
     this.loadFileImageFromSqlLite(params["fileId"]);
     
     })
  }

  
  async loadFileImageFromSqlLite(fileId) {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getUserFileImage(fileId)
            .then((res) => {
              
              console.log(res);
              this.fileImage = res;
              
            })
            .catch((error) => {
              this.utilities.sqlLiteErrorTrigger( "loadFileImageFromSqlLite" , error);
              this.commonService.presentToast("Something went wrong", "toastError");
             
            });
          a.dismiss();
        });
      });
  }

  async loadFileImage(fileId) {
    
    const loading = await this.loadingController
        .create({
          message: "loading...",
          translucent: true,
        })
        .then((a) => {
          a.present().then(async (res) => {
    this.apiService
      .getFileImage(fileId)
      .subscribe(data => {
        a.dismiss();
        if (this.utilities.isInvalidApiResponseData(data)) {
          console.log(data);
          this.commonService.presentToast("Something went wrong", "toastError");
        } else {
          console.log(data);
          if(data[0].length >0){

            this.fileImage = data[0][0]["file_blob"]
          }
          this.commonService.presentToast(
            "data loaded successfully",
            "toastSuccess"
          );
        }
      });
      });
      });
  }
}
