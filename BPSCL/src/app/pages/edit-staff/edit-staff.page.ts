import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { DatabaseService } from "src/app/services/database.service";
import { CommonService } from "src/app/services/common.service";
import { StorageService } from "./../../services/storage.service";
import { ConstantsService } from "../../services/constants.service";
import { Router } from "@angular/router";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

@Component({
  selector: "app-edit-staff",
  templateUrl: "./edit-staff.page.html",
  styleUrls: ["./edit-staff.page.scss"]
})
export class EditStaffPage implements OnInit {
  editStaffForm: FormGroup;

  selectedUseId: number;

  users: any[] = [
    {
      userId: 1,
      username: "AAA"
    },
    {
      userId: 2,
      username: "BBB"
    },
    {
      userId: 3,
      username: "CCC"
    }
  ];
  genders: any[] = [];
  ageUnits: any[] = [
    {
      ageUnitId: 1,
      ageUnitName: "Days",
      isSelected: false
    },
    {
      ageUnitId: 1,
      ageUnitName: "Months",
      isSelected: false
    },
    {
      ageUnitId: 1,
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
    this.editStaffForm = new FormGroup({
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
    this.loadUsernames();
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

  loadUsernames() {
    this.db
      .getUsers()
      .then(users => {
        console.log("Fetched genders -> " + JSON.stringify(users));
        this.users = users;
      })
      .catch(error => {
        console.error(
          "Error -> getGenders() function returned error." +
            JSON.stringify(error)
        );
      });
  }

  usernameChange() {
    let selectedUserID = this.editStaffForm.get("username").value;
    console.log("selectedUserID is -> " + selectedUserID);
    // if (selectedUserID && selectedUserID != null)
    //   this.getUserDetails(selectedUserID);
  }

  getUserDetails(selectedUserID) {
    this.selectedUseId = selectedUserID;
    this.db
      .getUserDetails(selectedUserID)
      .then(userDetails => {
        console.log(
          "Received User details are -> " + JSON.stringify(userDetails)
        );
        this.editStaffForm.patchValue({
          firstName: userDetails["firstName"],
          lastName: userDetails["lastName"],
          fatherName: userDetails["fatherName"],
          gender: userDetails["gender"],
          age: userDetails["age"],
          ageUnit: userDetails["ageUnit"],
          dateOfBirth: userDetails["dateOfBirth"],
          doj: userDetails["doj"],
          address: userDetails["address"],
          phone: userDetails["phone"],
          email: userDetails["email"],
          roleId: userDetails["roleId"],
          userName: userDetails["userName"],
          password: userDetails["password"],
          confirmPassword: userDetails["password"]
        });

        if (userDetails["userImageUrl"] && userDetails["userImageUrl"] != "") {
          this.benPhoto = userDetails["userImageUrl"];
          this.isPhotoCaptured = true;
        }
      })
      .catch(error => {
        console.error(
          "Error -> getUserDetails() function returned error." +
            JSON.stringify(error)
        );
      });
  }

  ageChange() {
    let enteredAge = this.editStaffForm.get("age").value;
    console.log("ageChange() - enteredAge -> " + enteredAge);
    this.ageUnitChange();

    // this.editStaffForm.patchValue({ ageUnit: "", dateOfBirth: "" });
  }

  ageUnitChange() {
    let enteredAge = this.editStaffForm.get("age").value;
    let selectedAgeUnit = this.editStaffForm.get("ageUnit").value;
    let manageAction = false;

    console.log("enteredAge -> " + enteredAge);
    console.log("selectedAgeUnit -> " + selectedAgeUnit);

    let today = new Date();
    let dob;

    if (selectedAgeUnit == this.constants.age_unit_years) {
      manageAction = true;
      if (enteredAge > 100) {
        alert("Years should be between 1-100");
        this.editStaffForm.patchValue({ ageUnit: "", dateOfBirth: "" });
        return false;
      }
      let currentYear = today.getFullYear();
      let dobYear = currentYear - enteredAge;
      dob = new Date(dobYear, today.getMonth(), today.getDate());
    } else if (selectedAgeUnit == this.constants.age_unit_months) {
      manageAction = true;
      if (enteredAge > 11) {
        alert("Months should be between 1-11");
        this.editStaffForm.patchValue({ ageUnit: "", dateOfBirth: "" });
        return false;
      }
      let currentMonth = today.getMonth();
      let dobMonth = currentMonth - enteredAge;
      dob = new Date(today.getFullYear(), dobMonth, today.getDate());
    } else if (selectedAgeUnit == this.constants.age_unit_days) {
      manageAction = true;
      if (enteredAge > 30) {
        alert("Days should be between 1-30");
        this.editStaffForm.patchValue({ ageUnit: "", dateOfBirth: "" });
        return false;
      }
      let currentDate = today.getDate();
      let dobDate = currentDate - enteredAge;
      dob = new Date(today.getFullYear(), today.getMonth(), dobDate);
    }

    if (manageAction) {
      console.log("Set calender value as -> " + dob);
      let assignDob = this.commonService.getDateTime(dob);
      this.editStaffForm.patchValue({ dateOfBirth: assignDob });
    }
  }

  dateOfBirthChange() {
    let selectedDob = new Date(this.editStaffForm.get("dateOfBirth").value);
    let selectedGender = this.editStaffForm.get("gender").value;
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

      this.editStaffForm.patchValue({ ageUnit: ageUnitWillBe, age: ageWillBe });
      console.log("asigning year to ageUnit & age here ");
      console.log("ageUnit was set and value is " + ageUnitWillBe);
    }
  }

  onlyNumberMaxLength(event) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  resetValues() {
    this.editStaffForm.patchValue({
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
      userName: "",
      password: "",
      confirmPassword: ""
    });
    this.isPhotoCaptured = false;
  }

  onSubmit(values) {
    console.clear();
    console.log("Edit Staff form is submitted, below are the values");
    console.log(values);

    let firstName = this.editStaffForm.get("firstName").value.trim();
    let lastName = this.editStaffForm.get("lastName").value.trim();
    let fatherName = this.editStaffForm.get("fatherName").value.trim();
    let genderId = this.editStaffForm.get("gender").value;
    let age = this.editStaffForm.get("age").value;
    let ageTypeId = this.editStaffForm.get("ageUnit").value;
    let dob = this.editStaffForm.get("dateOfBirth").value.trim();
    let doj = this.editStaffForm.get("doj").value.trim();
    let address = this.editStaffForm.get("address").value.trim();
    let phone = this.editStaffForm.get("phone").value.trim();
    let email = this.editStaffForm.get("email").value.trim();
    let roleId = this.editStaffForm.get("roleId").value;
    let username = this.editStaffForm.get("username").value.trim();
    let password = this.editStaffForm.get("password").value.trim();
    let confirmPassword = this.editStaffForm
      .get("confirmPassword")
      .value.trim();
    let userImageUrl = this.benPhoto;
    let isActive = 1;

    let emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

    if (!username || username == null) {
      alert("Please Enter username");
      return false;
    }
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
      alert("Phone Number first digit should between 6-9");
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
    let selectedUserId = this.selectedUseId;

    let updateData = {
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
      userId,
      selectedUserId
    };

    console.log("updateData -> " + updateData);

    this.db
      .updateStaff(updateData)
      .then(data => {
        console.log("Success -> updateStaff is updated Successfully..." + data);
        this.router.navigate(["/staff-attendance"]);
      })
      .catch(e => {
        console.error(
          "Error -> updateStaff is not updated" + JSON.stringify(e)
        );
      });
  }
}
