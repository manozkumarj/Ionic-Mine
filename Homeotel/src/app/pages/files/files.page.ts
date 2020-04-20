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
  files: any[] = [];
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

  ngOnInit() {}

  getFiles() {
    this.apiService.getFiles().subscribe((data) => {
      console.log("Returned from Backend");
      console.log(data);
      if (this.utilities.isInvalidApiResponseData(data)) {
        console.log("Returned Error");
      } else {
        if (typeof data != "undefined" && typeof data[0] != "undefined") {
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

  openOptionsMenu(id) {
    console.log("Selected ID -> " + id);
    let actionSheet = this.actShtCtr
      .create({
        cssClass: "action-sheets-basic-page",
        buttons: [
          {
            text: "Edit",
            handler: () => {
              console.log("Edit clicked");
              this.redirect("edit", id);
            },
          },
          {
            text: "Delete",
            handler: () => {
              console.log("Delte clicked");

              this.apiService.deleteFile(id).subscribe((data) => {
                console.log("Returned from Backend");
                console.log(data);
                if (this.utilities.isInvalidApiResponseData(data)) {
                  console.log("Returned Error");
                } else {
                  if (typeof data != "undefined") {
                    console.log("Returned from backend");
                    this.files = this.files.filter(
                      (file) => file.file_id !== id
                    );
                    this.utilities.presentToastSuccess(
                      "Success, file is deleted."
                    );
                  } else {
                    console.log("Something went wrong in backend");
                    this.utilities.presentToastSuccess(
                      "Failed, Something went wrong."
                    );
                  }
                }
              });
            },
          },
          {
            text: "Close",
            role: "cancel",
            handler: () => {
              console.log("Cancel clicked");
            },
          },
        ],
      })
      .then((ac) => ac.present());
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

  getPhotoDataUrl(photo) {
    if (photo) {
      return "data:image/jpeg;base64," + photo;
    } else {
      return "assets/images/zuck.jpg";
    }
  }

  redirect(type, id = 0) {
    console.log("type -> " + type);
    this.utilities.filesPageState["type"] = type;
    if (type == "edit") {
      console.log("id -> " + id);
      let fileIndex = this.files.findIndex((file) => file["file_id"] == id);
      console.log("fileIndex -> " + fileIndex);
      console.log(this.files[fileIndex]);
      this.utilities.filesPageState["photo"] = this.files[fileIndex][
        "file_blob"
      ];
      this.utilities.filesPageState["fileTypeId"] = this.files[fileIndex][
        "file_type_id"
      ];
      this.utilities.filesPageState["fileId"] = this.files[fileIndex][
        "file_id"
      ];
    } else {
      this.utilities.filesPageState["photo"] = this.capturedSnapURL;
      this.utilities.filesPageState["fileTypeId"] = 0;
      this.utilities.filesPageState["fileId"] = 0;
    }
    this.router.navigate(["/edit-file"]);
  }
}
