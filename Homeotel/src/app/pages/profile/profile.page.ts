import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ActionSheetController } from "@ionic/angular";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  selectedGender = null;
  files;
  croppedImagepath = "";
  isLoading = false;

  profilePhoto: string = "assets/images/milinda.jpg";
  name;
  username;
  phone;
  email;
  gender;
  dob;
  bloodGroup;
  maritalStatus;
  height;
  weight;

  m_bloodGroup: any[] = [];
  m_maritaStatus: any[] = [];
  m_gender: any[] = [];

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
    private file: File,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProfileDetails();
  }

  moreOptions() {
    console.log("Clicked on moreOptions()");
  }

  getProfileDetails() {
    this.apiService.getProfileDetails().subscribe((data) => {
      console.log("Returned from Backend");
      console.log(JSON.stringify(data));
      if (this.utilities.isInvalidApiResponseData(data)) {
        console.log("Returned Error");
      } else {
        if (
          typeof data != "undefined" &&
          typeof data[0] != "undefined" &&
          typeof data[0][0] != "undefined"
        ) {
          this.utilities.profilePageDetails = data[0][0];
          console.log("Has profile details - below");
          console.log(this.utilities.profilePageDetails);

          this.name = this.utilities.profilePageDetails["name"];
          this.name = this.name ? this.name : "Enter";
          this.phone = this.utilities.profilePageDetails["phone"];
          this.phone = this.phone ? this.phone : "Enter";

          this.email = this.utilities.profilePageDetails["email"];
          this.email = this.email ? this.email : "Enter";
          this.gender = this.utilities.profilePageDetails["gender_id"];
          this.gender = this.gender ? this.gender : "Select";
          this.dob = this.utilities.profilePageDetails["dob"];
          this.dob = this.dob ? this.dob : "Enter";
          this.bloodGroup = this.utilities.profilePageDetails["blood_group_id"];
          this.bloodGroup = this.bloodGroup ? this.bloodGroup : "Select";
          this.maritalStatus = this.utilities.profilePageDetails[
            "marital_status_id"
          ];
          this.maritalStatus = this.maritalStatus
            ? this.maritalStatus
            : "Select";
          this.height = this.utilities.profilePageDetails["height"];
          this.height = this.height ? this.height : "Select";
          this.weight = this.utilities.profilePageDetails["weight"];
          this.weight = this.weight ? this.weight : "Select";

          // Master data
          let masterData = data[1];
          // console.log("***************************");
          // console.log("Profile related master details showing below");
          // console.log(masterData);
          masterData.forEach((masterRow) => {
            if (masterRow.master_type == "blood_group") {
              this.m_bloodGroup.push({
                id: masterRow.id,
                name: masterRow.name,
              });
              this.utilities.bookAppointmentDoctorDetails[
                "m_bloodGroup"
              ] = this.m_bloodGroup;
            } else if (masterRow.master_type == "marital_status") {
              this.m_maritaStatus.push({
                id: masterRow.id,
                name: masterRow.name,
              });
              this.utilities.bookAppointmentDoctorDetails[
                "m_maritaStatus"
              ] = this.m_maritaStatus;
            } else if (masterRow.master_type == "gender") {
              this.m_gender.push({
                id: masterRow.id,
                name: masterRow.name,
              });
              this.utilities.bookAppointmentDoctorDetails[
                "m_gender"
              ] = this.m_gender;
            }
          });

          // console.log("***************************");
          // console.log("blood_group related master details showing below");
          // console.log(
          //   this.utilities.bookAppointmentDoctorDetails["m_bloodGroup"]
          // );
          // console.log("***************************");
          // console.log("maritaStatus related master details showing below");
          // console.log(
          //   this.utilities.bookAppointmentDoctorDetails["m_maritaStatus"]
          // );
          // console.log("***************************");
          // console.log("m_gender related master details showing below");
          // console.log(this.utilities.bookAppointmentDoctorDetails["m_gender"]);
        } else {
          console.log("No user found with provided user ID");
        }
      }
    });
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
        this.profilePhoto = base64Image;
      },
      (err) => {
        // Handle error
        console.log(err);
        alert("Something went wrong...");
      }
    );
  }

  navigateToEditProfile(type) {
    console.log("type -> " + type);
    this.router.navigate(["/edit-profile"]);
  }
}
