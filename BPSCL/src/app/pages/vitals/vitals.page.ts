import { Component, OnInit, OnDestroy } from "@angular/core";
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
export class VitalsPage implements OnInit, OnDestroy {
  vitalForm: FormGroup;

  benIds: any[] = [];
  doctorBpSystolic = -1;
  doctorBpDiastolic = -1;
  muac = 0.0;
  hc = 0.0;

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

  newDate = new Date();
  dateTime: string = this.commonService.getDateTime(this.newDate);

  constructor(
    private db: DatabaseService,
    private commonService: CommonService,
    private router: Router,
    private storageService: StorageService
  ) {
    this.loadBeneficiaries();
    this.loadUserDetails();
    this.loadSessionDetails();

    this.vitalForm = new FormGroup({
      beneficiaryId: new FormControl("", Validators.required),
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

  ngOnInit() {
    this.commonService.makeBenObjectEmpty();
    console.log(
      "User details are " + JSON.stringify(this.commonService.userDetails)
    );
  }

  ngOnDestroy() {
    console.log("ngOnDestroy triggered...");
    this.commonService.makeBenObjectEmpty();
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

  calculateBmi(value) {
    let weight = this.vitalForm.get("weight").value;
    let height = this.vitalForm.get("height").value;

    if (value == "height") {
      if (height < 36 || height > 245) {
        alert("Height should be between 36-245");
        // this.vitalForm.patchValue({ height: null });
        return false;
      }
    } else {
      if (weight < 1.5 || weight > 200) {
        alert("Weight should be between 1.5-200");
        // this.vitalForm.patchValue({ weight: null });
        return false;
      }
    }

    if (weight && height) {
      var wtInKg = weight;
      var htInMeter = height / 100;
      var thisBmi = wtInKg / (htInMeter * htInMeter);
      this.vitalForm.patchValue({ bmi: thisBmi.toFixed(2) });
      console.log("Calculated BMI is -> " + thisBmi.toFixed(2));
    }
  }

  temperatureChange() {
    let enteredTemperature = this.vitalForm.get("temperature").value;
    if (enteredTemperature < 92 || enteredTemperature > 105) {
      alert("Temperature should be between 92-105");
      // this.vitalForm.patchValue({ temperature: null });
      return false;
    }
  }

  bpChange(bpType) {
    console.log("bpChange() Triggered");
    let bpSystolic = this.vitalForm.get("bpSystolic").value;
    let bpDiastolic = this.vitalForm.get("bpDiastolic").value;

    console.log("bpSystolic -> " + bpSystolic);
    console.log("bpDiastolic -> " + bpDiastolic);

    if (bpType == "systolic" && bpSystolic && (bpSystolic < 0 || bpSystolic > 300)) {
      alert("Systolic should be less than 300 and greater then the Diastolic");
      return false;
    }

    if (bpType == "diastolic" && bpDiastolic && bpDiastolic < 0 || bpDiastolic >= 1000) {
      alert("Diastolic should be less than 1000");
      return false;
    }

    if (+bpSystolic <= +bpDiastolic) {
      alert("Systolic should be less than 300 and greater then the Diastolic");
      return false;
    }
  }

  respiratoryRateChange() {
    // let respiratoryRate = this.vitalForm.get("respiratoryRate").value;
    // if (respiratoryRate < 10 || respiratoryRate > 60) {
    //   alert("Respiratory Rate should be between 10-60");
    // this.vitalForm.patchValue({ respiratoryRate: null });
    // return false;
    // }
  }

  skipper() {
    console.clear();
    console.log("Skip button clicked...");
    let selectedBenID = this.vitalForm.get("beneficiaryId").value;
    console.log("Currently selectedBenID is -> " + selectedBenID);

    let skipResponse = this.commonService.skipButtonFunctionality(selectedBenID, this.benIds);

    console.log("skipResponse is -> " + skipResponse);

    if (skipResponse == -1) {
      console.log("Next will be empty");
      console.log("selectable patient ID is -> null");
      this.vitalForm.patchValue({
        beneficiaryId: null
      });
    } else {
      console.log("selectable patient ID is -> " + this.benIds[skipResponse].patientId);
      this.vitalForm.patchValue({
        beneficiaryId: this.benIds[skipResponse].patientId
      });
    }
  }

  resetValues() {
    this.vitalForm.patchValue({
      beneficiaryId: "",
      height: "",
      weight: "",
      bmi: "",
      temperature: "",
      pulse: "",
      bpSystolic: "",
      bpDiastolic: "",
      respiratoryRate: ""
    });
    this.commonService.makeBenObjectEmpty();
  }

  benIdChange() {
    let selectedBenID = this.vitalForm.get("beneficiaryId").value;
    console.log("selectedBenID is -> " + selectedBenID);
    if (selectedBenID && selectedBenID != null)
      this.getBenDetails(selectedBenID);
  }

  getBenDetails(selectedBenID) {
    this.db
      .getBeneficiaryDetails(selectedBenID)
      .then(benDetails => {
        console.log(
          "Received Ben details are -> " + JSON.stringify(benDetails)
        );
        this.commonService.setBenDetails(benDetails[0]);
      })
      .catch(error => {
        console.error(
          "Error -> getBeneficiaryDetails() function returned error." +
          JSON.stringify(error)
        );
      });
  }

  onSubmit(values) {
    console.clear();

    let patientId = this.vitalForm.get("beneficiaryId").value.trim();
    let height = this.vitalForm.get("height").value;
    let weight = this.vitalForm.get("weight").value;
    let bmi = this.vitalForm.get("bmi").value;
    let temperature = this.vitalForm.get("temperature").value;
    let pulseRate = this.vitalForm.get("pulse").value;
    let bpSystolic = this.vitalForm.get("bpSystolic").value;
    let bpDiastolic = this.vitalForm.get("bpDiastolic").value;
    let respiratoryRate = this.vitalForm.get("respiratoryRate").value;

    let userId = this.userId;
    let deviceId = this.deviceId;
    let vanId = this.vanId;
    let servicePointId = this.servicePointId;

    let visitId = this.commonService.beneficiaryDetails["userVisitId"];
    let routeVillageId = this.commonService.beneficiaryDetails[
      "userRouteVillageId"
    ];
    let compoundPatientId = this.commonService.beneficiaryDetails[
      "userCompoundPatientId"
    ];
    let visitCount = this.commonService.beneficiaryDetails["userVisitCount"];

    let muac = this.muac;
    let hc = this.hc;
    let doctorBpSystolic = this.doctorBpSystolic;
    let doctorBpDiastolic = this.doctorBpDiastolic;

    if (!patientId || patientId <= 0) {
      alert("Please Select Beneficiary ID");
      return false;
    }
    if (!height || height == null) {
      alert("Enter Beneficiary height");
      return false;
    }
    if (height < 36 || height > 245) {
      alert("Height should be between 36-245");
      return false;
    }
    if (!weight || weight == null) {
      alert("Enter Beneficiary weight");
      return false;
    }
    if (weight < 1.5 || weight > 200) {
      alert("Weight should be between 1.5-200");
      return false;
    }
    if (!bmi || bmi == null) {
      alert("Enter Beneficiary bmi");
      return false;
    }
    if (temperature == '') {
      temperature = '0.0'
    } else if (temperature && (temperature < 90 || temperature > 105)) {
      alert("Temperature should be between 90-105");
      return false;
    }
    if (pulseRate == '') {
      pulseRate = 0;
    } else if (!pulseRate || pulseRate == null) {
      pulseRate = 0;
    } else if (pulseRate && (pulseRate < 40 || pulseRate > 130)) {
      alert("PulseRate should be between 40-130");
      return false;
    }
    if (bpSystolic == '') {
      bpSystolic = 0;
    }
    if (bpDiastolic == '') {
      bpDiastolic = 0;
    }

    if (bpSystolic != 0 && bpDiastolic != 0)
      this.bpChange('systolic');

    if (respiratoryRate == '') {
      respiratoryRate = 0;
    } else if (respiratoryRate && (respiratoryRate < 10 || respiratoryRate > 60)) {
      alert("RespiratoryRate should be between 10-60");
      return false;
    }

    console.log("Temperature is -> " + temperature);
    console.log("pulseRate is -> " + pulseRate);
    console.log("bpSystolic is -> " + bpSystolic);
    console.log("bpDiastolic is -> " + bpDiastolic);
    console.log("respiratoryRate is -> " + respiratoryRate);

    console.log("Form can be submitted...!");
    console.log("Vital form is submitted, below are the values");
    console.log(values);
    // return false;

    let vitalFormDetails = {
      patientId,
      visitId,
      deviceId,
      vanId,
      routeVillageId,
      servicePointId,
      compoundPatientId,
      visitCount,
      height,
      weight,
      bmi,
      pulseRate,
      temperature,
      respiratoryRate,
      bpSystolic,
      bpDiastolic,
      doctorBpSystolic,
      doctorBpDiastolic,
      muac,
      hc,
      userId
    };

    console.log(
      "Passable vitals details Object is " + JSON.stringify(vitalFormDetails)
    );


    this.db
      .findVital(
        patientId,
        servicePointId,
        vanId,
        visitId
      )
      .then(data => {
        if (data) {

          this.db
            .updateVital(vitalFormDetails)
            .then(data => {
              console.log("Success -> updateVital is updated Successfully..." + data);
              this.router.navigate(["/doctor"]);
            })
            .catch(e => {
              console.error(
                "Error -> updateVital is not updated" + JSON.stringify(e)
              );
            });
          // Need to update the Vital
        } else {

          this.db
            .insertVital(vitalFormDetails)
            .then(res => {
              console.log(
                "Vital details inserted successfully...!" + JSON.stringify(res)
              );
              if (res) {
                console.log("Can be redirected...");
                this.router.navigate(["/doctor"]);
              }
              // Need to insert the Vital
            })
            .catch(error => {
              console.error(
                "Error -> Vital details insertion failed - " + JSON.stringify(error)
              );
            });
        }
      })
      .catch(e => {
        console.error(
          "Error -> findVital returned error" +
          JSON.stringify(e)
        );
      });
  }
}
