import { Component, OnInit } from "@angular/core";
import { ActionSheetController } from "@ionic/angular";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { LoadingController } from "@ionic/angular";
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: "app-files",
  templateUrl: "./files.page.html",
  styleUrls: ["./files.page.scss"]
})
export class FilesPage implements OnInit {
  files =[];

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
     // this.loadFiles(params["userId"] , params["relativeId"]);
      this.commonService.currentUserId = params["userId"];
      this.commonService.currentRelativeId = params["relativeId"];
     
     })
     this.loadFilesFromSqlLite();
    
  }

  
  async loadFiles(userId , relativeId) {
    const loading = await this.loadingController
        .create({
          message: "loading...",
          translucent: true,
        })
        .then((a) => {
          a.present().then(async (res) => {
    
    this.apiService
      .getFiles(userId , relativeId)
      .subscribe(data => {
        a.dismiss();
        if (this.utilities.isInvalidApiResponseData(data)) {
          console.log(data);
          this.commonService.presentToast("Something went wrong", "toastError");
        } else {
          console.log(data);
          if(data[0].length>0){
            data[0].forEach(data=>{
              this.files.push({
                fileId : data.file_id,
                imageUrl : data.file_blob,
                fileName: data.name,
                date: data.file_date
              })
            })
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

  
  async loadFilesFromSqlLite() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getUserFiles(this.commonService.currentUserId , this.commonService.currentRelativeId)
            .then((res: any[]) => {
              
              console.log(res);
              this.files =[];
              this.files= res;
            })
            .catch((error) => {
              this.utilities.sqlLiteErrorTrigger( "loadFilesFromSqlLite" , error);
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
