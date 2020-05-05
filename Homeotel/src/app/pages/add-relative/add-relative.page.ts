import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ActionSheetController } from "@ionic/angular";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { Router } from "@angular/router";
import { Validators, FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-add-relative",
  templateUrl: "./add-relative.page.html",
  styleUrls: ["./add-relative.page.scss"],
})
export class AddRelativePage implements OnInit {
  relativeForm: FormGroup;

  selectedPhoto: string;
  relativeName: string;
  relationId: number;

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
    private apiService: ApiService,
    private utilities: UtilitiesService,
    private actShtCtr: ActionSheetController,
    private camera: Camera,
    private router: Router
  ) {
    this.relativeForm = new FormGroup({
      relativeName: new FormControl("", Validators.required),
      relationId: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {}

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
        this.selectedPhoto = base64Image;
      },
      (err) => {
        // Handle error
        console.log(err);
        alert("Something went wrong...");
      }
    );
  }
}
