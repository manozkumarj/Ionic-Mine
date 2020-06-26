import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ActionSheetController } from "@ionic/angular";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { ActivatedRoute, Router } from "@angular/router";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { LoadingController } from "@ionic/angular";
import { DatabaseService } from "src/app/services/database.service";

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

  relationsMaster;

  redirectTo: string;

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
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    public utilities: UtilitiesService,
    private actShtCtr: ActionSheetController,
    private db: DatabaseService,
    private loadingController: LoadingController,
    private camera: Camera,
    private router: Router
  ) {
    this.relativeForm = new FormGroup({
      relativeName: new FormControl("", Validators.required),
      relationId: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.redirectTo = this.activatedRoute.snapshot.paramMap.get("redirect-to");
    console.log("redirectTo -> " + this.redirectTo);

    if (this.utilities.isHybridApp) {
      this.getLocalRelationsMasters();
    } else {
      this.getRelationsMasters();
    }
  }

  async getRelationsMasters() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.apiService.getRelationsMasters().subscribe((data) => {
            a.dismiss();
            console.log("Returned from Backend");
            console.log(data);
            if (this.utilities.isInvalidApiResponseData(data)) {
              console.log("Returned Error");
            } else {
              if (typeof data != "undefined" && typeof data[0] != "undefined") {
                this.relationsMaster = data[0];
              }
            }
          });
        });
      });
  }

  async getLocalRelationsMasters() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getRelationsMasters()
            .then((res: any[]) => {
              console.log("Received RelationsMasters are below -> ");
              console.log(res);
              a.dismiss();
              this.relationsMaster = res;
            })
            .catch((error) => {
              a.dismiss();
              this.utilities.sqliteErrorDisplayer(
                "add-relative * getLocalRelationsMasters",
                error
              );
              this.utilities.presentToastWarning("Something went wrong");
              console.error(
                "Error -> relationsMaster() function returned error." +
                  JSON.stringify(error)
              );
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
        this.selectedPhoto = base64Image;
      },
      (err) => {
        this.selectedPhoto = "dsdsd";
        // Handle error
        console.log(err);
        alert("Something went wrong...");
      }
    );
  }

  triggerHiddenFileButton() {
    let element: HTMLElement = document.querySelector('input[type="file"]');
    element.click();
  }

  uploadImageFromWeb(photo) {
    let base64Image;
    var myReader: FileReader = new FileReader();

    myReader.readAsDataURL(photo.target.files[0]);
    myReader.onloadend = (e) => {
      base64Image = myReader.result;
      this.selectedPhoto = base64Image;
      console.log(base64Image);
    };
  }

  async submit(values) {
    console.log("Form is submitted, below are the values");
    console.log(values);
    console.log("Submit clicked");
    let relativeName = this.relativeForm.get("relativeName").value.trim();
    let relationId = this.relativeForm.get("relationId").value;

    if (!relativeName) {
      alert("Please enter relative name");
      return false;
    } else if (!relationId) {
      alert("Please select relation");
      return false;
    } else if (!this.selectedPhoto) {
      alert("Please choose relative photo");
      return false;
    }

    console.log("Form can be submitted now");

    const loading = await this.loadingController
      .create({
        message: "Saving...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.apiService
            .addUserRelative(relativeName, relationId, this.selectedPhoto)
            .subscribe((data) => {
              console.log("Returned from Backend");
              console.log(data);
              if (this.utilities.isInvalidApiResponseData(data)) {
                a.dismiss();
                console.log("Returned Error");
                console.log(data);
                if (data[0]["error"]) {
                  a.dismiss();
                  console.log("Something went wrong");
                }
              } else {
                console.log("Returned Success");
                this.utilities.presentToastSuccess(
                  "Relative added successfully."
                );

                if (this.utilities.isHybridApp) {
                  let res = data[0][0];
                  if (data[0][0]["query"]) {
                    let receivedQuery = res["query"];
                    console.log(receivedQuery);

                    this.db
                      .crudOperations(receivedQuery)
                      .then((res) => {
                        a.dismiss();
                        console.log("Relative added successfully");
                        this.router.navigate([this.redirectTo]);
                      })
                      .catch((error) => {
                        this.utilities.sqliteErrorDisplayer(
                          "add-relative * submit",
                          error
                        );
                        this.utilities.presentToastWarning(
                          "Something went wrong."
                        );
                        a.dismiss();
                        console.error(
                          "Error -> addRelative function returned error." +
                            JSON.stringify(error)
                        );
                      });
                  } else {
                    this.utilities.sqliteErrorDisplayer(
                      "add-relative * submit",
                      "Query property is not received from backend SP"
                    );
                    a.dismiss();
                    console.log(
                      "Query property is not received from backend SP"
                    );
                  }

                  // this.utilities.selectedRelativeId = relationId;
                } else {
                  a.dismiss();
                  console.log("Relative added successfully");
                  this.router.navigate([this.redirectTo]);
                }
              }
            });
        });
      });
  }
}
