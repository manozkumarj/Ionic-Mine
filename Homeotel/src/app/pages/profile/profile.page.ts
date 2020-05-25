import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ActionSheetController } from "@ionic/angular";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { DatabaseService } from "src/app/services/database.service";

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

  profilePhoto: string;
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
    public utilities: UtilitiesService,
    private actShtCtr: ActionSheetController,
    private camera: Camera,
    private loadingController: LoadingController,
    private db: DatabaseService,
    private file: File,
    private router: Router
  ) {}

  ngOnInit() {
    // this.getProfileDetails();
  }

  ionViewWillEnter() {
    // this.getProfileDetails();
    this.getLocalProfileDetails();
  }

  moreOptions() {
    console.log("Clicked on moreOptions()");
  }

  async getLocalProfileDetails() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getProfileDetails(this.utilities.userId)
            .then((res: any[]) => {
              console.log("Received getProfileDetails details are below -> ");
              // console.log(JSON.stringify(lifestyleDetails));
              // console.log(res);
              this.utilities.profilePageDetails = res[0];
              console.log("this.utilities.profilePageDetails is below");
              console.log(this.utilities.profilePageDetails);
              if (this.utilities.profilePageDetails) {
                this.name = this.utilities.profilePageDetails["name"];
                this.name = this.name ? this.name : "Enter";
                this.phone = this.utilities.profilePageDetails["phone"];
                this.phone = this.phone ? this.phone : "Enter";

                this.email = this.utilities.profilePageDetails["email"];
                this.email = this.email ? this.email : "Enter";

                this.gender = this.utilities.profilePageDetails["gender_id"];

                this.dob = this.utilities.profilePageDetails["dob"];
                this.dob = this.dob ? this.dob : "Enter";

                this.bloodGroup = this.utilities.profilePageDetails[
                  "blood_group_id"
                ];
                this.maritalStatus = this.utilities.profilePageDetails[
                  "marital_status_id"
                ];

                this.height = this.utilities.profilePageDetails["height"];
                this.height = this.height ? this.height + " Feet" : "Select";

                this.weight = this.utilities.profilePageDetails["weight"];
                this.weight = this.weight ? this.weight + " Kgs" : "Select";

                // getProfileRelatedMasters starts here
                this.db
                  .getProfileRelatedMasters()
                  .then((res: any[]) => {
                    console.log(res);
                    let masterData = res[0];
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

                    if (this.gender) {
                      this.gender = this.m_gender[this.gender - 1]["name"];
                    } else {
                      this.gender = "Select";
                    }

                    if (this.bloodGroup) {
                      this.bloodGroup = this.m_bloodGroup[this.bloodGroup - 1][
                        "name"
                      ];
                    } else {
                      this.bloodGroup = "Select";
                    }

                    if (this.maritalStatus) {
                      this.maritalStatus = this.m_maritaStatus[
                        this.maritalStatus - 1
                      ]["name"];
                    } else {
                      this.maritalStatus = "Select";
                    }

                    // profilePhoto starts here
                    this.db
                      .getProfilePhoto(this.utilities.userId)
                      .then((res: any[]) => {
                        a.dismiss();
                        console.log(res);
                        // Master data
                        let photoData = res[0];
                        if (photoData) {
                          this.profilePhoto = this.utilities.getPhotoDataUrl(
                            photoData[0]["photo"]
                          );
                        } else {
                          this.utilities.getPhotoDataUrl(null);
                        }
                      })
                      .catch((error) => {
                        a.dismiss();
                        this.utilities.presentToastWarning(
                          "Something went wrong"
                        );
                        console.error(
                          "Error -> getProfilePhoto() function returned error." +
                            JSON.stringify(error)
                        );
                      });
                  })
                  .catch((error) => {
                    a.dismiss();
                    this.utilities.presentToastWarning("Something went wrong");
                    console.error(
                      "Error -> loadlifestyleData() function returned error." +
                        JSON.stringify(error)
                    );
                  });
              } else {
                this.utilities.presentToastWarning("Something went wrong");
              }
            })
            .catch((error) => {
              a.dismiss();
              this.utilities.presentToastWarning("Something went wrong");
              console.error(
                "Error -> loadlifestyleData() function returned error." +
                  JSON.stringify(error)
              );
            });
        });
      });
  }

  async getProfileDetails() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.apiService.getProfileDetails().subscribe((data) => {
            a.dismiss();
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
                this.utilities.profilePageDetails = data[0][0];
                // console.log("Has profile details - below");
                // console.log(this.utilities.profilePageDetails);

                this.name = this.utilities.profilePageDetails["name"];
                this.name = this.name ? this.name : "Enter";
                this.phone = this.utilities.profilePageDetails["phone"];
                this.phone = this.phone ? this.phone : "Enter";

                this.email = this.utilities.profilePageDetails["email"];
                this.email = this.email ? this.email : "Enter";

                this.gender = this.utilities.profilePageDetails["gender_id"];

                this.dob = this.utilities.profilePageDetails["dob"];
                this.dob = this.dob ? this.dob : "Enter";

                this.bloodGroup = this.utilities.profilePageDetails[
                  "blood_group_id"
                ];

                // this.bloodGroup = this.bloodGroup ? this.bloodGroup : "Select";

                this.maritalStatus = this.utilities.profilePageDetails[
                  "marital_status_id"
                ];

                // this.maritalStatus = this.maritalStatus
                //   ? this.maritalStatus
                //   : "Select";

                this.height = this.utilities.profilePageDetails["height"];
                this.height = this.height ? this.height + " Feet" : "Select";

                this.weight = this.utilities.profilePageDetails["weight"];
                this.weight = this.weight ? this.weight + " Kgs" : "Select";

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

                // if (this.gender) {
                //   this.gender = this.m_gender[this.gender - 1]["name"];
                // } else {
                //   this.gender = "Select";
                // }

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
                console.log("***************************");
                console.log("m_gender related master details showing below");
                console.log(
                  this.utilities.bookAppointmentDoctorDetails["m_gender"]
                );

                if (this.gender) {
                  this.gender = this.m_gender[this.gender - 1]["name"];
                } else {
                  this.gender = "Select";
                }

                console.log("***************************");
                console.log(
                  "m_bloodGroup related master details showing below"
                );
                console.log(
                  this.utilities.bookAppointmentDoctorDetails["m_bloodGroup"]
                );
                if (this.bloodGroup) {
                  this.bloodGroup = this.m_bloodGroup[this.bloodGroup - 1][
                    "name"
                  ];
                } else {
                  this.bloodGroup = "Select";
                }

                if (this.maritalStatus) {
                  this.maritalStatus = this.m_maritaStatus[
                    this.maritalStatus - 1
                  ]["name"];
                } else {
                  this.maritalStatus = "Select";
                }

                // Master data
                let photoData = data[2];
                if (photoData.length > 0) {
                  // console.log("photoData -> ");
                  // console.log(photoData[0]["photo"]);
                  this.profilePhoto = this.utilities.getPhotoDataUrl(
                    photoData[0]["photo"]
                  );
                } else {
                  this.utilities.getPhotoDataUrl(null);
                }
              } else {
                console.log("No user found with provided user ID");
              }
            }
          });
        });
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
        this.updateProfilePhoto(this.profilePhoto);
      },
      (err) => {
        // Handle error
        console.log(err);
        alert("Something went wrong...");
      }
    );
  }

  async updateProfilePhoto(photo) {
    const loading = await this.loadingController
      .create({
        message: "Saving...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.apiService.upsertUserPhoto(0, photo).subscribe((data) => {
            console.log("Returned from Backend");
            console.log(JSON.stringify(data));
            if (this.utilities.isInvalidApiResponseData(data)) {
              a.dismiss();
              console.log("Returned Error");
              console.log(data);
              if (data["error"]) {
                console.log("Something went wrong");
              }
            } else {
              console.log("Returned Success");
              this.utilities.currentUserDetails["photo"] = photo;
              this.utilities.presentToastSuccess(
                "Profile photo updated successfully."
              );

              let res = data[0][0];
              if (data[0][0]["query"]) {
                let receivedQuery = res["query"];
                console.log(receivedQuery);

                this.db
                  .crudOperations(receivedQuery)
                  .then((res) => {
                    a.dismiss();
                    console.log("Profile photo updated successfully");
                  })
                  .catch((error) => {
                    a.dismiss();
                    console.error(
                      "Error -> updateProfilePhoto function returned error." +
                        JSON.stringify(error)
                    );
                  });
              } else {
                a.dismiss();
                console.log("Query property is not received from backend SP");
              }
            }
          });
        });
      });
  }

  navigateToEditProfile(type) {
    console.log("type -> " + type);
    this.router.navigate(["/edit-profile"]);
  }
}
