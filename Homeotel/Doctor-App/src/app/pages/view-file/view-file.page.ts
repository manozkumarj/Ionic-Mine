import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

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
    private utilities: UtilitiesService
  ) {}

  ngOnInit() {

    this.activatedRoute.params.subscribe(params=>{
      this.loadFileImage(params["fileId"]);
     
     })
  }
  loadFileImage(fileId) {
    this.apiService
      .getFileImage(fileId)
      .subscribe(data => {
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
  }
}
