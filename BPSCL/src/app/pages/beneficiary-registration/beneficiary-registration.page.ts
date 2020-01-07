import { LoginPageRoutingModule } from './../login/login-routing.module';
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
  servicePointCode: string;

  disablePersonalNumber: boolean = false;
  disableFamilyOrRelativeNumber: boolean = false;
  isBpl: boolean = false;
  isHandicapped: boolean = false;

  familyOrRelativeChecked: boolean = false;
  personalNumberChecked: boolean = false;
  bplChecked: boolean = true;
  handicappedChecked: boolean = false;

  newDate = new Date();

  dateTime: string = this.getDateTime(this.newDate);
  isPhotoCaptured: boolean = false;
  benPhoto: string = "assets/profile_pic.jpg";

  randomPatientId: string;

  visitId: string;

  constructor(
    private db: DatabaseService,
    private router: Router,
    private camera: Camera,
    private storageService: StorageService,
    public constants: ConstantsService
  ) {
    this.loadUserDetails();
    this.loadSessionDetails();

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

  loadSessionDetails() {
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
        this.servicePointCode = data.servicePointCode;

        this.getMaxBeneficiaryId(this.servicePointId);
        this.getMaxVisitId(this.servicePointId);

      })
      .catch(error => {
        console.error(
          "sessionDetails were not set -> " + JSON.stringify(error)
        );
      });
  }


  padFunction = function (str, padStr, len) {
    while (str.length < len)
      str = padStr + str;
    return str;
  }

  getMaxBeneficiaryId(servicePointId) {
    console.log("Sending servicePointId is -> " + servicePointId);
    this.db
      .getMaxBeneficiaryId(servicePointId)
      .then(maxbeneficiaryId => {
        let id;
        console.log("Fetched maxbeneficiaryId -> " + JSON.stringify(maxbeneficiaryId));
        console.log(maxbeneficiaryId);
        let receivedData = maxbeneficiaryId[0]['maxbeneficiaryId'];

        if (receivedData) {
          console.log("Inside if");

          if (receivedData.length > 0) {
            let benId = receivedData;
            if (benId != null && benId != "") {
              id = parseInt(benId.substring(benId.indexOf("B") + 1)) + 1;
            } else {
              id = 1;
            }
          } else {
            id = 1;
          }
        } else {
          console.log("Inside else");
          id = 1;
        }

        id = id.toString();

        let createBeneficiaryId = '';

        if (id.length >= 6) {
          console.log("Inside if 2");
          createBeneficiaryId = this.servicePointCode + 'B' + id;
        } else {
          console.log("Inside else 2");
          console.log("this.servicePointCode -> " + this.servicePointCode);
          let addLeadingZeros = this.padFunction(id, "0", 6);
          createBeneficiaryId = this.servicePointCode + 'B' + addLeadingZeros;
        }

        this.randomPatientId = createBeneficiaryId;

        console.log("Random patient ID is set dynamically -> " + this.randomPatientId);

      })
      .catch(error => {
        console.error(
          "Error -> getBeneficiaryId() function returned error." +
          JSON.stringify(error)
        );
      });
  }

  getMaxVisitId(servicePointId) {
    console.log("Sending servicePointId is -> " + servicePointId);
    this.db
      .getMaxVisitId(servicePointId)
      .then(maxVisitId => {
        let id;
        console.log("Fetched maxVisitId -> " + JSON.stringify(maxVisitId));
        console.log(maxVisitId);
        let receivedData = maxVisitId[0]['maxVisitId'];

        if (receivedData) {
          console.log("Inside if");

          if (receivedData.length > 0) {
            let visitId = receivedData;
            if (visitId != null && visitId != "") {
              id = parseInt(visitId.substring(visitId.indexOf("V") + 1)) + 1;
            } else {
              id = 1;
            }
          } else {
            id = 1;
          }
        } else {
          console.log("Inside else");
          id = 1;
        }

        id = id.toString();

        let createVisitId = '';

        if (id.length >= 6) {
          console.log("Inside if 2");
          createVisitId = this.servicePointCode + 'V' + id;
        } else {
          console.log("Inside else 2");
          console.log("this.servicePointCode -> " + this.servicePointCode);
          let addLeadingZeros = this.padFunction(id, "0", 6);
          createVisitId = this.servicePointCode + 'V' + addLeadingZeros;
        }

        this.visitId = createVisitId;

        console.log("Visit ID is set dynamically -> " + this.visitId);

      })
      .catch(error => {
        console.error(
          "Error -> getBeneficiaryId() function returned error." +
          JSON.stringify(error)
        );
      });
  }

  ngOnInit() {
    this.loadGenders();
    this.loadCastes();
    this.loadReligions();
    this.loadAgeUnits();
    this.loadAgeCategories();
    // this.resetValues();
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
        this.ageUnits = ageUnits.map(ageUnit => ({
          ...ageUnit,
          isSelected: false
        }));
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
      this.isBpl = true;
      console.log("bplCheckbox is checked");
    } else {
      this.isBpl = false;
      console.log("bplCheckbox is unchecked");
    }
  }

  handiCappedCheckbox(e) {
    if (e.target.checked) {
      this.isHandicapped = true;
      console.log("handiCappedCheckbox is checked");
    } else {
      this.isHandicapped = false;
      console.log("handiCappedCheckbox is unchecked");
    }
  }

  ageChange() {
    let enteredAge = this.benRegForm.get("age").value;
    console.log("ageChange() - enteredAge -> " + enteredAge);
    this.ageUnitChange();

    // this.benRegForm.patchValue({ ageUnit: "", dateOfBirth: "" });
  }

  ageUnitChange() {
    let enteredAge = this.benRegForm.get("age").value;
    let selectedAgeUnit = this.benRegForm.get("ageUnit").value;
    let manageAction = false;

    console.log("enteredAge -> " + enteredAge);
    console.log("selectedAgeUnit -> " + selectedAgeUnit);

    let today = new Date();
    let dob;

    if (selectedAgeUnit == this.constants.age_unit_years) {
      manageAction = true;
      if (enteredAge > 100) {
        alert("Years should be between 1-100");
        this.benRegForm.patchValue({ ageUnit: "", dateOfBirth: "" });
        return false;
      }
      let currentYear = today.getFullYear();
      let dobYear = currentYear - enteredAge;
      dob = new Date(dobYear, today.getMonth(), today.getDate());
    } else if (selectedAgeUnit == this.constants.age_unit_months) {
      manageAction = true;
      if (enteredAge > 11) {
        alert("Months should be between 1-11");
        this.benRegForm.patchValue({ ageUnit: "", dateOfBirth: "" });
        return false;
      }
      let currentMonth = today.getMonth();
      let dobMonth = currentMonth - enteredAge;
      dob = new Date(today.getFullYear(), dobMonth, today.getDate());
    } else if (selectedAgeUnit == this.constants.age_unit_days) {
      manageAction = true;
      if (enteredAge > 30) {
        alert("Days should be between 1-30");
        this.benRegForm.patchValue({ ageUnit: "", dateOfBirth: "" });
        return false;
      }
      let currentDate = today.getDate();
      let dobDate = currentDate - enteredAge;
      dob = new Date(today.getFullYear(), today.getMonth(), dobDate);
    }

    if (manageAction) {
      console.log("Set calender value as -> " + dob);
      let assignDob = this.getDateTime(dob);
      this.benRegForm.patchValue({ dateOfBirth: assignDob });
    }
  }

  dateOfBirthChange() {
    let selectedDob = new Date(this.benRegForm.get("dateOfBirth").value);
    let selectedGender = this.benRegForm.get("gender").value;
    let selectedDobSeconds = selectedDob.getTime();
    let ageWillBe;
    let ageUnitWillBe;
    console.log("dateOfBirthChange() - selectedDob -> " + selectedDobSeconds);
    console.log("Date.now() is -> " + Date.now());

    if (selectedDobSeconds && selectedDobSeconds > 0) {
      var timeDiff = Math.abs(Date.now() - selectedDobSeconds);
      var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
      if (diffDays < 30) {
        ageWillBe = diffDays;
        ageUnitWillBe = 1;
        this.ageUnits[2]["isSelected"] = false;
        this.ageUnits[1]["isSelected"] = false;
        this.ageUnits[0]["isSelected"] = true;
      } else if (diffDays < 365) {
        ageWillBe = Math.floor(diffDays / 30);
        ageUnitWillBe = 2;
        this.ageUnits[2]["isSelected"] = false;
        this.ageUnits[0]["isSelected"] = false;
        this.ageUnits[1]["isSelected"] = true;
      } else {
        ageWillBe = Math.floor(diffDays / 365);
        ageUnitWillBe = 3;
        this.ageUnits[0]["isSelected"] = false;
        this.ageUnits[1]["isSelected"] = false;
        this.ageUnits[2]["isSelected"] = true;
      }

      this.benRegForm.patchValue({ ageUnit: ageUnitWillBe, age: ageWillBe });
      console.log("asigning year to ageUnit & age here ");
      console.log("ageUnit was set and value is " + ageUnitWillBe);
      this.selectAgeCategory(ageWillBe, ageUnitWillBe, selectedGender);
    }
  }

  selectAgeCategory(ageValue, ageType, gender) {
    if (gender == 0 || ageType == 0 || ageValue == 0) {
      return false;
    }

    if (ageType == 1) {
      if (ageValue >= 0 && ageValue <= 28) {
        this.benRegForm.patchValue({ ageCategory: 5 });
      } else if (ageValue > 28 && ageValue <= 31) {
        this.benRegForm.patchValue({ ageCategory: 6 });
      }
    } else if (ageType == 2) {
      if (ageValue >= 1 && ageValue <= 12) {
        this.benRegForm.patchValue({ ageCategory: 6 });
      }
    } else if (ageType == 3) {
      if (ageValue == 1) {
        this.benRegForm.patchValue({ ageCategory: 6 });
      } else if (ageValue > 1 && ageValue <= 5) {
        this.benRegForm.patchValue({ ageCategory: 7 });
      } else if (ageValue > 5 && ageValue <= 10) {
        this.benRegForm.patchValue({ ageCategory: 8 });
      } else if (ageValue > 15 && ageValue < 45 && gender == 2) {
        this.benRegForm.patchValue({ ageCategory: 4 });
      } else if (ageValue > 10 && ageValue < 20) {
        this.benRegForm.patchValue({ ageCategory: 9 });
      } else if (ageValue > 19) {
        this.benRegForm.patchValue({ ageCategory: 10 });
      }
    }

    let selectedAgeCategory = this.benRegForm.get("ageCategory").value;
    console.log("Picked selectedAgeCategory -> " + selectedAgeCategory);
  }

  resetValues() {
    this.benRegForm.patchValue({
      benificiaryName: "",
      surname: "",
      gender: "",
      dateOfBirth: "",
      age: "",
      ageUnit: "",
      ageCategory: "",
      personalNumber: "",
      familyOrRelativeNumber: "",
      caste: "",
      religion: "",
      numberOfFamilyMembers: ""
    });

    this.isPhotoCaptured = false;
    this.benPhoto = "assets/profile_pic.jpg";
    this.isBpl = false;
    this.isHandicapped = false;
    this.disablePersonalNumber = false;
    this.disableFamilyOrRelativeNumber = false;
    this.familyOrRelativeChecked = false;
    this.personalNumberChecked = false;
    this.bplChecked = false;
    this.handicappedChecked = false;
  }

  onSubmit(values) {
    // let patientId = "SP0002000010B000500";
    let patientId = this.randomPatientId;
    let visitId = this.visitId;
    let visitCount = 1;
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
    let name = this.benRegForm.get("benificiaryName").value.trim();
    let surname = this.benRegForm.get("surname").value.trim();
    let genderId = this.benRegForm.get("gender").value.trim();
    let dob = this.benRegForm.get("dateOfBirth").value.trim();
    let age = +this.benRegForm.get("age").value;
    let ageUnit = this.benRegForm.get("ageUnit").value.trim();
    let ageCategory = this.benRegForm.get("ageCategory").value.trim();
    let personalNumber = this.benRegForm.get("personalNumber").value.trim();
    let familyOrRelativeNumber = this.benRegForm
      .get("familyOrRelativeNumber")
      .value.trim();
    let communityId = this.benRegForm.get("caste").value.trim();
    let religionId = this.benRegForm.get("religion").value.trim();
    let noOfFamilyNumbers = this.benRegForm
      .get("numberOfFamilyMembers")
      .value.trim();
    let userId = this.userId;

    let isBpl = this.isBpl ? 1 : 2;
    let isHandicapped = this.isHandicapped ? 1 : 2;

    let stateId = this.stateId;
    let districtId = this.districtId;
    let mandalId = this.mandalId;
    let villageId = this.villageId;
    let imageUrl = this.benPhoto;

    // Visit tabe related data
    let economicStatusId = 0;
    let educationStatusId = -1;
    let maritalStatusId = -1;
    let occupationStatusId = -1;
    let serviceProvidedId = -1;
    let pregnancyStatus = 0;
    let benTypeId = 0;
    let provisonalDiagnosis = "N/A";
    let impClinicalFindings = "N/A";

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

    let visitDetails = {
      patientId,
      visitId,
      deviceId,
      vanId,
      routeVillageId,
      servicePointId,
      compoundPatientId,
      visitCount,
      age,
      ageUnit,
      ageCategory,
      personalNumber,
      familyOrRelativeNumber,
      economicStatusId,
      educationStatusId,
      maritalStatusId,
      occupationStatusId,
      serviceProvidedId,
      pregnancyStatus,
      benTypeId,
      noOfFamilyNumbers,
      isHandicapped,
      provisonalDiagnosis,
      impClinicalFindings,
      userId
    };

    console.log("Ben Registration form is submitted, below are the values");
    console.log(values);

    console.log(
      "Object of benRegFormDetails -> " +
      JSON.stringify(benRegFormDetails)
    );

    console.log(
      "Object of visitDetails -> " +
      JSON.stringify(visitDetails)
    );

    console.log("Ben patientId -> " + patientId);

    if (!name || name == null) {
      alert("Enter Beneficiary Name");
      return false;
    }
    if (!surname || surname == null) {
      alert("Enter Beneficiary Surname");
      return false;
    }
    if (!genderId || genderId == null) {
      alert("Please Select gender");
      return false;
    }
    if (!age || age == null || age <= 0) {
      alert("Please Enter age");
      return false;
    }
    if (!ageUnit || ageUnit == null) {
      alert("Please Select age unit ");
      return false;
    }
    if (!dob || dob == null) {
      alert("Please Select Date of birth ");
      return false;
    }
    if (!personalNumber || personalNumber == null) {
      alert("Please Enter personal number ");
      return false;
    }
    if (!familyOrRelativeNumber || familyOrRelativeNumber == null) {
      alert("Please Enter Family Or Relative number ");
      return false;
    }
    if (!communityId || communityId == null) {
      alert("Please Select Caste");
      return false;
    }
    if (!religionId || religionId == null) {
      alert("Please Select Religion");
      return false;
    }
    if (!noOfFamilyNumbers || noOfFamilyNumbers == null) {
      alert("Please Enter Number of Family Members");
      return false;
    }
    if (!this.isPhotoCaptured) {
      alert("Please Capture photo");
      return false;
    }

    this.db
      .registerBeneficiary(benRegFormDetails)
      .then(async res => {
        console.log(
          "Beneficiary registered successfully...!" + JSON.stringify(res)
        );
        let status = await res;
        // insertVisit functionality - starts
        if (status) {
          this.db
            .insertVisit(visitDetails)
            .then(res => {
              console.log(
                "Beneficiary Visit details inserted successfully...!" +
                JSON.stringify(res)
              );
              if (res) {
                this.router.navigate(["/vitals"]);
              }
            })
            .then(error => {
              console.error(
                "Error -> Beneficiary Visit details insertion failed - " +
                JSON.stringify(error)
              );
            });
        } else {
          console.log(
            "insertVisit() function not triggered... :(" + JSON.stringify(res)
          );
        }
        // insertVisit functionality - ends
      })
      .then(error => {
        console.error(
          "Error -> Beneficiary registration failed - " + JSON.stringify(error)
        );
      });
  }
}
