import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ActionSheetController } from "@ionic/angular";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { computeStackId } from "@ionic/angular/directives/navigation/stack-utils";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ApiService } from "src/app/services/api.service";
import { CommonService } from "src/app/services/common.service";
import { UtilitiesService } from "src/app/services/utilities.service";

@Component({
  selector: "app-kit-details",
  templateUrl: "./kit-details.page.html",
  styleUrls: ["./kit-details.page.scss"]
})
export class KitDetailsPage implements OnInit {
  kitForm: FormGroup;
  file = {
    imageUrl: "assets/images/milinda.jpg",
    fileName: "Prescription",
    date: "24 Mar 2020"
  };
  kitDetailType;
  capturedSnapURL;
  kitName;
  kitDescription;
  kitPrice;
  kitId;
  kitImage: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private actionSheetController: ActionSheetController,
    private camera: Camera,
    private apiService: ApiService,
    public commonService: CommonService,
    private utilities: UtilitiesService
  ) {}

  ngOnInit() {
    this.createControls();
    this.createForm();
    this.activatedRoute.params.subscribe(params => {
      this.kitDetailTypeCheck(params["type"]);
      if (params["id"] && params["id"] != undefined) {
        this.loadKitDetail(params["id"]);
      }
    });
  }

  createControls() {
    this.kitName = new FormControl('',[Validators.required]);
    this.kitDescription = new FormControl('',[Validators.required]);
    this.kitPrice = new FormControl('',[Validators.required]);
  }
  createForm() {
    this.kitForm = new FormGroup({
      kitName: this.kitName,
      kitDescription: this.kitDescription,
      kitPrice: this.kitPrice
    });
  }
  loadKitDetail(kitId) {
    this.kitId = kitId;
    this.apiService
      .getHomeoKitDetail(this.commonService.currentDoctorId, kitId)
      .subscribe(data => {
        if (this.utilities.isInvalidApiResponseData(data)) {
          console.log(data);
          this.commonService.presentToast("Something went wrong", "toastError");
        } else {
          console.log(data);
          this.setKitDetail(data[0][0]);
          this.commonService.presentToast(
            "data loaded successfully",
            "toastSuccess"
          );
        }
      });
  }

  setKitDetail(kit) {
    console.log(kit["photo"]);
    this.kitDescription.setValue(kit["description"]);
    this.kitName.setValue(kit["name"]);
    this.kitPrice.setValue(kit["price"]);
    this.kitImage = kit["photo"];
    console.log(this.kitId);
  }
  kitDetailTypeCheck(type) {
    if (type === "edit") {
      this.kitDetailType = "Edit Kit";
    } else if (type === "add") {
      this.kitDetailType = "Add Kit";
    }
  }

  saveKit() {
    if (this.kitId) {
      this.apiService
        .updateHomeoKit(
          this.commonService.currentDoctorId,
          this.kitId,
          this.kitName.value,
          this.kitDescription.value,
          this.kitPrice.value,
          this.kitImage
        )
        .subscribe(data => {
          if (this.utilities.isInvalidApiResponseData(data)) {
            console.log(data);
            this.commonService.presentToast(
              "Something went wrong",
              "toastError"
            );
          } else {
            console.log(data);
            this.router.navigate(["/homeo-kits"]);
            this.commonService.presentToast(
              "kit Details Updated successfully",
              "toastSuccess"
            );
          }
        });
    } else {
      this.apiService
        .saveHomeoKits(
          this.commonService.currentDoctorId,
          this.kitName.value,
          this.kitDescription.value,
          this.kitPrice.value,
          this.kitImage
        )
        .subscribe(data => {
          if (this.utilities.isInvalidApiResponseData(data)) {
            console.log(data);
            this.commonService.presentToast(
              "Something went wrong",
              "toastError"
            );
          } else {
            console.log(data);
            this.router.navigate(["/homeo-kits"]);
            this.commonService.presentToast(
              "kit Details saved successfully",
              "toastSuccess"
            );
          }
        });
    }
    
  }

  uploadingPhoto() {
    let actionSheet = this.actionSheetController
      .create({
        cssClass: "action-sheets-basic-page",
        buttons: [
          {
            text: "Take a Photo",
            icon: "camera",
            handler: () => {
              console.log("Open camera");
              // this.takeSnap();
              this.pickImage(this.camera.PictureSourceType.CAMERA);
            }
          },
          {
            icon: "images",
            text: "Upload from gallery",
            handler: () => {
              console.log("Open gallery");
              this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
            }
          },
          {
            icon: "close-circle",
            text: "Cancel",
            role: "cancel",
            handler: () => {
              console.log("Cancel clicked");
            }
          }
        ]
      })
      .then(ac => ac.present());
  }

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then(
      imageData => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        let base64Image = "data:image/jpeg;base64," + imageData;
        this.kitImage = base64Image;
        
      },
      err => {
        // Handle error
        console.log(err);
        alert("Something went wrong...");
      }
    );
  }
}
