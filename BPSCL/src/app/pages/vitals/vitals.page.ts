import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { DatabaseService } from "src/app/services/database.service";
import { CommonService } from "src/app/services/common.service";
import { StorageService } from "./../../services/storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-vitals",
  templateUrl: "./vitals.page.html",
  styleUrls: ["./vitals.page.scss"]
})
export class VitalsPage implements OnInit {
  vitalForm: FormGroup;

  benIds: any[] = [];
  doctorBpSystolic = -1;
  doctorBpDiastolic = -1;
  muac = 0.0;
  hc = 0.0;

  constructor(
    private db: DatabaseService,
    private commonService: CommonService,
    private router: Router,
    private storageService: StorageService
  ) {
    // this.loadBeneficiaries();

    this.vitalForm = new FormGroup({
      benificiaryId: new FormControl("", Validators.required),
      height: new FormControl("", Validators.required),
      weight: new FormControl("", Validators.required),
      bmi: new FormControl("", Validators.required),
      temperature: new FormControl("", Validators.required),
      pulse: new FormControl("", Validators.required),
      bpSystolic: new FormControl("", Validators.required),
      bpDiastolic: new FormControl("", Validators.required),
      respiratoryRate: new FormControl("", Validators.required)
    });
  }

  ngOnInit() { }

  loadBeneficiaries() {
    this.db
      .getBeneficiaries()
      .then(beneficiaries => {
        console.log(
          "Fetched beneficiaries -> " + JSON.stringify(beneficiaries)
        );
        this.benIds = beneficiaries;
      })
      .catch(error => {
        console.error(
          "Error -> getBeneficiaries() function returned error." +
          JSON.stringify(error)
        );
      });
  }

  calculateBmi() {
    let weight = this.vitalForm.get("weight").value;
    let height = this.vitalForm.get("height").value;

    if (weight && height) {
      var wtInKg = weight;
      var htInMeter = height / 100;
      var thisBmi = wtInKg / (htInMeter * htInMeter);
      this.vitalForm.patchValue({ bmi: thisBmi.toFixed(2) });
      console.log("Calculated BMI is -> " + thisBmi.toFixed(2));
    }
  }

  resetValues() {
    this.vitalForm.patchValue({
      benificiaryId: "",
      height: "",
      weight: "",
      bmi: "",
      temperature: "",
      pulse: "",
      bpSystolic: "",
      bpDiastolic: "",
      respiratoryRate: ""
    });
  }

  benIdChange() {
    let selectedBenID = this.vitalForm.get("benificiaryId").value;
    console.log("selectedBenID is -> " + selectedBenID);
    // this.getBenDetails(selectedBenID);
  }

  getBenDetails(selectedBenID) {
    this.db
      .getBeneficiaryDetails(selectedBenID)
      .then(benDetails => {
        console.log("Received Ben details are -> " + benDetails);
        this.commonService.beneficiaryDetails['userPhoto'] = benDetails[0]['imageUrl'];
        this.commonService.beneficiaryDetails['userName'] = benDetails[0]['name'];
        this.commonService.beneficiaryDetails['userSurname'] = benDetails[0]['surname'];
        this.commonService.beneficiaryDetails['userAge'] = 5;
        this.commonService.beneficiaryDetails['userGender'] = benDetails[0]['gender'];
        this.commonService.beneficiaryDetails['userDOJ'] = benDetails[0]['registrationDate'];
        this.commonService.beneficiaryDetails['userDistrict'] = benDetails[0]['districtName'];
        this.commonService.beneficiaryDetails['userMandal'] = benDetails[0]['mandalName'];
        this.commonService.beneficiaryDetails['userVillage'] = benDetails[0]['villageName'];
        this.commonService.beneficiaryDetails['userVisitId'] = benDetails[0]['visitId'];
        this.commonService.beneficiaryDetails['userPatientId'] = benDetails[0]['patientId'];
        this.commonService.beneficiaryDetails['userVisitCount'] = benDetails[0]['visitCount'];
        this.commonService.beneficiaryDetails['userDeviceId'] = benDetails[0]['deviceId'];
        this.commonService.beneficiaryDetails['userVanId'] = benDetails[0]['vanId'];
        this.commonService.beneficiaryDetails['userRouteVillageId'] = benDetails[0]['routeVillageId'];
        this.commonService.beneficiaryDetails['userServicePointId'] = benDetails[0]['servicePointId'];
        this.commonService.beneficiaryDetails['userCompoundPatientId'] = benDetails[0]['compoundPatientId'];
      })
      .catch(error => {
        console.error(
          "Error -> getBeneficiaryDetails() function returned error." +
          JSON.stringify(error)
        );
      });
  }

  onSubmit(values) {
    console.log("Vital form is submitted, below are the values");
    console.log(values);

    let benificiaryId = this.vitalForm.get("benificiaryId").value.trim();
    let height = this.vitalForm.get("height").value.trim();
    let weight = this.vitalForm.get("weight").value.trim();
    let bmi = this.vitalForm.get("bmi").value.trim();
    let temperature = this.vitalForm.get("temperature").value.trim();
    let pulse = this.vitalForm.get("pulse").value.trim();
    let bpSystolic = this.vitalForm.get("bpSystolic").value.trim();
    let bpDiastolic = this.vitalForm.get("bpDiastolic").value.trim();
    let respiratoryRate = this.vitalForm.get("respiratoryRate").value.trim();

    if (!benificiaryId || benificiaryId <= 0) {
      alert("Please Select Beneficiary ID");
      return false;
    }
    if (!height || height == null) {
      alert("Enter Beneficiary height");
      return false;
    }
    if (!weight || weight == null) {
      alert("Enter Beneficiary weight");
      return false;
    }
    if (!bmi || bmi == null) {
      alert("Enter Beneficiary bmi");
      return false;
    }
    if (!temperature || temperature == null) {
      alert("Enter Beneficiary temperature");
      return false;
    }
    if (!pulse || pulse == null) {
      alert("Enter Beneficiary pulse");
      return false;
    }
    if (!bpSystolic || bpSystolic == null) {
      alert("Enter Beneficiary bpSystolic");
      return false;
    }
    if (!bpDiastolic || bpDiastolic == null) {
      alert("Enter Beneficiary bpDiastolic");
      return false;
    }
    if (!respiratoryRate || respiratoryRate == null) {
      alert("Enter Beneficiary respiratoryRate");
      return false;
    }

    alert("Form can be submitted...!");

  }
}
