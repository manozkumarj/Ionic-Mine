import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { DatabaseService } from "src/app/services/database.service";
import { StorageService } from "./../../services/storage.service";
import { ConstantsService } from "../../services/constants.service";
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
  ageCategories: any[] = [];
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

  disablePersonalNumber: boolean = false;
  disableFamilyOrRelativeNumber: boolean = false;

  newDate = new Date();

  dateTime: string = this.getDateTime(this.newDate);
  isPhotoCaptured: boolean = false;
  benPhoto: string = "assets/profile_pic.jpg";

  randomPatientId: string =
    "SP0002000002B000" + Math.floor(Math.random() * (599 - 500) + 500);

  constructor(
    private db: DatabaseService,
    private router: Router,
    private camera: Camera,
    private storageService: StorageService,
    public constants: ConstantsService
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
      ageCategory: new FormControl("", Validators.required),
      personalNumber: new FormControl("", Validators.required),
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
    this.loadAgeCategories();
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

  getDateTime(myDate) {
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

  loadAgeCategories() {
    this.db
      .getAgeCategories()
      .then(ageCategories => {
        console.log(
          "Fetched AgeCategories -> " + JSON.stringify(ageCategories)
        );
        this.ageCategories = ageCategories;
      })
      .catch(error => {
        console.error(
          "Error -> getAgeCategories() function returned error." +
            JSON.stringify(error)
        );
      });
  }

  personalNumberCheckbox(e) {
    if (e.target.checked) {
      this.disablePersonalNumber = true;
      this.benRegForm.patchValue({ personalNumber: "N/A" });
      console.log("personalNumberCheckbox is checked");
    } else {
      this.disablePersonalNumber = false;
      this.benRegForm.patchValue({ personalNumber: "" });
      console.log("personalNumberCheckbox is unchecked");
    }
  }

  familyOrRelativeNumberCheckbox(e) {
    if (e.target.checked) {
      this.disableFamilyOrRelativeNumber = true;
      this.benRegForm.patchValue({ familyOrRelativeNumber: "N/A" });
      console.log("familyOrRelativeNumberCheckbox is checked");
    } else {
      this.disableFamilyOrRelativeNumber = false;
      this.benRegForm.patchValue({ familyOrRelativeNumber: "" });
      console.log("familyOrRelativeNumberCheckbox is unchecked");
    }
  }

  bplCheckbox(e) {
    if (e.target.checked) {
      console.log("bplCheckbox is checked");
    } else {
      console.log("bplCheckbox is unchecked");
    }
  }

  handiCappedCheckbox(e) {
    if (e.target.checked) {
      console.log("handiCappedCheckbox is checked");
    } else {
      console.log("handiCappedCheckbox is unchecked");
    }
  }

  ageChange() {
    let enteredAge = this.benRegForm.get("age").value;
    console.log("ageChange() - enteredAge -> " + enteredAge);

    this.benRegForm.patchValue({ ageUnit: "", dateOfBirth: "" });
  }

  ageUnitChange() {
    let enteredAge = this.benRegForm.get("age").value;
    let selectedAgeUnit = this.benRegForm.get("ageUnit").value;

    console.log("enteredAge -> " + enteredAge);
    console.log("selectedAgeUnit -> " + selectedAgeUnit);

    if (enteredAge == "" || selectedAgeUnit == "") {
      if (enteredAge == "") {
        alert("Enter Age");
        return false;
      }
      if (selectedAgeUnit == "") {
        alert("Select Age Unit");
        return false;
      }
    } else {
      let today = new Date();
      let dob;

      if (selectedAgeUnit == this.constants.age_unit_years) {
        if (enteredAge > 100) {
          alert("Years should be between 1-100");
          this.benRegForm.patchValue({ ageUnit: "", dateOfBirth: "" });
          return false;
        }
        let currentYear = today.getFullYear();
        let dobYear = currentYear - enteredAge;
        dob = new Date(dobYear, today.getMonth(), today.getDate());
      } else if (selectedAgeUnit == this.constants.age_unit_months) {
        if (enteredAge > 11) {
          alert("Months should be between 1-11");
          this.benRegForm.patchValue({ ageUnit: "", dateOfBirth: "" });
          return false;
        }
        let currentMonth = today.getMonth();
        let dobMonth = currentMonth - enteredAge;
        dob = new Date(today.getFullYear(), dobMonth, today.getDate());
      } else if (selectedAgeUnit == this.constants.age_unit_days) {
        if (enteredAge > 30) {
          alert("Days should be between 1-30");
          this.benRegForm.patchValue({ ageUnit: "", dateOfBirth: "" });
          return false;
        }
        let currentDate = today.getDate();
        let dobDate = currentDate - enteredAge;
        dob = new Date(today.getFullYear(), today.getMonth(), dobDate);
      }
      console.log("Set calender value as -> " + dob);
      let assignDob = this.getDateTime(dob);
      this.benRegForm.patchValue({ dateOfBirth: assignDob });
    }
  }

  onSubmit(values) {
    // let patientId = "SP0002000010B000500";
    let patientId = this.randomPatientId;
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

    console.log(
      "Object which is gonna be sent to Database service file -> " +
        JSON.stringify(benRegFormDetails)
    );

    console.log("Ben Registration form is submitted, below are the values");
    console.log(values);
    console.log("Ben patientId -> " + patientId);

    this.db
      .registerBeneficiary(benRegFormDetails)
      .then(res => {
        console.log(
          "Beneficiary registered successfully...!" + JSON.stringify(res)
        );
        this.router.navigate(["/vitals"]);
      })
      .then(error => {
        console.error(
          "Error -> Beneficiary registration failed - " + JSON.stringify(error)
        );
      });
  }
}
