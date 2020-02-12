import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root"
})
export class CommonService {
  newDate = new Date();
  dateTime: string;
  alphabetsRegex = "^[A-Za-z]+$";
  numbersRegex = "^[0-9]*$";
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$";

  constructor(
    private alertCtrl: AlertController,
    private storageService: StorageService
  ) {
    this.dateTime = this.getDateTime(this.newDate);
  }

  beneficiaryDetails: Object = {
    userPhoto: "assets/profile_pic.jpg",
    userName: "",
    userSurname: "",
    userAge: null,
    userGender: "",
    userDOJ: "",
    userDistrict: "",
    userMandal: "",
    userVillage: "",
    userPatientId: "",
    userVisitId: "",
    userVisitCount: "",
    userDeviceId: "",
    userVanId: "",
    userRouteVillageId: "",
    userServicePointId: "",
    userCompoundPatientId: "",
    age: "",
    ageTypeId: "",
    pregnancyStatus: ""
  };

  sessionDetails: Object = {
    stateId: null,
    districtId: null,
    mandalId: null,
    villageId: null,
    servicePointId: null,
    servicePointName: "Loading...",
    servicePointCode: null
  };

  userDetails: Object = {
    firstName: null,
    lastName: null,
    fullName: null,
    userId: null,
    roleId: null,
    deviceId: null,
    vanId: null
  };

  makeBenObjectEmpty() {
    this.beneficiaryDetails = {};
    this.beneficiaryDetails["userPhoto"] = "assets/profile_pic.jpg";
  }

  makeUserObjectEmpty() {
    this.userDetails = {};
  }

  makeSessionObjectEmpty() {
    this.sessionDetails = {};
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

  setBenDetails(benDetails) {
    this.beneficiaryDetails["userPhoto"] = benDetails["imageUrl"];
    this.beneficiaryDetails["userName"] = benDetails["name"];
    this.beneficiaryDetails["userSurname"] = benDetails["surname"];
    this.beneficiaryDetails["userAge"] = benDetails["age"];
    this.beneficiaryDetails["ageTypeId"] = benDetails["ageTypeId"];
    this.beneficiaryDetails["userGender"] = benDetails["gender"];
    this.beneficiaryDetails["userDOJ"] = benDetails["registrationDate"];
    this.beneficiaryDetails["userDistrict"] = benDetails["districtName"];
    this.beneficiaryDetails["userMandal"] = benDetails["mandalName"];
    this.beneficiaryDetails["userVillage"] = benDetails["villageName"];
    this.beneficiaryDetails["userVisitId"] = benDetails["visitId"];
    this.beneficiaryDetails["userPatientId"] = benDetails["patientId"];
    this.beneficiaryDetails["userVisitCount"] = benDetails["visitCount"];
    this.beneficiaryDetails["userDeviceId"] = benDetails["deviceId"];
    this.beneficiaryDetails["userVanId"] = benDetails["vanId"];
    this.beneficiaryDetails["userRouteVillageId"] =
      benDetails["routeVillageId"];
    this.beneficiaryDetails["userServicePointId"] =
      benDetails["servicePointId"];
    this.beneficiaryDetails["userCompoundPatientId"] =
      benDetails["compoundPatientId"];
  }

  validatePhoneNumber(fieldName, mobileNumber) {
    console.log('Received mobileNumber is -> ' + mobileNumber);
    console.log('Received fieldName is -> ' + fieldName);
    mobileNumber = mobileNumber.toString();
    if (!mobileNumber.match(this.numbersRegex)) {
      alert(`${fieldName} should contain digits only.`);
      return false;
    } else if (mobileNumber.length != 10) {
      alert(`${fieldName} should contain 10 digits.`);
      return false;
    }
    if (parseInt(mobileNumber[0]) < 6) {
      alert(`${fieldName} first digit should be between 6-9`);
      return false;
    }
    return true;
  }

  checkAlphabetPatternNLength(fieldName, string) {
    if (!string.match(this.alphabetsRegex)) {
      alert(`${fieldName} should contain alphabets only.`);
      return false;
    } else if (string.length > 15) {
      alert(`${fieldName} should contain maximum 15 characters only.`);
      return false;
    }
    return true;
  }


  skipButtonFunctionality(selectedBenID, benIds) {
    let selectedBenIndex = null;
    let selectableIndex = 0;
    if (selectedBenID && selectedBenID != '') {
      selectedBenIndex = +benIds.findIndex(function (e) {
        return e.patientId === selectedBenID;
      });
      selectableIndex = (selectedBenIndex + 1);
    }

    console.log("Currently selectedBenIndex is -> " + selectedBenIndex);

    let totalBens = benIds.length;

    console.log("totalBens are -> " + totalBens);
    console.log("selectableIndex is -> " + selectableIndex);

    if (selectableIndex === totalBens) {
      console.log("Next will be empty");
      console.log("selectable patient ID is -> null");
      return -1;
    } else {
      console.log("selectable patient ID is -> " + benIds[selectableIndex].patientId);
      return selectableIndex;
    }
  }


  logout() {
    this.alertCtrl
      .create({
        header: "Are you sure?",
        message: "Do you want to logout?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel"
          },
          {
            text: "Logout",
            handler: () => {
              // alert("User will be logged out");
              this.storageService.clear();
            }
          }
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });
  }
}
