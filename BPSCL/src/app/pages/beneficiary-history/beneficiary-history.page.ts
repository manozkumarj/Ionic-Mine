import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { DatabaseService } from "src/app/services/database.service";
import { CommonService } from "./../../services/common.service";
import { StorageService } from "./../../services/storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-beneficiary-history",
  templateUrl: "./beneficiary-history.page.html",
  styleUrls: ["./beneficiary-history.page.scss"]
})
export class BeneficiaryHistoryPage implements OnInit {
  benHistoryForm: FormGroup;
  selectedBenId = 0;
  selectedHistoryId = 0;
  benIds: any[] = [
    {
      patientId: 'SP0001000036B000574'
    },
    {
      patientId: 'SP0001000036B000575'
    },
    {
      patientId: 'SP0001000036B000576'
    }
  ];

  measurementDetails_headings = [
    "Date of Visit",
    "BP",
    "Pulse",
    "Temperature",
    "RR",
    "Height",
    "Weight",
    "BMI"
  ];
  benCategoryAndReferral_headings = [
    "Visit Date",
    "Beneficiary Category",
    "Referral"
  ];
  labTestsAndAnswers_headings = ["Visit Date", "Test Name", "Result"];
  medicinesDispensation_headings = ["Issued ID", "Name", "Quantity Given"];

  otherResults: any[] = [
    {
      rowOneData: "2019-12-29",
      rowTwoData: "test",
      rowThreeData: "jumbo"
    }
  ];

  measurementResults: any[] = [];
  showMeasurementResults: boolean = false;
  showOtherResults: boolean = false;

  historyTypes: any[] = [
    {
      value: 1,
      name: "Measurement Details"
    },
    {
      value: 2,
      name: "Beneficiary category & Referral"
    },
    {
      value: 3,
      name: "Labtests & Answers"
    },
    {
      value: 4,
      name: "Medicines Dispensation"
    }
  ];

  headings = this.measurementDetails_headings;

  newDate = new Date();
  dateTime: string = this.commonService.getDateTime(this.newDate);

  servicePointName: string;
  servicePointId: string;

  constructor(
    private db: DatabaseService,
    private commonService: CommonService,
    private router: Router,
    private storageService: StorageService
  ) {
    this.benHistoryForm = new FormGroup({
      beneficiaryId: new FormControl("", Validators.required),
      beneficiaryHistory: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    this.loadBeneficiaries();
    this.loadSessionDetails();
  }

  onChange() {
    let selectedBenId = this.benHistoryForm.get("beneficiaryId").value;
    let selectedHistoryId = this.benHistoryForm.get("beneficiaryHistory").value;

    if (!selectedBenId || selectedBenId <= 0) {
      alert("Please select Beneficiary ID");
      return false;
    }
    if (!selectedHistoryId || selectedHistoryId <= 0) {
      console.log("History type is not selected");
      return false;
    }

    this.onSubmit(selectedBenId, selectedHistoryId);
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

  loadSessionDetails() {
    this.storageService
      .getObject("sessionDetails")
      .then(data => {
        console.log("Session Details are -> " + JSON.stringify(data));

        this.servicePointName = data["servicePointName"];
        this.servicePointId = data["servicePointId"];
      })
      .catch(error => {
        console.error(
          "Session Details were not set -> " + JSON.stringify(error)
        );
      });
  }

  onSubmit(patientId, selectedHistoryId) {
    this.showMeasurementResults = false;
    this.showOtherResults = false;
    this.measurementResults.length = 0;
    this.otherResults.length = 0;
    console.clear();
    console.log("Ben History form is submitted, below are the values");
    console.log(this.benHistoryForm.value);

    // alert("Form can be submitted");

    if (selectedHistoryId == 1) {
      this.headings = this.measurementDetails_headings;
      this.showMeasurementResults = true;

      this.db.getBeneficiaryMeasurementsData(patientId).then(data => {
        console.log("Success -> Received MeasurementsData --> " + JSON.stringify(data));
        if (data.length > 0) {
          this.measurementResults = data;
        } else {
          this.measurementResults.length = 0;
        }
      }).catch(e => {
        this.measurementResults.length = 0;
        console.error("Error -> getBeneficiaryMeasurementsData returned error" + JSON.stringify(e));
      });

    } else if (selectedHistoryId == 2) {
      this.headings = this.benCategoryAndReferral_headings;
      this.showOtherResults = true;

      this.db.getBeneficiaryDiseasesData(patientId).then(data => {
        console.log("Success -> Received DiseasesData --> " + JSON.stringify(data));
        if (data.length > 0) {
          this.otherResults = data;
        } else {
          this.otherResults.length = 0;
        }
      }).catch(e => {
        this.otherResults.length = 0;
        console.error("Error -> getBeneficiaryDiseasesData returned error" + JSON.stringify(e));
      });

    } else if (selectedHistoryId == 3) {
      this.headings = this.labTestsAndAnswers_headings;
      this.showOtherResults = true;

      this.db.getBeneficiaryLabtestData(patientId).then(data => {
        console.log("Success -> Received LabtestData --> " + JSON.stringify(data));
        if (data.length > 0) {
          this.otherResults = data;
        } else {
          this.otherResults.length = 0;
        }
      }).catch(e => {
        this.otherResults.length = 0;
        console.error("Error -> getBeneficiaryLabtestData returned error" + JSON.stringify(e));
      });

    } else if (selectedHistoryId == 4) {
      this.headings = this.medicinesDispensation_headings;
      this.showOtherResults = true;

      this.db.getBeneficiaryDispensesData(patientId).then(data => {
        console.log("Success -> Received DispensesData --> " + JSON.stringify(data));
        if (data.length > 0) {
          this.otherResults = data;
        } else {
          this.otherResults.length = 0;
        }
      }).catch(e => {
        this.otherResults.length = 0;
        console.error("Error -> getBeneficiaryDispensesData returned error" + JSON.stringify(e));
      });

    }
  }
}
