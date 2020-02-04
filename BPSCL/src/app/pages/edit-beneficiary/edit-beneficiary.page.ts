import { Component, OnInit, OnDestroy } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { DatabaseService } from "src/app/services/database.service";
import { CommonService } from "src/app/services/common.service";
import { StorageService } from "./../../services/storage.service";
import { ConstantsService } from "../../services/constants.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

@Component({
  selector: 'app-edit-beneficiary',
  templateUrl: './edit-beneficiary.page.html',
  styleUrls: ['./edit-beneficiary.page.scss'],
})
export class EditBeneficiaryPage implements OnInit, OnDestroy {
  benUpdateForm: FormGroup;
  genders: any[] = [];
  ageUnits: any[] = [];
  ageCategories: any[] = [];
  castes: any[] = [];
  religions: any[] = [];
  pregnancyStatuses: any[] = [
    {
      id: 1,
      status: "Yes"
    },
    {
      id: 2,
      status: "No"
    }
  ];

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
  registrationDate: string;
  visitDate: string;

  disablePersonalNumber: boolean = false;
  disableFamilyOrRelativeNumber: boolean = false;
  disableAgeCategory: boolean = false;
  isBpl: boolean = false;
  isHandicapped: boolean = false;

  familyOrRelativeChecked: boolean = false;
  personalNumberChecked: boolean = false;
  bplChecked: boolean = false;
  handicappedChecked: boolean = false;
  showPregnancyField: boolean = false;

  newDate = new Date();
  dateTime: string = this.commonService.getDateTime(this.newDate);
  isPhotoCaptured: boolean = false;
  benPhoto: string = "assets/profile_pic.jpg";

  randomPatientId: string;

  visitId: string;
  type: string;
  paramID: string;

  constructor(
    private db: DatabaseService,
    private commonService: CommonService,
    private router: Router,
    private camera: Camera,
    private storageService: StorageService,
    public constants: ConstantsService,
    public activatedRoute: ActivatedRoute
  ) {

    this.loadUserDetails();
    this.loadSessionDetails();

    this.benUpdateForm = new FormGroup({
      benificiaryName: new FormControl("", Validators.required),
      surname: new FormControl("", Validators.required),
      gender: new FormControl("", Validators.required),
      age: new FormControl("", Validators.required),
      ageUnit: new FormControl("", Validators.required),
      pregnancyStatus: new FormControl("", Validators.required),
      dateOfBirth: new FormControl("", Validators.required),
      ageCategory: new FormControl("", Validators.required),
      personalNumber: new FormControl("", Validators.required),
      familyOrRelativeNumber: new FormControl("", Validators.required),
      caste: new FormControl("", Validators.required),
      religion: new FormControl("", Validators.required),
      numberOfFamilyMembers: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.type = params['type'];
      this.paramID = params['paramID'];
    });

    console.log("this.type -> " + this.type);
    console.log("this.paramID -> " + this.paramID);

    this.loadGenders();
    this.loadCastes();
    this.loadReligions();
    this.loadAgeUnits();
    this.loadAgeCategories();
    // this.resetValues();

    if (this.type && this.paramID)
      this.getBenDetails(this.paramID);
  }

  ngOnDestroy() {
    this.resetValues();
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
        console.log("Session Details are -> " + JSON.stringify(data));

        this.stateId = data["stateId"];
        this.districtId = data["districtId"];
        this.mandalId = data["mandalId"];
        this.villageId = data["villageId"];
        this.servicePointName = data["servicePointName"];
        this.servicePointCode = data["servicePointCode"];

        this.servicePointId = data["servicePointId"];
      })
      .catch(error => {
        console.error(
          "Session Details were not set -> " + JSON.stringify(error)
        );
      });
  }

  prefixZeros = function (str, padStr, len) {
    while (str.length < len) str = padStr + str;
    return str;
  };

  getBenDetails(selectedBenID) {
    this.db
      .getBeneficiaryDetails(selectedBenID)
      .then(benDetails => {
        console.log("Received Ben details are below -> ");
        console.log(JSON.stringify(benDetails));

        this.benUpdateForm.patchValue({
          benificiaryName: benDetails[0]['name'],
          surname: benDetails[0]['surname'],
          gender: benDetails[0]['genderId'],
          dateOfBirth: benDetails[0]['dob'],
          age: benDetails[0]['age'],
          ageUnit: benDetails[0]['ageTypeId'],
          pregnancyStatus: benDetails[0]['pregnancyStatus'],
          ageCategory: benDetails[0]['ageGroupId'],
          personalNumber: benDetails[0]['contactNo'],
          familyOrRelativeNumber: benDetails[0]['familyContactNo'],
          caste: benDetails[0]['communityId'],
          religion: benDetails[0]['religionId'],
          numberOfFamilyMembers: benDetails[0]['noOfFamilyNumbers']
        });

        let isHandicapped = benDetails[0]['isHandicaped'];
        let isBpl = benDetails[0]['economicStatusId'];
        this.registrationDate = benDetails[0]['registrationDate'];
        this.visitDate = benDetails[0]['visitDate'];
        let imageUrl = benDetails[0]['imageUrl'];

        this.isHandicapped = (isHandicapped == 1) ? true : false;
        this.isBpl = (isBpl == 1) ? true : false;

        if (imageUrl) {
          this.benPhoto = imageUrl;
          this.isPhotoCaptured = true;
        }

      })
      .catch(error => {
        console.error(
          "Error -> getBeneficiaryDetails() function returned error." +
          JSON.stringify(error)
        );
      });
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

  genderChange() {
    let selectedGender = this.benUpdateForm.get("gender").value;
    if (selectedGender != 2) this.showPregnancyField = false;
    else {
      this.showPregnancyField = true;
      this.benUpdateForm.patchValue({ pregnancyStatus: null });
    }
  }

  personalNumberCheckbox(e) {
    if (e.target.checked) {
      this.disablePersonalNumber = true;
      this.benUpdateForm.patchValue({ personalNumber: "N/A" });
      console.log("personalNumberCheckbox is checked");
    } else {
      this.disablePersonalNumber = false;
      this.benUpdateForm.patchValue({ personalNumber: "" });
      console.log("personalNumberCheckbox is unchecked");
    }
  }

  familyOrRelativeNumberCheckbox(e) {
    if (e.target.checked) {
      this.disableFamilyOrRelativeNumber = true;
      this.benUpdateForm.patchValue({ familyOrRelativeNumber: "N/A" });
      console.log("familyOrRelativeNumberCheckbox is checked");
    } else {
      this.disableFamilyOrRelativeNumber = false;
      this.benUpdateForm.patchValue({ familyOrRelativeNumber: "" });
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
    let enteredAge = this.benUpdateForm.get("age").value;
    console.log("ageChange() - enteredAge -> " + enteredAge);
    this.ageUnitChange();

    // this.benUpdateForm.patchValue({ ageUnit: "", dateOfBirth: "" });
  }

  ageUnitChange() {
    let enteredAge = this.benUpdateForm.get("age").value;
    let selectedAgeUnit = this.benUpdateForm.get("ageUnit").value;
    let manageAction = false;

    console.log("enteredAge -> " + enteredAge);
    console.log("selectedAgeUnit -> " + selectedAgeUnit);

    let today = new Date();
    let dob;

    if (selectedAgeUnit == this.constants.age_unit_years) {
      manageAction = true;
      if (enteredAge > 100) {
        alert("Years should be between 1-100");
        this.benUpdateForm.patchValue({ ageUnit: "", dateOfBirth: "" });
        return false;
      }
      let currentYear = today.getFullYear();
      let dobYear = currentYear - enteredAge;
      dob = new Date(dobYear, today.getMonth(), today.getDate());
    } else if (selectedAgeUnit == this.constants.age_unit_months) {
      manageAction = true;
      if (enteredAge > 11) {
        alert("Months should be between 1-11");
        this.benUpdateForm.patchValue({ ageUnit: "", dateOfBirth: "" });
        return false;
      }
      let currentMonth = today.getMonth();
      let dobMonth = currentMonth - enteredAge;
      dob = new Date(today.getFullYear(), dobMonth, today.getDate());
    } else if (selectedAgeUnit == this.constants.age_unit_days) {
      manageAction = true;
      if (enteredAge > 30) {
        alert("Days should be between 1-30");
        this.benUpdateForm.patchValue({ ageUnit: "", dateOfBirth: "" });
        return false;
      }
      let currentDate = today.getDate();
      let dobDate = currentDate - enteredAge;
      dob = new Date(today.getFullYear(), today.getMonth(), dobDate);
    }

    if (manageAction) {
      console.log("Set calender value as -> " + dob);
      let assignDob = this.commonService.getDateTime(dob);
      this.benUpdateForm.patchValue({ dateOfBirth: assignDob });
    }
  }

  dateOfBirthChange() {
    let selectedDob = new Date(this.benUpdateForm.get("dateOfBirth").value);
    let selectedGender = this.benUpdateForm.get("gender").value;
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

      this.benUpdateForm.patchValue({ ageUnit: ageUnitWillBe, age: ageWillBe });
      console.log("asigning year to ageUnit & age here ");
      console.log("ageUnit was set and value is " + ageUnitWillBe);
      this.selectAgeCategory(ageWillBe, ageUnitWillBe, selectedGender);
    }
  }

  selectAgeCategory(ageValue, ageType, gender) {
    this.showPregnancyField = false;
    if (gender == 0 || ageType == 0 || ageValue == 0) {
      return false;
    }

    if (ageType == 1) {
      if (ageValue >= 0 && ageValue <= 28) {
        this.benUpdateForm.patchValue({ ageCategory: 5 });
      } else if (ageValue > 28 && ageValue <= 31) {
        this.benUpdateForm.patchValue({ ageCategory: 6 });
      }
    } else if (ageType == 2) {
      if (ageValue >= 1 && ageValue <= 12) {
        this.benUpdateForm.patchValue({ ageCategory: 6 });
      }
    } else if (ageType == 3) {
      if (ageValue == 1) {
        this.benUpdateForm.patchValue({ ageCategory: 6 });
      } else if (ageValue > 1 && ageValue <= 5) {
        this.benUpdateForm.patchValue({ ageCategory: 7 });
      } else if (ageValue > 5 && ageValue <= 10) {
        this.benUpdateForm.patchValue({ ageCategory: 8 });
      } else if (ageValue > 15 && ageValue < 45 && gender == 2) {
        this.showPregnancyField = true;
        this.benUpdateForm.patchValue({ ageCategory: 4 });
      } else if (ageValue > 10 && ageValue < 20) {
        this.benUpdateForm.patchValue({ ageCategory: 9 });
      } else if (ageValue > 19) {
        this.benUpdateForm.patchValue({ ageCategory: 10 });
      }
    }

    let selectedAgeCategory = this.benUpdateForm.get("ageCategory").value;
    this.disableAgeCategory = true;
    console.log("Picked selectedAgeCategory -> " + selectedAgeCategory);
  }

  onlyNumberMaxLength(event) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  resetValues() {
    this.benUpdateForm.patchValue({
      benificiaryName: "",
      surname: "",
      gender: "",
      dateOfBirth: "",
      age: "",
      ageUnit: "",
      pregnancyStatus: null,
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
    console.log("Ben Registration form is submitted, below are the values");
    console.log(values);
    // return false;

    let patientId = this.paramID;
    let servicePointId = this.servicePointId;
    let name = this.benUpdateForm.get("benificiaryName").value.trim();
    let surname = this.benUpdateForm.get("surname").value.trim();
    let genderId = this.benUpdateForm.get("gender").value;
    let dob = this.benUpdateForm.get("dateOfBirth").value.trim();
    let age = +this.benUpdateForm.get("age").value;
    let ageUnit = this.benUpdateForm.get("ageUnit").value;
    let pregnancyStatus = this.benUpdateForm.get("pregnancyStatus").value;
    let ageCategory = this.benUpdateForm.get("ageCategory").value;
    let personalNumber = this.benUpdateForm.get("personalNumber").value;
    let familyOrRelativeNumber = this.benUpdateForm
      .get("familyOrRelativeNumber")
      .value;
    let communityId = this.benUpdateForm.get("caste").value;
    let religionId = this.benUpdateForm.get("religion").value;
    let noOfFamilyNumbers = this.benUpdateForm.get("numberOfFamilyMembers").value;
    let userId = this.userId;

    let isHandicapped = this.isHandicapped ? 1 : 2;
    let imageUrl = this.benPhoto;
    let economicStatusId = this.isBpl ? 1 : 0;

    if (genderId != 2) {
      pregnancyStatus = 0;
    }

    let benUpdateFormDetails = {
      patientId,
      servicePointId,
      name,
      surname,
      genderId,
      dob,
      communityId,
      religionId,
      userId,
      imageUrl
    };

    let visitDetails = {
      patientId,
      servicePointId,
      age,
      ageUnit,
      ageCategory,
      personalNumber,
      familyOrRelativeNumber,
      economicStatusId,
      pregnancyStatus,
      noOfFamilyNumbers,
      isHandicapped,
      userId
    };

    console.log("pregnancyStatus is -> " + pregnancyStatus);

    console.log(
      "Object of benUpdateFormDetails -> " + JSON.stringify(benUpdateFormDetails)
    );

    console.log("Object of visitDetails -> " + JSON.stringify(visitDetails));
    // return false;

    console.log("Ben patientId -> " + patientId);

    if (!name || name == null) {
      alert("Enter Beneficiary Name");
      return false;
    } else {
      let res = this.commonService.checkAlphabetPatternNLength('Name', name);
      if (!res) return false;
    }

    if (!surname || surname == null) {
      alert("Enter Beneficiary Surname");
      return false;
    } else {
      let res = this.commonService.checkAlphabetPatternNLength('Surname', surname);
      if (!res) return false;
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
    if (genderId == 2 && this.showPregnancyField && (!pregnancyStatus || pregnancyStatus == null)) {
      alert("Please Select Pregnancy status ");
      return false;
    }
    if (!dob || dob == null) {
      alert("Please Select Date of birth ");
      return false;
    }
    if (
      !this.disablePersonalNumber &&
      (!personalNumber || personalNumber == null)
    ) {
      alert("Please Enter personal number ");
      return false;
    } else if (!this.disablePersonalNumber) {
      let res = this.commonService.validatePhoneNumber('Personal Number', personalNumber);
      if (!res) return false;
    }

    if (
      !this.disableFamilyOrRelativeNumber &&
      (!familyOrRelativeNumber || familyOrRelativeNumber == null)
    ) {
      alert("Please Enter Family/Relative number ");
      return false;
    } else if (!this.disableFamilyOrRelativeNumber) {
      let res = this.commonService.validatePhoneNumber('Family/Relative Number', familyOrRelativeNumber);
      if (!res) return false;
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
    } else if (noOfFamilyNumbers < 1 || noOfFamilyNumbers > 99) {
      alert("Number of Family Members should be between 1-99");
      return false;
    }
    if (!this.isPhotoCaptured) {
      // alert("Please Capture photo");
      // return false;
      imageUrl = null;
    }

    this.db
      .updateBeneficiary(benUpdateFormDetails)
      .then(async res => {
        console.log(
          "Beneficiary updated successfully...!" + JSON.stringify(res)
        );
        let status = await res;
        // updateVisit functionality - starts
        if (status) {
          this.db
            .updateVisit(visitDetails)
            .then(res => {
              console.log(
                "Beneficiary Visit details updated successfully...!" +
                JSON.stringify(res)
              );
              if (res) {
                this.router.navigate(["/search-beneficiary"]);
              }
            })
            .catch(error => {
              console.error(
                "Error -> Beneficiary Visit details updation failed - " +
                JSON.stringify(error)
              );
            });
        } else {
          console.log(
            "updateVisit() function not triggered... :(" + JSON.stringify(res)
          );
        }
        // updateVisit functionality - ends
      })
      .catch(error => {
        console.error(
          "Error -> Beneficiary updation failed - " + JSON.stringify(error)
        );
      });
  }
}
