import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ApiService } from "src/app/services/api.service";
import { CommonService } from "src/app/services/common.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { DatePipe } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { ActionSheetController } from "@ionic/angular";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

@Component({
  selector: "app-doctor-personal",
  templateUrl: "./doctor-personal.page.html",
  styleUrls: ["./doctor-personal.page.scss"],
})
export class DoctorPersonalPage implements OnInit {
  profilePhoto = "assets/images/Emptyprofile.jpg";
  name = "Enter";
  phone = "Enter";
  email = "Enter";
  gender = "Select";
  dob = "Select";
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private actionSheetController: ActionSheetController,
    private camera: Camera,
    private apiService: ApiService,
    public commonService: CommonService,
    private utilities: UtilitiesService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.loadMasters();
  }

  uploadPhoto() {
    let actionSheet = this.actionSheetController
      .create({
        cssClass: "action-sheets-basic-page",
        header: "upload profile picture",
        buttons: [
          {
            icon: "camera",
            text: "Take a Photo",
            handler: () => {
              console.log("Open camera");
              // this.takeSnap();
              this.pickImage(this.camera.PictureSourceType.CAMERA);
            },
          },
          {
            icon: "images",
            text: "Upload from gallery",
            handler: () => {
              console.log("Open gallery");
              this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
            },
          },
          {
            icon: "close-circle",
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
        this.saveDoctorImage(base64Image);
      },
      (err) => {
        // Handle error
        console.log(err);
        alert("Something went wrong...");
      }
    );
  }

  loadMasters() {
    this.apiService
      .getMasters()
      .subscribe((data) => {
        if (this.utilities.isInvalidApiResponseData(data)) {
          console.log(data);
          this.commonService.presentToast("Something went wrong", "toastError");
        } else {
          console.log(data);
          this.commonService.genders = [];
          data[0].forEach((data) => {
            if (data.master_type == "gender") {
              this.commonService.genders.push({
                id: data.id,
                name: data.name,
              });
            }
          });
   this.loadProfile();
          this.commonService.presentToast(
            "data loaded successfully",
            "toastSuccess"
          );
        }
      });
  }


  loadProfile(){
    this.apiService
    .getProfile(this.commonService.currentDoctorId)
    .subscribe((data) => {
      if (this.utilities.isInvalidApiResponseData(data)) {
        console.log(data);
        this.commonService.presentToast("Something went wrong", "toastError");
      } else {
        console.log(data)
        this.commonService.currentDoctorPhoto = data[0][0]["photo"];
        
        this.commonService.doctorPersonal = data[0][0];
        console.log(this.commonService.doctorPersonal["name"]);
        this.name = this.commonService.doctorPersonal["name"]
          ? this.commonService.doctorPersonal["name"]
          : "Enter";
        this.phone = this.commonService.doctorPersonal["phone"]
          ? this.commonService.doctorPersonal["phone"]
          : "Enter";
        this.email = this.commonService.doctorPersonal["email"]
          ? this.commonService.doctorPersonal["email"]
          : "Enter";
        this.gender = this.commonService.doctorPersonal["gender_id"];
        if (this.gender) {
          this.gender = this.commonService.genders.find(
            (data) => data.id == this.gender
          )["name"];
        } else {
          this.gender = "Select";
        }

        this.dob = this.commonService.doctorPersonal["dob"]
          ? this.commonService.doctorPersonal["dob"]
          : "Select";

        this.commonService.presentToast(
          "data loaded successfully",
          "toastSuccess"
        );
      }
    });

  }

  saveDoctorImage(photo){
    
    this.apiService
    .saveDoctorImage(
      this.commonService.currentDoctorId,
      photo
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
        this.commonService.presentToast(
          "issue Details saved successfully",
          "toastSuccess"
        );
        this.loadProfile()
        
      }
    });

  }
}
