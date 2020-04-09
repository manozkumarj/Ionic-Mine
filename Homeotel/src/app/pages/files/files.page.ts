import { Component, OnInit } from "@angular/core";
import { ActionSheetController } from "@ionic/angular";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";
import { UtilitiesService } from "src/app/services/utilities.service";
import { Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-files",
  templateUrl: "./files.page.html",
  styleUrls: ["./files.page.scss"],
})
export class FilesPage implements OnInit {
  files;
  capturedSnapURL: string;
  croppedImagepath = "";
  isLoading = false;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50,
  };

  cameraOptions: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
  };

  constructor(
    private actShtCtr: ActionSheetController,
    private camera: Camera,
    private file: File,
    private router: Router,
    private apiService: ApiService,
    private utilities: UtilitiesService
  ) {
    this.getFiles();
  }

  ngOnInit() {
    this.files = [
      {
        id: 0,
        imageUrl: "assets/images/milinda.jpg",
        fileName: "Prescription",
        date: "24 Mar 2020",
      },
      {
        id: 1,
        imageUrl: "assets/images/zuck.jpg",
        fileName: "Lab Results",
        date: "15 Mar 2019",
      },
    ];
  }

  getFiles() {
    this.apiService.getFiles().subscribe((data) => {
      console.log("Returned from Backend");
      console.log(data);
      if (this.utilities.isInvalidApiResponseData(data)) {
        console.log("Returned Error");
      } else {
        if (
          typeof data != "undefined" &&
          typeof data[0] != "undefined" &&
          typeof data[0][0] != "undefined"
        ) {
          console.log("Data returned from backend");
          this.files = data[0];
          console.log("this.files are showing below");
          console.log(this.files);

          let fileTypesMasters = data[1];
          this.utilities.filesPageState["fileTypesMasters"] = fileTypesMasters;
          console.log("this.fileTypesMasters are showing below");
          console.log(fileTypesMasters);
        } else {
          console.log("Something went wrong in backend");
        }
      }
    });
  }

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        let base64Image = "data:image/jpeg;base64," + imageData;
        this.capturedSnapURL = base64Image;
        this.redirect("add");
      },
      (err) => {
        // Handle error
        console.log(err);
        // alert("Something went wrong...");
        this.redirect("add");
      }
    );
  }

  takeSnap() {
    console.log("Taking a snapshot");
    this.camera.getPicture(this.cameraOptions).then(
      (imageData) => {
        // this.camera.DestinationType.FILE_URI gives file URI saved in local
        // this.camera.DestinationType.DATA_URL gives base64 URI

        let base64Image = "data:image/jpeg;base64," + imageData;
        this.capturedSnapURL = base64Image;
      },
      (err) => {
        console.log(err);
        // Handle error
      }
    );
  }

  openMenu() {
    console.log("Actionsheet is opened");
    let actionSheet = this.actShtCtr
      .create({
        cssClass: "action-sheets-basic-page",
        buttons: [
          {
            text: "Take a Photo",
            handler: () => {
              console.log("Open camera");
              // this.takeSnap();
              this.pickImage(this.camera.PictureSourceType.CAMERA);
            },
          },
          {
            text: "Upload from gallery",
            handler: () => {
              console.log("Open gallery");
              this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
            },
          },
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              console.log("Cancel clicked");
            },
          },
        ],
      })
      .then((ac) => ac.present());
  }

  redirect(type, id = 0) {
    console.log("type -> " + type);
    this.utilities.filesPageState["type"] = type;
    if (type == "edit") {
      console.log("id -> " + id);
      let fileIndex = this.files.findIndex((file) => file["file_id"] == id);
      console.log("fileIndex -> " + fileIndex);
      console.log(this.files[fileIndex]);
      this.utilities.filesPageState["photo"] = "assets/images/mark.jpg";
      this.utilities.filesPageState["fileTypeId"] = this.files[fileIndex][
        "file_type_id"
      ];
      this.utilities.filesPageState["fileId"] = this.files[fileIndex][
        "file_id"
      ];
    } else {
      this.utilities.filesPageState["photo"] = "assets/images/milinda.jpg";
      this.utilities.filesPageState["fileTypeId"] = 0;
      this.utilities.filesPageState["fileId"] = 0;
    }
    this.router.navigate(["/edit-file"]);
  }
}
