import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { DatabaseService } from "src/app/services/database.service";
import { StorageService } from "./../../services/storage.service";
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

  userId: number;
  vanId: number;
  deviceId: number;

  stateId: number;
  districtId: number;
  mandalId: number;
  villageId: number;
  servicePointId: number;
  servicePointName: string;

  dateTime: string = this.getDateTime();
  isPhotoCaptured: boolean = false;
  benPhoto: string = "assets/profile_pic.jpg";

  randomNumber: string =
    "SP0002000002B00" + Math.floor(Math.random() * 1000 + 1);

  constructor(
    private db: DatabaseService,
    private router: Router,
    private camera: Camera,
    private storageService: StorageService
  ) {
    this.loadUserDetails();
    this.loadServicePointName();

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

  loadUserDetails() {
    this.storageService
      .getObject("userDetails")
      .then(data => {
        console.log("User details are -> " + JSON.stringify(data));
        this.userId = data.userId;
        this.vanId = data.vanId;
        this.deviceId = data.deviceId;
      })
      .catch(error => {
        console.error("User details were not set -> " + JSON.stringify(error));
      });
  }

  loadServicePointName() {
    this.storageService
      .getObject("sessionDetails")
      .then(data => {
        console.log("sessionDetails are  -> " + JSON.stringify(data));
        this.stateId = data.stateId;
        this.districtId = data.districtId;
        this.mandalId = data.mandalId;
        this.villageId = data.villageId;
        this.servicePointId = data.servicePointId;
        this.servicePointName = data.servicePointName;
      })
      .catch(error => {
        console.error(
          "sessionDetails were not set -> " + JSON.stringify(error)
        );
      });
  }

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

  getDateTime() {
    var myDate = new Date();
    return (
      myDate.getFullYear() +
      "-" +
      this.padDatePart(myDate.getMonth() + 1) +
      "-" +
      this.padDatePart(myDate.getDate())
    );
  }

  padDatePart(part) {
    return ("0" + part).slice(-2);
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

    let patientId = this.randomNumber;
    let deviceId = this.deviceId;
    let vanId = this.vanId;
    let routeVillageId = this.villageId;
    let servicePointId = this.servicePointId;
    let compoundPatientId = "N/A";
    let fatherName = "N/A";
    let spouseName = "N/A";
    let motherName = "N/A";
    let aadharNo = "N/A";
    let mctsId = "N/A";
    let name = this.benRegForm.get("benificiaryName").value;
    let surname = this.benRegForm.get("surname").value;
    let genderId = this.benRegForm.get("gender").value;
    let dob = this.benRegForm.get("dateOfBirth").value;
    let communityId = this.benRegForm.get("caste").value;
    let religionId = this.benRegForm.get("religion").value;
    let userId = this.userId;

    let stateId = this.stateId;
    let districtId = this.districtId;
    let mandalId = this.mandalId;
    let villageId = this.villageId;
    let imageUrl = this.benPhoto;

    let benRegFormDetails = {
      patientId,
      deviceId,
      vanId,
      routeVillageId,
      servicePointId,
      compoundPatientId,
      name,
      surname,
      genderId,
      dob,
      communityId,
      religionId,
      fatherName,
      spouseName,
      motherName,
      aadharNo,
      mctsId,
      villageId,
      mandalId,
      districtId,
      stateId,
      imageUrl,
      userId
    };

    this.db
      .registerBeneficiary(benRegFormDetails)
      .then(res => {
        console.log(
          "Beneficiary registered successfully...!" + JSON.stringify(res)
        );
        // this.router.navigate(["/vitals"]);
      })
      .then(error => {
        console.error(
          "Error -> Beneficiary registration failed - " + JSON.stringify(error)
        );
      });
  }
}
