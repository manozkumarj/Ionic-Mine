import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { DatabaseService } from "src/app/services/database.service";
import { Router } from "@angular/router";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

@Component({
  selector: "app-beneficiary-registration",
  templateUrl: "./beneficiary-registration.page.html",
  styleUrls: ["./beneficiary-registration.page.scss"]
})
export class BeneficiaryRegistrationPage implements OnInit {
  benRegForm: FormGroup;
  genders: any[] = [];
  ageUnits: any[] = [];
  castes: any[] = [];
  religions: any[] = [];

  isPhotoCaptured: boolean = false;
  benPhoto: string = "assets/profile_pic.jpg";

  constructor(
    private db: DatabaseService,
    private router: Router,
    private camera: Camera
  ) {
    this.benRegForm = new FormGroup({
      benificiaryName: new FormControl("", Validators.required),
      surname: new FormControl("", Validators.required),
      gender: new FormControl("", Validators.required),
      age: new FormControl("", Validators.required),
      ageUnit: new FormControl("", Validators.required),
      dateOfBirth: new FormControl("", Validators.required),
      familyOrRelativeNumber: new FormControl("", Validators.required),
      caste: new FormControl("", Validators.required),
      religion: new FormControl("", Validators.required),
      numberOfFamilyMembers: new FormControl("", Validators.required)
    });
  }

  cameraOptions: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  ngOnInit() {
    this.loadGenders();
    this.loadCastes();
    this.loadReligions();
    this.loadAgeUnits();
  }

  takeSnap() {
    console.log("Taking a snapshot");
    this.camera.getPicture(this.cameraOptions).then(
      imageData => {
        // this.camera.DestinationType.FILE_URI gives file URI saved in local
        // this.camera.DestinationType.DATA_URL gives base64 URI
        let base64Image = "data:image/jpeg;base64," + imageData;
        this.benPhoto = base64Image;
        this.isPhotoCaptured = true;
      },
      error => {
        console.log("Error - takeSnap() returned error --> " + error);
      }
    );
  }

  loadGenders() {
    this.db
      .getGenders()
      .then(genders => {
        console.log("Fetched genders -> " + JSON.stringify(genders));
        this.genders = genders;
      })
      .catch(error => {
        console.error(
          "Error -> getGenders() function returned error." +
            JSON.stringify(error)
        );
      });
  }

  loadCastes() {
    this.db
      .getCastes()
      .then(castes => {
        console.log("Fetched Castes -> " + JSON.stringify(castes));
        this.castes = castes;
      })
      .catch(error => {
        console.error(
          "Error -> getCastes() function returned error." +
            JSON.stringify(error)
        );
      });
  }

  loadReligions() {
    this.db
      .getReligions()
      .then(religions => {
        console.log("Fetched Religions -> " + JSON.stringify(religions));
        this.religions = religions;
      })
      .catch(error => {
        console.error(
          "Error -> getReligions() function returned error." +
            JSON.stringify(error)
        );
      });
  }

  loadAgeUnits() {
    this.db
      .getAgeUnits()
      .then(ageUnits => {
        console.log("Fetched AgeUnits -> " + JSON.stringify(ageUnits));
        this.ageUnits = ageUnits;
      })
      .catch(error => {
        console.error(
          "Error -> getAgeUnits() function returned error." +
            JSON.stringify(error)
        );
      });
  }

  onSubmit(values) {
    console.log("Ben Registration form is submitted, below are the values");
    console.log(values);
  }
}
