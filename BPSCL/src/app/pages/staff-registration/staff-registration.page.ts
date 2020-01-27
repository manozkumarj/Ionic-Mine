import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { DatabaseService } from "src/app/services/database.service";
import { CommonService } from "src/app/services/common.service";
import { StorageService } from "./../../services/storage.service";
import { ConstantsService } from "../../services/constants.service";
import { Router } from "@angular/router";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

@Component({
  selector: "app-staff-registration",
  templateUrl: "./staff-registration.page.html",
  styleUrls: ["./staff-registration.page.scss"]
})
export class StaffRegistrationPage implements OnInit {
  staffRegForm: FormGroup;
  genders: any[] = [];
  ageUnits: any[] = [
    {
      ageUnitId: 1,
      ageUnitName: "Days",
      isSelected: false
    },
    {
      ageUnitId: 2,
      ageUnitName: "Months",
      isSelected: false
    },
    {
      ageUnitId: 3,
      ageUnitName: "Years",
      isSelected: false
    }
  ];
  roles: any[] = [
    {
      roleId: 1,
      roleName: "Admin"
    },
    {
      roleId: 1,
      roleName: "Driver"
    },
    {
      roleId: 1,
      roleName: "ANM"
    }
  ];

  isPhotoCaptured: boolean = false;
  benPhoto: string = "assets/profile_pic.jpg";

  newDate = new Date();
  dateTime: string = this.commonService.getDateTime(this.newDate);

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

  constructor(
    private db: DatabaseService,
    private commonService: CommonService,
    private router: Router,
    private camera: Camera,
    private storageService: StorageService,
    public constants: ConstantsService
  ) {
    this.staffRegForm = new FormGroup({
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      fatherName: new FormControl("", Validators.required),
      gender: new FormControl("", Validators.required),
      age: new FormControl("", Validators.required),
      ageUnit: new FormControl("", Validators.required),
      dateOfBirth: new FormControl("", Validators.required),
      doj: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      phone: new FormControl("", [
        Validators.required,
        Validators.pattern("[6-9]\\d{9}")
      ]),
      email: new FormControl("", Validators.required),
      roleId: new FormControl("", Validators.required),
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      confirmPassword: new FormControl("", Validators.required)
    });
  }

  cameraOptions: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  ngOnInit() {
    this.loadUserDetails();
    this.loadSessionDetails();
    this.loadGenders();
    this.loadAgeUnits();
    this.loadRoles();
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

  loadRoles() {
    this.db
      .getRoles()
      .then(roles => {
        console.log("Fetched Roles -> " + JSON.stringify(roles));
        this.roles = roles;
      })
      .catch(error => {
        console.error(
          "Error -> getRoles() function returned error." + JSON.stringify(error)
        );
      });
  }

  ageChange() {
    let enteredAge = this.staffRegForm.get("age").value;
    console.log("ageChange() - enteredAge -> " + enteredAge);
    this.ageUnitChange();

    // this.staffRegForm.patchValue({ ageUnit: "", dateOfBirth: "" });
  }

  ageUnitChange() {
    let enteredAge = this.staffRegForm.get("age").value;
    let selectedAgeUnit = this.staffRegForm.get("ageUnit").value;
    let manageAction = false;

    console.log("enteredAge -> " + enteredAge);
    console.log("selectedAgeUnit -> " + selectedAgeUnit);

    let today = new Date();
    let dob;

    if (selectedAgeUnit == this.constants.age_unit_years) {
      manageAction = true;
      if (enteredAge > 100) {
        alert("Years should be between 1-100");
        this.staffRegForm.patchValue({ ageUnit: "", dateOfBirth: "" });
        return false;
      }
      let currentYear = today.getFullYear();
      let dobYear = currentYear - enteredAge;
      dob = new Date(dobYear, today.getMonth(), today.getDate());
    } else if (selectedAgeUnit == this.constants.age_unit_months) {
      manageAction = true;
      if (enteredAge > 11) {
        alert("Months should be between 1-11");
        this.staffRegForm.patchValue({ ageUnit: "", dateOfBirth: "" });
        return false;
      }
      let currentMonth = today.getMonth();
      let dobMonth = currentMonth - enteredAge;
      dob = new Date(today.getFullYear(), dobMonth, today.getDate());
    } else if (selectedAgeUnit == this.constants.age_unit_days) {
      manageAction = true;
      if (enteredAge > 30) {
        alert("Days should be between 1-30");
        this.staffRegForm.patchValue({ ageUnit: "", dateOfBirth: "" });
        return false;
      }
      let currentDate = today.getDate();
      let dobDate = currentDate - enteredAge;
      dob = new Date(today.getFullYear(), today.getMonth(), dobDate);
    }

    if (manageAction) {
      console.log("Set calender value as -> " + dob);
      let assignDob = this.commonService.getDateTime(dob);
      this.staffRegForm.patchValue({ dateOfBirth: assignDob });
    }
  }

  dateOfBirthChange() {
    let selectedDob = new Date(this.staffRegForm.get("dateOfBirth").value);
    let selectedGender = this.staffRegForm.get("gender").value;
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

      this.staffRegForm.patchValue({ ageUnit: ageUnitWillBe, age: ageWillBe });
      console.log("asigning year to ageUnit & age here ");
      console.log("ageUnit was set and value is " + ageUnitWillBe);
    }
  }

  resetValues() {
    this.staffRegForm.patchValue({
      firstName: "",
      lastName: "",
      fatherName: "",
      gender: "",
      age: "",
      ageUnit: "",
      dateOfBirth: "",
      doj: "",
      address: "",
      phone: "",
      email: "",
      roleId: "",
      username: "",
      password: "",
      confirmPassword: ""
    });
    this.isPhotoCaptured = false;
  }

  onlyNumberMaxLength(event) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onSubmit(values) {
    console.clear();
    console.log("Staff Registration form is submitted, below are the values");
    console.log(values);

    let userIdIncrement = 1;

    let firstName = this.staffRegForm.get("firstName").value.trim();
    let lastName = this.staffRegForm.get("lastName").value.trim();
    let fatherName = this.staffRegForm.get("fatherName").value.trim();
    let genderId = this.staffRegForm.get("gender").value.trim();
    let age = this.staffRegForm.get("age").value;
    let ageTypeId = this.staffRegForm.get("ageUnit").value;
    let dob = this.staffRegForm.get("dateOfBirth").value.trim();
    let doj = this.staffRegForm.get("doj").value.trim();
    let address = this.staffRegForm.get("address").value.trim();
    let phone = this.staffRegForm.get("phone").value.trim();
    let email = this.staffRegForm.get("email").value.trim();
    let roleId = this.staffRegForm.get("roleId").value;
    let username = this.staffRegForm.get("username").value.trim();
    let password = this.staffRegForm.get("password").value.trim();
    let confirmPassword = this.staffRegForm.get("confirmPassword").value.trim();
    let userImageUrl = this.benPhoto;
    let isActive = 1;

    let emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

    if (!firstName || firstName == null) {
      alert("Enter First Name");
      return false;
    }
    if (!lastName || lastName == null) {
      alert("Enter Last Name");
      return false;
    }
    if (!fatherName || fatherName == null) {
      alert("Enter Father Name");
      return false;
    }
    if (!genderId || genderId == null) {
      alert("Please Select Gender");
      return false;
    }
    if (!age || age == null) {
      alert("Please Enter Age");
      return false;
    }
    if (!ageTypeId || ageTypeId == null) {
      alert("Please Select Age Type");
      return false;
    }
    if (!dob || dob == null) {
      alert("Please Enter Date of Birth");
      return false;
    }
    if (!doj || doj == null) {
      alert("Please Enter Date of Joining");
      return false;
    }
    if (!address || address == null) {
      alert("Please Enter Address");
      return false;
    }
    if (!phone || phone == null) {
      alert("Please Enter Phone Number");
      return false;
    }
    if (phone.length < 10 || phone.length > 10) {
      alert("Please Enter valid Phone Number");
      return false;
    }
    if (parseInt(phone[0]) < 6) {
      alert("Phone Number first digit should be between 6-9");
      return false;
    }
    if (!email || email == null) {
      alert("Please Enter Email Address");
      return false;
    }
    if (!email.match(emailPattern)) {
      alert("Please Enter Valid Email Address");
      return false;
    }
    if (!roleId || roleId == null) {
      alert("Please Select Role");
      return false;
    }
    if (!username || username == null) {
      alert("Please Enter username");
      return false;
    }
    if (!password || password == null) {
      alert("Please Enter Password");
      return false;
    }
    if (!confirmPassword || confirmPassword == null) {
      alert("Please Enter Confirm Password");
      return false;
    }
    if (confirmPassword != password) {
      alert("Passwords didn't match");
      return false;
    }

    // if (!this.isPhotoCaptured) {
    //   alert("Please Capture photo");
    //   return false;
    // }

    let userId = this.userId;
    let deviceId = this.deviceId;
    let vanId = this.vanId;

    let insertData = {
      userIdIncrement,
      firstName,
      lastName,
      username,
      password,
      genderId,
      dob,
      fatherName,
      phone,
      address,
      email,
      age,
      ageTypeId,
      doj,
      roleId,
      userImageUrl,
      isActive,
      deviceId,
      vanId,
      userId
    };

    console.log("insertData -> " + JSON.stringify(insertData));

    this.db
      .getMaxUserId()
      .then(data => {
        if (data) {
          userIdIncrement = data;
          insertData["userIdIncrement"] = data;

          this.db
            .registerStaff(insertData)
            .then(data => {
              console.log(
                "Success -> registerStaff is inserted Successfully..." + data
              );
              this.router.navigate(["/edit-staff"]);
            })
            .catch(e => {
              console.error(
                "Error -> registerStaff is not inserted" + JSON.stringify(e)
              );
            });
        } else {
          console.warn(
            "Error -> getMaxUserId function returned 0 -> " + JSON.stringify(data)
          );
        }
      })
      .catch(e => {
        console.error(
          "Error -> getMaxUserId returned error" + JSON.stringify(e)
        );
      });
  }
}
